import { Easing, interpolate, spring } from "remotion";

type AnimationConfig = {
  extrapolateLeft?: "clamp" | "extend" | "identity";
  extrapolateRight?: "clamp" | "extend" | "identity";
};

const CLAMP: AnimationConfig = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
};

export const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
export const EASE_IN = Easing.bezier(0.55, 0.055, 0.675, 0.19);
export const EASE_IN_OUT = Easing.bezier(0.45, 0, 0.55, 1);
export const EASE_POP = Easing.bezier(0.34, 1.56, 0.64, 1);

export function fadeIn(frame: number, durationInFrames: number): number {
  return interpolate(frame, [0, durationInFrames], [0, 1], {
    ...CLAMP,
    easing: EASE_OUT,
  });
}

export function fadeOut(frame: number, durationInFrames: number): number {
  return interpolate(frame, [0, durationInFrames], [1, 0], {
    ...CLAMP,
    easing: EASE_IN,
  });
}

export function slideInUp(frame: number, durationInFrames: number): number {
  return interpolate(frame, [0, durationInFrames], [100, 0], {
    ...CLAMP,
    easing: EASE_OUT,
  });
}

export function slideInDown(frame: number, durationInFrames: number): number {
  return interpolate(frame, [0, durationInFrames], [-100, 0], {
    ...CLAMP,
    easing: EASE_OUT,
  });
}

export function slideInLeft(frame: number, durationInFrames: number): number {
  return interpolate(frame, [0, durationInFrames], [-100, 0], {
    ...CLAMP,
    easing: EASE_OUT,
  });
}

export function slideInRight(frame: number, durationInFrames: number): number {
  return interpolate(frame, [0, durationInFrames], [100, 0], {
    ...CLAMP,
    easing: EASE_OUT,
  });
}

export function scaleIn(frame: number, durationInFrames: number): number {
  return interpolate(frame, [0, durationInFrames], [0, 1], {
    ...CLAMP,
    easing: EASE_POP,
  });
}

export function scaleOut(frame: number, durationInFrames: number): number {
  return interpolate(frame, [0, durationInFrames], [1, 0], {
    ...CLAMP,
    easing: EASE_IN,
  });
}

export function rotateIn(frame: number, durationInFrames: number): number {
  return interpolate(frame, [0, durationInFrames], [-90, 0], {
    ...CLAMP,
    easing: EASE_OUT,
  });
}

export function blurIn(frame: number, durationInFrames: number): number {
  return interpolate(frame, [0, durationInFrames], [20, 0], {
    ...CLAMP,
    easing: EASE_OUT,
  });
}

export function blurOut(frame: number, durationInFrames: number): number {
  return interpolate(frame, [0, durationInFrames], [0, 20], {
    ...CLAMP,
    easing: EASE_IN,
  });
}

export function springIn(
  frame: number,
  fps: number,
  durationInFrames: number,
): number {
  return spring({
    fps,
    frame,
    config: { damping: 12, stiffness: 100 },
    durationInFrames,
  });
}

export function pulse(
  frame: number,
  fps: number,
  cycleDurationInFrames: number,
): number {
  const cycleFrame = frame % cycleDurationInFrames;
  const half = cycleDurationInFrames / 2;
  if (cycleFrame < half) {
    return interpolate(cycleFrame, [0, half], [1, 1.15], {
      ...CLAMP,
      easing: EASE_IN_OUT,
    });
  }
  return interpolate(cycleFrame, [half, cycleDurationInFrames], [1.15, 1], {
    ...CLAMP,
    easing: EASE_IN_OUT,
  });
}

export function float(
  frame: number,
  amplitude: number,
  cycleDurationInFrames: number,
): number {
  const progress = (frame % cycleDurationInFrames) / cycleDurationInFrames;
  return Math.sin(progress * Math.PI * 2) * amplitude;
}

export function breathe(
  frame: number,
  cycleDurationInFrames: number,
): number {
  const progress = (frame % cycleDurationInFrames) / cycleDurationInFrames;
  return 0.95 + 0.05 * Math.sin(progress * Math.PI * 2);
}
