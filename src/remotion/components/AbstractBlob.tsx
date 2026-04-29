import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

type AbstractBlobProps = {
  colors?: string[];
  count?: number;
  speed?: number;
  blur?: number;
  seed?: number;
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const AbstractBlob: React.FC<AbstractBlobProps> = ({
  colors = ["#667eea", "#764ba2", "#f093fb", "#4f46e5"],
  count = 4,
  speed = 1,
  blur = 80,
  seed = 42,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const time = (frame / fps) * speed;

  const rand = seededRandom(seed);
  const blobs = Array.from({ length: count }, (_, i) => {
    const baseX = rand() * width;
    const baseY = rand() * height;
    const size = (0.3 + rand() * 0.5) * Math.min(width, height) * 0.4;
    const phaseX = rand() * Math.PI * 2;
    const phaseY = rand() * Math.PI * 2;
    const freqX = 0.3 + rand() * 0.5;
    const freqY = 0.2 + rand() * 0.4;

    const x = baseX + Math.sin(time * freqX + phaseX) * width * 0.15;
    const y = baseY + Math.cos(time * freqY + phaseY) * height * 0.15;

    return {
      x,
      y,
      size,
      color: colors[i % colors.length],
    };
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        filter: `blur(${blur}px)`,
        overflow: "hidden",
      }}
    >
      {blobs.map((blob, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: blob.x - blob.size / 2,
            top: blob.y - blob.size / 2,
            width: blob.size,
            height: blob.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 70%)`,
            opacity: 0.7,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
