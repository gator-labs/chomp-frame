/* eslint-disable @next/next/no-img-element */
import { FrameButton, FrameContainer, FrameImage, type PreviousFrame } from "frames.js/next/server";
import { State } from "../types";

export default function Intro({
  previousFrame,
  state,
}: {
  previousFrame: PreviousFrame;
  state: State;
}) {
  const HOST_URL = process.env.NEXT_PUBLIC_HOST;
  return (
    <FrameContainer
      postUrl="/frames"
      pathname="/"
      state={{ ...state, step: "question" }}
      previousFrame={previousFrame}
    >
      {/* @ts-expect-error Type 'ReactNode' is not assignable to type 'ChildType | (ChildType | null)[]'. */}
      <FrameImage>
        <div tw="w-full h-full text-white justify-center items-center text-[4rem] font-medium flex">
          <img
            alt="cover"
            tw="relative w-full h-full bg-sky-200"
            src={`${HOST_URL}/background.png`}
            width={500}
            height={500}
          >
            <span tw="py-[14rem] px-[17rem]">Welcome to Chomp</span>
          </img>
        </div>
      </FrameImage>
      <FrameButton>Play chomp ⚡️</FrameButton>
    </FrameContainer>
  );
}
