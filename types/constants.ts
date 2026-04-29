import { z } from "zod";

export const COMP_NAME = "GradientLoop";

export const CompositionProps = z.object({
  title: z.string(),
});

export const defaultMyCompProps: z.infer<typeof CompositionProps> = {
  title: "Stock Video Generator",
};

export const DURATION_IN_FRAMES = 300;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const VIDEO_FPS = 30;
