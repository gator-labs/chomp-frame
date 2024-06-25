import {
  useFramesReducer,
  getPreviousFrame,
  type NextServerPageProps,
} from "frames.js/next/server";
import { getQuestion } from "../api/chomp";
import Intro from "../components/intro";
import { UserAnswer, State } from "../types";
import Error from "../components/error";
import { validateFrameMessage } from "../api/validation";
import Question from "../components/question";
import Answer from "../components/answer";
import QuestionSecondOrder from "../components/questionSecondOrder";

export default async function Page(props: NextServerPageProps) {
  const previousFrame = getPreviousFrame<State>(props.searchParams);
  const [state] = useFramesReducer<State>((state) => state, { step: "intro" }, previousFrame);

  try {
    if (previousFrame.postBody && state?.step !== "intro") {
      const { username, inputText, buttonIndex } = await validateFrameMessage(
        previousFrame.postBody,
      );

      // Frame State 2: 1st Order Answer
      if (state?.step === "question") {
        const question = await getQuestion();

        if (!question) {
          return <Error previousFrame={previousFrame} message="Question not found" />;
        }

        return <Question state={state} previousFrame={previousFrame} question={question} />;
      }

      // Frame State 3: 2nd Order Answer
      if (state?.step === "question2") {
        return (
          <QuestionSecondOrder
            state={state}
            previousFrame={previousFrame}
            answerOption={buttonIndex}
          />
        );
      }

      // Frame State 4: User submit the answer
      if (state?.step === "answer") {
        const answer = {
          username,
          inputText,
          buttonIndex: state.answerOption,
        };
        return <Answer state={state} previousFrame={previousFrame} answer={answer as UserAnswer} />;
      }
    }

    // Frame State 1: Welcome Intro
    return <Intro state={state} previousFrame={previousFrame} />;
  } catch (error: any) {
    console.error(error);
    return <Error previousFrame={previousFrame} message={error.message} detail={error.stack} />;
  }
}
