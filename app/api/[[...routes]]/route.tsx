/** @jsxImportSource frog/jsx */

import { Button, FrameContext, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'

// Values shortened to save space in the post URLs
type State = {
  // questionId
  qI: string | undefined

  // questionOptionId
  qOI: string | undefined

  // percentage
  qP: number | undefined
}

const app = new Frog<{ State: State}>({
  assetsPath: '/',
  basePath: '/api',
  initialState: {
    qI: undefined,
    qOI: undefined,
    qP: undefined,
  }, 
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.frame('/', async (c: FrameContext) => {
  const host = process.env.CHOMP_HOST
  const url = `${host}/api/question/get`
  const apiKey = process.env.CHOMP_API_KEY!

  // debugging
  // const question = {question: "Is foo.bar cool?", questionOptions: [{id: 1, option: "Yes"}, {id: 2, option: "No"}], id: 1}
  const { question: deck } = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        'api-key': apiKey
      },
    }).then((res) => res.json())

  console.log("got deck")
  console.log(deck)

  const { question: prompt, questionOptions, id: qI } = deck

  const buttons = questionOptions.map((option: any) => {
    // Unsure how to change the state from the first frame
    // Passing all info in the button value to be set in the next frame
    const value = `${qI}~${option.id}`
    return <Button value={value}>{option.option}</Button>
  }) || []

  return c.res({
    action: '/s1',
    image: (
      <div
            style={{
                alignItems: 'center',
                backgroundSize: '100% 100%',
                'backgroundImage': `url("${process.env.FRAME_HOST!}/1.png")`,
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

app.frame("/s1", (c) => {
  const { buttonValue, deriveState } = c;
  const [qI, qOI] = buttonValue!.split('~') // ["qI", "qOI"
	deriveState((previousState) => {
		previousState.qI = qI as State["qI"];
		previousState.qOI = qOI as State["qOI"];
	});
  const prompt = `How likely do you think others will agree with you?`
  const helper = `For example enter 25% if you believe 25% of people will give the same response as you did.`
  return c.res({
    action: '/s2',
    image: (
      <div
            style={{
                alignItems: 'center',
                'backgroundImage': `url("${process.env.FRAME_HOST!}/2.png")`,
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
            <div
                style={{
                    color: 'white',
                    fontSize: 30,
                    fontStyle: 'normal',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.4,
                    marginTop: 30,
                    padding: '0 120px',
                    whiteSpace: 'pre-wrap',
                }}
            >
              {helper}
            </div>
        </div>
    ),
    intents: [
      <TextInput placeholder="25%" />,
      <Button value="submit">Submit</Button>
    ]
  })  
})

function normalizePercentage(input: string): number {
  // Check for a percentage value
  if (/^\d+%$/.test(input)) {
    return (parseFloat(input));
  }
  // Check for a decimal number or a number starting with a dot
  else if (/^\d*\.\d+$/.test(input) || /^\.\d+$/.test(input)) {
    return (parseFloat(input) * 100);
  }
  // Check for a plain number
  else if (/^\d+$/.test(input)) {
    return parseFloat(input);
  }
  // Default case
  else {
    return 50;
  }
}

app.frame("/s2", (c) => {
  const { inputText, deriveState } = c;
	const state = deriveState((previousState) => {
    const percentage = normalizePercentage(inputText || "50")
		previousState.qP = percentage as State["qP"]; 
	});

  const prompt = `Finish on Chomp to be eligible for a reward.`

  const host = process.env.CHOMP_HOST
  const path = 'application/answer/frame'
  // Frog escapes ampersand, so have to send one long param
  // qI~qOI~qP
  const args = `vals=${state.qI}~${state.qOI}~${state.qP}`
  const link = `${host}/${path}?${args}`

  return c.res({
    image: (
      <div
            style={{
                alignItems: 'center',
                'backgroundImage': `url("${process.env.FRAME_HOST!}/3.png")`,
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
      <Button.Link href={link}>Go to Chomp</Button.Link>
    ]
  })  
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
