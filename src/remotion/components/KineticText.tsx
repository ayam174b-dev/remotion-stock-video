import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { EASE_OUT } from "../presets";

type KineticTextProps = {
  words: string[];
  fontSize?: number;
  color?: string;
  highlightColor?: string;
  fontFamily?: string;
  style?: "spotlight" | "stack" | "typewriter";
};

export const KineticText: React.FC<KineticTextProps> = ({
  words,
  fontSize = 80,
  color = "#ffffff",
  highlightColor = "#4f46e5",
  fontFamily = "Inter, sans-serif",
  style = "spotlight",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const framesPerWord = Math.floor(durationInFrames / words.length);

  if (style === "typewriter") {
    const totalChars = words.join(" ").length;
    const charsVisible = Math.floor(
      interpolate(frame, [0, durationInFrames * 0.8], [0, totalChars], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    );

    const fullText = words.join(" ");
    const visibleText = fullText.slice(0, charsVisible);
    const cursorOpacity = frame % fps < fps / 2 ? 1 : 0;

    return (
      <AbsoluteFill className="justify-center items-center">
        <div
          style={{
            fontSize,
            fontWeight: 700,
            color,
            fontFamily: "'Courier New', monospace",
            maxWidth: "80%",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          {visibleText}
          <span style={{ opacity: cursorOpacity, color: highlightColor }}>
            |
          </span>
        </div>
      </AbsoluteFill>
    );
  }

  if (style === "stack") {
    return (
      <AbsoluteFill className="justify-center items-center">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: fontSize * 0.2,
          }}
        >
          {words.map((word, i) => {
            const wordStart = i * framesPerWord;
            const opacity = interpolate(
              frame,
              [wordStart, wordStart + 15],
              [0, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_OUT },
            );
            const y = interpolate(
              frame,
              [wordStart, wordStart + 15],
              [40, 0],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: EASE_OUT },
            );

            return (
              <div
                key={i}
                style={{
                  fontSize,
                  fontWeight: 700,
                  color,
                  fontFamily,
                  opacity,
                  transform: `translateY(${y}px)`,
                }}
              >
                {word}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    );
  }

  // spotlight style
  const currentWordIndex = Math.min(
    Math.floor(frame / framesPerWord),
    words.length - 1,
  );

  return (
    <AbsoluteFill className="justify-center items-center">
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: `0 ${fontSize * 0.3}px`,
          maxWidth: "80%",
        }}
      >
        {words.map((word, i) => {
          const isActive = i === currentWordIndex;
          const isPast = i < currentWordIndex;
          const wordOpacity = interpolate(
            frame,
            [i * framesPerWord, i * framesPerWord + 10],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          );

          return (
            <span
              key={i}
              style={{
                fontSize,
                fontWeight: 700,
                fontFamily,
                color: isActive ? highlightColor : isPast ? color : "rgba(255,255,255,0.2)",
                opacity: wordOpacity,
                transform: isActive ? "scale(1.1)" : "scale(1)",
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
};
