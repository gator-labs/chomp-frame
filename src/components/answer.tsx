/* eslint-disable @next/next/no-img-element */
import { FrameButton, FrameContainer, FrameImage, type PreviousFrame } from "frames.js/next/server";
import { UserAnswer, State } from "../types";

export default function Answer({
  previousFrame,
  state,
  answer,
}: {
  previousFrame: PreviousFrame;
  state: State;
  answer: UserAnswer;
}) {
  return (
    <FrameContainer
      postUrl="/frames"
      pathname="/"
      state={{ ...state, step: "intro" }}
      previousFrame={previousFrame}
    >
      {/* @ts-expect-error Type 'ReactNode' is not assignable to type 'ChildType | (ChildType | null)[]'. */}
      <FrameImage>
        <div tw="w-full h-full text-white justify-center items-center text-[3rem] font-medium flex">
          <img
            alt="cover"
            tw="relative w-full h-full bg-sky-200"
            src="http://localhost:3000/background.png"
            width={500}
            height={500}
          >
            <div tw="flex flex-col gap-4 px-[17rem]">
              <span tw="pt-40">Username: {answer.username}</span>
              <span tw="pt-10">You selected option: {answer.buttonIndex}</span>
              <span tw="pt-4">Your anwer: {answer.inputText}</span>
            </div>
          </img>
        </div>
      </FrameImage>
      <FrameButton>&lt;&lt; Play more</FrameButton>
    </FrameContainer>
  );
}
