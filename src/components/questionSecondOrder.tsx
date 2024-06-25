/* eslint-disable @next/next/no-img-element */
import {
  FrameButton,
  FrameContainer,
  FrameImage,
  FrameInput,
  type PreviousFrame,
} from "frames.js/next/server";
import { State } from "../types";

export default function QuestionSecondOrder({
  previousFrame,
  state,
  answerOption,
}: {
  previousFrame: PreviousFrame;
  state: State;
  answerOption: number;
}) {
  return (
    <FrameContainer
      postUrl="/frames"
      pathname="/"
      state={{ ...state, step: "answer", answerOption }}
      previousFrame={previousFrame}
    >
      {/* @ts-expect-error Type 'ReactNode' is not assignable to type 'ChildType | (ChildType | null)[]'. */}
      <FrameImage>
        <div tw="w-full h-full text-white justify-center items-center text-[2.5rem] font-medium flex">
          <img
            alt="cover"
            tw="relative w-full h-full bg-sky-200"
            src="http://localhost:3000/3.png"
            width={500}
            height={500}
          >
            <div tw="flex flex-col gap-4 px-[6rem]">
              <span tw="pt-40">How likely do you think others will agree with you?</span>
              <span tw="pt-20">
                For example enter 25% if you believe 25% of people will give the same response as
                you did.
              </span>
            </div>
          </img>
        </div>
      </FrameImage>
      <FrameInput text="Type your answer" />
      <FrameButton>Submit</FrameButton>
    </FrameContainer>
  );
}
