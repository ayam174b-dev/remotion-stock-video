import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EASE_OUT, EASE_IN } from "../presets";

type LowerThirdProps = {
  name: string;
  title?: string;
  barColor?: string;
  textColor?: string;
  backgroundColor?: string;
  position?: "left" | "center" | "right";
  style?: "modern" | "minimal" | "bold";
};

export const LowerThird: React.FC<LowerThirdProps> = ({
  name,
  title = "",
  barColor = "#4f46e5",
  textColor = "#ffffff",
  backgroundColor = "rgba(0, 0, 0, 0.75)",
  position = "left",
  style = "modern",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const enterDur = 0.5 * fps;
  const exitStart = durationInFrames - 0.5 * fps;

  const slideIn = interpolate(frame, [0, enterDur], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const slideOut = interpolate(
    frame,
    [exitStart, durationInFrames],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_IN,
    },
  );

  const progress = Math.min(slideIn, slideOut);

  const barWidth = interpolate(progress, [0, 1], [0, 4], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const contentOpacity = interpolate(progress, [0.3, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateX = interpolate(progress, [0, 1], [-30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: EASE_OUT,
  });

  const justify =
    position === "center"
      ? "center"
      : position === "right"
        ? "flex-end"
        : "flex-start";

  if (style === "minimal") {
    return (
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: justify,
          padding: "0 60px 80px",
        }}
      >
        <div
          style={{
            opacity: contentOpacity,
            transform: `translateX(${translateX}px)`,
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: textColor,
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.02em",
            }}
          >
            {name}
          </div>
          {title && (
            <div
              style={{
                fontSize: 20,
                color: barColor,
                fontFamily: "Inter, sans-serif",
                marginTop: 4,
                fontWeight: 400,
              }}
            >
              {title}
            </div>
          )}
        </div>
      </AbsoluteFill>
    );
  }

  if (style === "bold") {
    const bgWidth = interpolate(progress, [0, 1], [0, 100], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_OUT,
    });

    return (
      <AbsoluteFill
        style={{
          justifyContent: "flex-end",
          alignItems: justify,
          padding: "0 60px 80px",
        }}
      >
        <div style={{ position: "relative" }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: barColor,
              width: `${bgWidth}%`,
              borderRadius: 4,
            }}
          />
          <div
            style={{
              position: "relative",
              padding: "16px 24px",
              opacity: contentOpacity,
            }}
          >
            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: textColor,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {name}
            </div>
            {title && (
              <div
                style={{
                  fontSize: 18,
                  color: textColor,
                  fontFamily: "Inter, sans-serif",
                  marginTop: 4,
                  opacity: 0.8,
                }}
              >
                {title}
              </div>
            )}
          </div>
        </div>
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: justify,
        padding: "0 60px 80px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "stretch",
          transform: `translateX(${translateX}px)`,
        }}
      >
        <div
          style={{
            width: barWidth,
            backgroundColor: barColor,
            borderRadius: 2,
            marginRight: 16,
          }}
        />
        <div
          style={{
            backgroundColor,
            padding: "14px 24px",
            borderRadius: "0 4px 4px 0",
            opacity: contentOpacity,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: textColor,
              fontFamily: "Inter, sans-serif",
              letterSpacing: "-0.01em",
            }}
          >
            {name}
          </div>
          {title && (
            <div
              style={{
                fontSize: 16,
                color: textColor,
                fontFamily: "Inter, sans-serif",
                marginTop: 2,
                opacity: 0.7,
              }}
            >
              {title}
            </div>
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
