import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type GradientBackgroundProps = {
  colors?: string[];
  speed?: number;
  type?: "linear" | "radial" | "conic";
  angle?: number;
};

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  colors = ["#667eea", "#764ba2", "#f093fb", "#667eea"],
  speed = 1,
  type = "linear",
  angle = 135,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = (frame / fps) * speed * 50;

  if (type === "radial") {
    const x = interpolate(
      Math.sin((frame / fps) * speed * Math.PI * 0.5),
      [-1, 1],
      [30, 70],
    );
    const y = interpolate(
      Math.cos((frame / fps) * speed * Math.PI * 0.3),
      [-1, 1],
      [30, 70],
    );

    return (
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at ${x}% ${y}%, ${colors.join(", ")})`,
        }}
      />
    );
  }

  if (type === "conic") {
    const rotation = (frame / fps) * speed * 30;
    return (
      <AbsoluteFill
        style={{
          background: `conic-gradient(from ${rotation}deg at 50% 50%, ${colors.join(", ")})`,
        }}
      />
    );
  }

  const gradientAngle = angle + progress;
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${gradientAngle}deg, ${colors.join(", ")})`,
      }}
    />
  );
};
