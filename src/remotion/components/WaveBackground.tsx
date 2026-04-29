import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";

type WaveBackgroundProps = {
  layers?: number;
  colors?: string[];
  speed?: number;
  amplitude?: number;
  backgroundColor?: string;
};

export const WaveBackground: React.FC<WaveBackgroundProps> = ({
  layers = 4,
  colors = ["#4f46e5", "#7c3aed", "#a855f7", "#c084fc"],
  speed = 1,
  amplitude = 50,
  backgroundColor = "#0f0a1e",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const time = (frame / fps) * speed;

  const wavePaths = Array.from({ length: layers }, (_, layerIndex) => {
    const layerProgress = layerIndex / layers;
    const baseY = height * 0.4 + layerIndex * (height * 0.15);
    const freq = 0.003 + layerIndex * 0.001;
    const amp = amplitude * (1 - layerProgress * 0.3);
    const phase = time * (1 + layerIndex * 0.3) + layerIndex * Math.PI * 0.5;

    let d = `M 0 ${height}`;
    for (let x = 0; x <= width; x += 4) {
      const y =
        baseY +
        Math.sin(x * freq + phase) * amp +
        Math.sin(x * freq * 2.3 + phase * 0.7) * amp * 0.3;
      d += ` L ${x} ${y}`;
    }
    d += ` L ${width} ${height} Z`;

    return {
      d,
      color: colors[layerIndex % colors.length],
      opacity: 0.6 + layerProgress * 0.4,
    };
  });

  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <svg width={width} height={height}>
        {wavePaths.map((wave, i) => (
          <path key={i} d={wave.d} fill={wave.color} opacity={wave.opacity} />
        ))}
      </svg>
    </AbsoluteFill>
  );
};
