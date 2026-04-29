import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type CounterNumberProps = {
  from?: number;
  to: number;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export const CounterNumber: React.FC<CounterNumberProps> = ({
  from = 0,
  to,
  fontSize = 120,
  color = "#ffffff",
  fontFamily = "Inter, sans-serif",
  prefix = "",
  suffix = "",
  decimals = 0,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames * 0.8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const value = interpolate(progress, [0, 1], [from, to]);
  const displayValue =
    decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString();

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const scale = interpolate(frame, [0, 15], [0.8, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.34, 1.56, 0.64, 1),
  });

  return (
    <AbsoluteFill className="justify-center items-center">
      <div
        style={{
          fontSize,
          color,
          fontFamily,
          fontWeight: 700,
          opacity,
          transform: `scale(${scale})`,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.03em",
        }}
      >
        {prefix}
        {displayValue}
        {suffix}
      </div>
    </AbsoluteFill>
  );
};
