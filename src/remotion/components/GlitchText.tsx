import React, { useMemo } from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
} from "remotion";

type GlitchTextProps = {
  text: string;
  fontSize?: number;
  color?: string;
  glitchColor1?: string;
  glitchColor2?: string;
  intensity?: number;
  seed?: number;
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const GlitchText: React.FC<GlitchTextProps> = ({
  text,
  fontSize = 100,
  color = "#ffffff",
  glitchColor1 = "#ff0040",
  glitchColor2 = "#00ff88",
  intensity = 1,
  seed = 42,
}) => {
  const frame = useCurrentFrame();

  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  const rand = useMemo(() => seededRandom(seed + frame), [seed, frame]);

  const isGlitching = useMemo(() => {
    const r = seededRandom(seed + Math.floor(frame / 3));
    return r() < 0.3;
  }, [seed, frame]);

  const offsetX = isGlitching ? (rand() - 0.5) * 10 * intensity : 0;
  const offsetY = isGlitching ? (rand() - 0.5) * 4 * intensity : 0;
  const skew = isGlitching ? (rand() - 0.5) * 3 * intensity : 0;

  const clipTop = isGlitching ? rand() * 40 : 0;
  const clipBottom = isGlitching ? 60 + rand() * 40 : 100;

  return (
    <AbsoluteFill className="justify-center items-center" style={{ opacity: fadeIn }}>
      {/* Red channel offset */}
      {isGlitching && (
        <div
          style={{
            position: "absolute",
            fontSize,
            fontWeight: 700,
            fontFamily: "Inter, sans-serif",
            color: glitchColor1,
            opacity: 0.6,
            transform: `translate(${offsetX * 2}px, ${offsetY}px) skewX(${skew}deg)`,
            clipPath: `inset(${clipTop}% 0 ${100 - clipBottom}% 0)`,
            mixBlendMode: "screen",
          }}
        >
          {text}
        </div>
      )}
      {/* Green channel offset */}
      {isGlitching && (
        <div
          style={{
            position: "absolute",
            fontSize,
            fontWeight: 700,
            fontFamily: "Inter, sans-serif",
            color: glitchColor2,
            opacity: 0.6,
            transform: `translate(${-offsetX * 1.5}px, ${-offsetY}px) skewX(${-skew}deg)`,
            clipPath: `inset(${100 - clipBottom}% 0 ${clipTop}% 0)`,
            mixBlendMode: "screen",
          }}
        >
          {text}
        </div>
      )}
      {/* Main text */}
      <div
        style={{
          fontSize,
          fontWeight: 700,
          fontFamily: "Inter, sans-serif",
          color,
          transform: `translate(${offsetX * 0.5}px, 0) skewX(${skew * 0.3}deg)`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
