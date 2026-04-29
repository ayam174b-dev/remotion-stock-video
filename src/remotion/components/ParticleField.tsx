import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

type Particle = {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  delay: number;
};

type ParticleFieldProps = {
  count?: number;
  color?: string;
  maxSize?: number;
  minSize?: number;
  speed?: number;
  style?: "dots" | "bokeh" | "snow" | "rising";
  seed?: number;
};

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  count = 50,
  color = "#ffffff",
  maxSize = 8,
  minSize = 2,
  speed = 1,
  style = "dots",
  seed = 42,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const particles = useMemo<Particle[]>(() => {
    const rand = seededRandom(seed);
    return Array.from({ length: count }, () => ({
      x: rand() * width,
      y: rand() * height,
      size: minSize + rand() * (maxSize - minSize),
      speedX: (rand() - 0.5) * 2 * speed,
      speedY:
        style === "rising"
          ? -(0.5 + rand() * 1.5) * speed
          : style === "snow"
            ? (0.3 + rand() * 0.7) * speed
            : (rand() - 0.5) * 2 * speed,
      opacity: 0.3 + rand() * 0.7,
      delay: rand() * 60,
    }));
  }, [count, width, height, maxSize, minSize, speed, style, seed]);

  const time = frame / fps;

  return (
    <AbsoluteFill>
      <svg width={width} height={height}>
        {style === "bokeh" && (
          <defs>
            <filter id="bokeh-blur">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>
        )}
        {particles.map((particle, i) => {
          const adjustedFrame = Math.max(0, frame - particle.delay);
          const px =
            ((particle.x + particle.speedX * adjustedFrame + width) % width +
              width) %
            width;
          const py =
            ((particle.y + particle.speedY * adjustedFrame + height) % height +
              height) %
            height;

          const twinkle =
            style === "bokeh"
              ? 0.5 + 0.5 * Math.sin(time * 2 + i * 1.7)
              : particle.opacity;

          return (
            <circle
              key={i}
              cx={px}
              cy={py}
              r={particle.size / 2}
              fill={color}
              opacity={twinkle}
              filter={style === "bokeh" ? "url(#bokeh-blur)" : undefined}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
