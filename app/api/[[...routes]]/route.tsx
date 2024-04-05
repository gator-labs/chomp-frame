/** @jsxImportSource frog/jsx */

import { Button, FrameContext, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

type State = {
  questionText: string | undefined
  questionId: string | undefined
  questionOptionId: string | undefined
  percentageGiven: number | undefined
}

const app = new Frog<{ State: State}>({
  assetsPath: '/',
  basePath: '/api',
  initialState: {
    questionText: undefined,
    questionId: undefined,
    questionOptionId: undefined,
    percentageGiven: undefined,
  }, 
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.frame('/', async (c: FrameContext) => {
  const host = process.env.CHOMP_HOST
  const url = `${host}/api/question/get`
  const apiKey = process.env.CHOMP_API_KEY!
  const {question} = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'api-key': apiKey
    },
  }).then((res) => res.json())

 const { question: prompt, questionOptions, id: questionId } = question

  const buttons = questionOptions.map((option: any) => {
    // Unsure how to change the state from the first frame
    // Passing all info in the button value to be set in the next frame
    const value = `${prompt}~${questionId}~${option.id}`
    return <Button value={value}>{option.option}</Button>
  }) || []

  return c.res({
    action: '/submit-first-order',
    image: (
      <div
            style={{
                alignItems: 'center',
                background: 'black',
                backgroundSize: '100% 100%',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                height: '100%',
                justifyContent: 'center',
                textAlign: 'center',
                width: '100%',
            }}
        >
            <div
                style={{
                    color: 'white',
                    fontSize: 60,
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 30,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                {prompt}
            </div>
        </div>
    ),
    intents: buttons
  })
})

app.frame("/submit-first-order", (c) => {
  const { buttonValue, deriveState } = c;
  const [questionText, questionId, questionOptionId] = buttonValue!.split('~') // ["prompt", "questionId", "questionOptionId"
	deriveState((previousState) => {
		previousState.questionText = questionText as State["questionText"];
		previousState.questionId = questionId as State["questionId"];
		previousState.questionOptionId = questionOptionId as State["questionOptionId"];
	});
  const prompt = `How likely do you think people are to agree with you?`

  return c.res({
    action: '/submit-second-order',
    image: (
      <div
            style={{
                alignItems: 'center',
                background: 'black',
                backgroundSize: '100% 100%',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                height: '100%',
                justifyContent: 'center',
                textAlign: 'center',
                width: '100%',
            }}
        >
            <div
                style={{
                    color: 'white',
                    fontSize: 60,
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 30,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                {prompt}
            </div>
        </div>
    ),
    intents: [
      <TextInput placeholder="25%" />,
      <Button value="submit">Submit</Button>
    ]
  })  
})

app.frame("/submit-second-order", (c) => {
  const { inputText, deriveState } = c;
	const state = deriveState((previousState) => {
		previousState.percentageGiven = inputText as State["percentageGiven"];
	});

  const prompt = `Finish on Chomp to be eligible for a reward.`

  const host = process.env.CHOMP_HOST
  const path = 'application/answer/frame'
  // Frog escapes ampersand, so have to send one long param
  // questionId~questionOptionId~percentageGiven
  const args = `vals=${state.questionId}~${state.questionOptionId}~${state.percentageGiven}`
  const link = `${host}/${path}?${args}`

  return c.res({
    image: (
      <div
            style={{
                alignItems: 'center',
                background: 'linear-gradient(to right, #432889, #17101F)',
                backgroundSize: '100% 100%',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'nowrap',
                height: '100%',
                justifyContent: 'center',
                textAlign: 'center',
                width: '100%',
            }}
        >
            <div
                style={{
                    color: 'white',
                    fontSize: 60,
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 30,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
                {prompt}
            </div>
        </div>
    ),
    intents: [
      <Button.Link href={link}>Go to chomp</Button.Link>
    ]
  })  
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
