import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type LogoRevealProps = {
  text: string;
  subtitle?: string;
  fontSize?: number;
  color?: string;
  accentColor?: string;
  style?: "minimal" | "glitch" | "scale";
};

export const LogoReveal: React.FC<LogoRevealProps> = ({
  text,
  subtitle = "",
  fontSize = 100,
  color = "#ffffff",
  accentColor = "#4f46e5",
  style = "minimal",
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  if (style === "glitch") {
    const reveal = interpolate(frame, [10, 30], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    });

    const glitchIntensity =
      frame < 30
        ? interpolate(frame, [10, 25, 30], [8, 4, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        : 0;

    const offsetX = glitchIntensity > 0
      ? Math.sin(frame * 13.7) * glitchIntensity
      : 0;
    const offsetY = glitchIntensity > 0
      ? Math.cos(frame * 17.3) * glitchIntensity * 0.5
      : 0;

    return (
      <AbsoluteFill className="justify-center items-center">
        {glitchIntensity > 0 && (
          <>
            <div
              style={{
                position: "absolute",
                fontSize,
                fontWeight: 700,
                fontFamily: "Inter, sans-serif",
                color: "#ff0040",
                opacity: 0.7,
                transform: `translate(${offsetX * 2}px, ${offsetY}px)`,
                mixBlendMode: "screen",
              }}
            >
              {text}
            </div>
            <div
              style={{
                position: "absolute",
                fontSize,
                fontWeight: 700,
                fontFamily: "Inter, sans-serif",
                color: "#00ff88",
                opacity: 0.7,
                transform: `translate(${-offsetX * 2}px, ${-offsetY}px)`,
                mixBlendMode: "screen",
              }}
            >
              {text}
            </div>
          </>
        )}
        <div
          style={{
            fontSize,
            fontWeight: 700,
            fontFamily: "Inter, sans-serif",
            color,
            opacity: reveal,
            transform: `translate(${offsetX}px, ${offsetY}px)`,
          }}
        >
          {text}
        </div>
      </AbsoluteFill>
    );
  }

  if (style === "scale") {
    const scale = spring({
      fps,
      frame,
      config: { damping: 12, stiffness: 80 },
      durationInFrames: 40,
    });

    const opacity = interpolate(frame, [0, 15], [0, 1], {
      extrapolateRight: "clamp",
    });

    const subtitleOpacity = interpolate(frame, [30, 45], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });

    return (
      <AbsoluteFill className="justify-center items-center">
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize,
              fontWeight: 700,
              fontFamily: "Inter, sans-serif",
              color,
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            {text}
          </div>
          {subtitle && (
            <div
              style={{
                fontSize: fontSize * 0.3,
                fontWeight: 400,
                fontFamily: "Inter, sans-serif",
                color: accentColor,
                opacity: subtitleOpacity,
                marginTop: 16,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {subtitle}
            </div>
          )}
        </div>
      </AbsoluteFill>
    );
  }

  // minimal style — line reveal
  const lineWidth = interpolate(frame, [5, 25], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const textOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [35, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      className="justify-center items-center"
      style={{ opacity: exitOpacity }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: `${lineWidth}%`,
            maxWidth: 200,
            height: 3,
            backgroundColor: accentColor,
            margin: "0 auto 24px",
          }}
        />
        <div
          style={{
            fontSize,
            fontWeight: 700,
            fontFamily: "Inter, sans-serif",
            color,
            opacity: textOpacity,
            letterSpacing: "-0.03em",
          }}
        >
          {text}
        </div>
        {subtitle && (
          <div
            style={{
              fontSize: fontSize * 0.25,
              fontWeight: 400,
              fontFamily: "Inter, sans-serif",
              color: "rgba(255,255,255,0.6)",
              opacity: subtitleOpacity,
              marginTop: 12,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
