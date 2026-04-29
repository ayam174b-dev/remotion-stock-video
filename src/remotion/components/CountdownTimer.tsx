import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type CountdownTimerProps = {
  from?: number;
  to?: number;
  fontSize?: number;
  color?: string;
  accentColor?: string;
  style?: "circular" | "digital" | "minimal";
  showProgress?: boolean;
};

export const CountdownTimer: React.FC<CountdownTimerProps> = ({
  from = 10,
  to = 0,
  fontSize = 160,
  color = "#ffffff",
  accentColor = "#4f46e5",
  style = "circular",
  showProgress = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps, width, height } = useVideoConfig();

  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const currentValue = Math.ceil(
    interpolate(progress, [0, 1], [from, to], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const displayValue = Math.max(to, currentValue);

  const secondProgress = (frame % fps) / fps;

  const pulseScale = interpolate(
    secondProgress,
    [0, 0.15, 1],
    [1.15, 1, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  if (style === "circular") {
    const radius = Math.min(width, height) * 0.22;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference * (1 - progress);

    return (
      <AbsoluteFill className="justify-center items-center">
        {showProgress && (
          <svg
            width={radius * 2 + 40}
            height={radius * 2 + 40}
            style={{ position: "absolute" }}
          >
            <circle
              cx={radius + 20}
              cy={radius + 20}
              r={radius}
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={6}
            />
            <circle
              cx={radius + 20}
              cy={radius + 20}
              r={radius}
              fill="none"
              stroke={accentColor}
              strokeWidth={6}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform={`rotate(-90, ${radius + 20}, ${radius + 20})`}
            />
          </svg>
        )}
        <div
          style={{
            fontSize,
            fontWeight: 700,
            color,
            fontFamily: "Inter, sans-serif",
            fontVariantNumeric: "tabular-nums",
            transform: `scale(${pulseScale})`,
          }}
        >
          {displayValue}
        </div>
      </AbsoluteFill>
    );
  }

  if (style === "digital") {
    const glowOpacity = interpolate(
      secondProgress,
      [0, 0.1, 0.5],
      [0.8, 0.3, 0.3],
      { extrapolateRight: "clamp" },
    );

    return (
      <AbsoluteFill className="justify-center items-center">
        <div
          style={{
            fontSize: fontSize * 1.2,
            fontWeight: 700,
            color: accentColor,
            fontFamily: "'Courier New', monospace",
            fontVariantNumeric: "tabular-nums",
            textShadow: `0 0 40px ${accentColor}${Math.round(glowOpacity * 255).toString(16).padStart(2, "0")}`,
            transform: `scale(${pulseScale})`,
            letterSpacing: "0.1em",
          }}
        >
          {String(displayValue).padStart(2, "0")}
        </div>
        {showProgress && (
          <div
            style={{
              position: "absolute",
              bottom: height * 0.25,
              width: width * 0.4,
              height: 4,
              backgroundColor: "rgba(255,255,255,0.1)",
              borderRadius: 2,
            }}
          >
            <div
              style={{
                width: `${(1 - progress) * 100}%`,
                height: "100%",
                backgroundColor: accentColor,
                borderRadius: 2,
              }}
            />
          </div>
        )}
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill className="justify-center items-center">
      <div
        style={{
          fontSize: fontSize * 1.5,
          fontWeight: 200,
          color,
          fontFamily: "Inter, sans-serif",
          fontVariantNumeric: "tabular-nums",
          transform: `scale(${pulseScale})`,
          opacity: interpolate(frame, [0, 10], [0, 1], {
            extrapolateRight: "clamp",
          }),
        }}
      >
        {displayValue}
      </div>
    </AbsoluteFill>
  );
};
