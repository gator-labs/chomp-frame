import { createFrames } from "frames.js/next";

export const frames = createFrames({
  basePath: "/api/frames",
  initialState: { counter: 0 },
});
