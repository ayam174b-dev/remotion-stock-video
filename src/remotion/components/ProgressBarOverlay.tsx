import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type ProgressBarOverlayProps = {
  label?: string;
  percentage?: number;
  barColor?: string;
  trackColor?: string;
  textColor?: string;
  position?: "top" | "center" | "bottom";
  style?: "bar" | "circle" | "minimal";
};

export const ProgressBarOverlay: React.FC<ProgressBarOverlayProps> = ({
  label = "Loading",
  percentage = 100,
  barColor = "#4f46e5",
  trackColor = "rgba(255,255,255,0.1)",
  textColor = "#ffffff",
  position = "center",
  style = "bar",
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames, width } = useVideoConfig();

  const progress = interpolate(
    frame,
    [0, durationInFrames * 0.85],
    [0, percentage],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    },
  );

  const fadeIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: "clamp",
  });

  const justify =
    position === "top"
      ? "flex-start"
      : position === "bottom"
        ? "flex-end"
        : "center";

  const padding = position === "center" ? "0" : "0 80px 120px 80px";

  if (style === "circle") {
    const radius = 80;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - progress / 100);

    return (
      <AbsoluteFill
        style={{ justifyContent: justify, alignItems: "center", padding }}
      >
        <div
          style={{ opacity: fadeIn, textAlign: "center", position: "relative" }}
        >
          <svg width={200} height={200}>
            <circle
              cx={100}
              cy={100}
              r={radius}
              fill="none"
              stroke={trackColor}
              strokeWidth={8}
            />
            <circle
              cx={100}
              cy={100}
              r={radius}
              fill="none"
              stroke={barColor}
              strokeWidth={8}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90, 100, 100)"
            />
          </svg>
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              fontSize: 36,
              fontWeight: 700,
              color: textColor,
              fontFamily: "Inter, sans-serif",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {Math.round(progress)}%
          </div>
          {label && (
            <div
              style={{
                fontSize: 18,
                color: "rgba(255,255,255,0.6)",
                fontFamily: "Inter, sans-serif",
                marginTop: 16,
              }}
            >
              {label}
            </div>
          )}
        </div>
      </AbsoluteFill>
    );
  }

  if (style === "minimal") {
    return (
      <AbsoluteFill
        style={{ justifyContent: justify, alignItems: "center", padding }}
      >
        <div style={{ opacity: fadeIn, width: width * 0.6, textAlign: "center" }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: textColor,
              fontFamily: "Inter, sans-serif",
              fontVariantNumeric: "tabular-nums",
              marginBottom: 24,
            }}
          >
            {Math.round(progress)}%
          </div>
          <div
            style={{
              width: "100%",
              height: 2,
              backgroundColor: trackColor,
              borderRadius: 1,
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                backgroundColor: barColor,
                borderRadius: 1,
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  // bar style
  return (
    <AbsoluteFill
      style={{ justifyContent: justify, alignItems: "center", padding }}
    >
      <div style={{ opacity: fadeIn, width: width * 0.5 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontSize: 20,
              color: textColor,
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
            }}
          >
            {label}
          </span>
          <span
            style={{
              fontSize: 20,
              color: textColor,
              fontFamily: "Inter, sans-serif",
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {Math.round(progress)}%
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: 12,
            backgroundColor: trackColor,
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: barColor,
              borderRadius: 6,
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};
