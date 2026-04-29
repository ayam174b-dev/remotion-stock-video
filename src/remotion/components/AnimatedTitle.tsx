import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EASE_OUT } from "../presets";

type AnimatedTitleProps = {
  text: string;
  fontSize?: number;
  color?: string;
  fontFamily?: string;
  fontWeight?: string | number;
  animation?: "fade" | "slideUp" | "scaleIn" | "charByChar" | "wordByWord";
  animationDuration?: number;
};

export const AnimatedTitle: React.FC<AnimatedTitleProps> = ({
  text,
  fontSize = 80,
  color = "#ffffff",
  fontFamily = "Inter, sans-serif",
  fontWeight = 700,
  animation = "slideUp",
  animationDuration = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dur = animationDuration * fps;

  if (animation === "charByChar") {
    return (
      <AbsoluteFill className="justify-center items-center">
        <div
          style={{
            fontSize,
            color,
            fontFamily,
            fontWeight,
            display: "flex",
            gap: 2,
          }}
        >
          {text.split("").map((char, i) => {
            const delay = i * 2;
            const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            });
            const y = interpolate(frame, [delay, delay + 10], [30, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            });
            return (
              <span
                key={`${i}-${char}`}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  display: "inline-block",
                  whiteSpace: "pre",
                }}
              >
                {char}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    );
  }

  if (animation === "wordByWord") {
    const words = text.split(" ");
    return (
      <AbsoluteFill className="justify-center items-center">
        <div
          style={{
            fontSize,
            color,
            fontFamily,
            fontWeight,
            display: "flex",
            flexWrap: "wrap",
            gap: `0 ${fontSize * 0.3}px`,
            justifyContent: "center",
          }}
        >
          {words.map((word, i) => {
            const delay = i * 6;
            const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            });
            const y = interpolate(frame, [delay, delay + 12], [40, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: EASE_OUT,
            });
            return (
              <span
                key={`${i}-${word}`}
                style={{
                  opacity,
                  transform: `translateY(${y}px)`,
                  display: "inline-block",
                }}
              >
                {word}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    );
  }

  let opacity = 1;
  let translateY = 0;
  let scale = 1;

  if (animation === "fade") {
    opacity = interpolate(frame, [0, dur], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_OUT,
    });
  } else if (animation === "slideUp") {
    opacity = interpolate(frame, [0, dur * 0.6], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    translateY = interpolate(frame, [0, dur], [80, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: EASE_OUT,
    });
  } else if (animation === "scaleIn") {
    opacity = interpolate(frame, [0, dur * 0.5], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    scale = interpolate(frame, [0, dur], [0.5, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
    });
  }

  return (
    <AbsoluteFill className="justify-center items-center">
      <h1
        style={{
          fontSize,
          color,
          fontFamily,
          fontWeight,
          opacity,
          transform: `translateY(${translateY}px) scale(${scale})`,
        }}
      >
        {text}
      </h1>
    </AbsoluteFill>
  );
};
