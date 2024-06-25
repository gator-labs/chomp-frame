/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { FrameButton, FrameContainer, FrameImage, type PreviousFrame } from "frames.js/next/server";
import { QuestionDeck, QuestionOptions, State } from "../types";

export default function Question({
  previousFrame,
  state,
  question,
}: {
  previousFrame: PreviousFrame;
  state: State;
  question: QuestionDeck;
}) {
  return (
    <FrameContainer
      postUrl="/frames"
      pathname="/"
      state={{ ...state, step: "question2" }}
      previousFrame={previousFrame}
    >
      <FrameImage>
        {question && (
          <div tw="w-full h-full text-white justify-center items-center text-[4rem] font-medium flex">
            <img
              alt="cover"
              tw="relative w-full h-full bg-sky-200"
              src="http://localhost:3000/2.png"
              width={500}
              height={500}
            >
              <span tw="py-[10rem] px-[5rem]">{question.question}</span>
            </img>
          </div>
        )}
      </FrameImage>
      {question.questionOptions.length ? (
        question.questionOptions.map((option: QuestionOptions) => (
          <FrameButton key={option.id}>{option.option}</FrameButton>
        ))
      ) : (
        <FrameButton>Refresh</FrameButton>
      )}
    </FrameContainer>
  );
}
