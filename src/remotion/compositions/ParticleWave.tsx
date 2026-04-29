import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { ParticleField } from "../components/ParticleField";

export const ParticleWaveSchema = z.object({
  backgroundColor: z.string().default("#0a0a1a"),
  particleColor: z.string().default("#60a5fa"),
  particleCount: z.number().default(80),
  particleStyle: z.enum(["dots", "bokeh", "snow", "rising"]).default("rising"),
  speed: z.number().default(1),
  maxSize: z.number().default(6),
});

export type ParticleWaveProps = z.infer<typeof ParticleWaveSchema>;

export const ParticleWave: React.FC<ParticleWaveProps> = ({
  backgroundColor,
  particleColor,
  particleCount,
  particleStyle,
  speed,
  maxSize,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <ParticleField
        count={Math.round(particleCount * 0.3)}
        color={particleColor}
        style={particleStyle}
        speed={speed * 0.5}
        maxSize={maxSize * 1.5}
        minSize={maxSize * 0.5}
        seed={1}
      />
      <ParticleField
        count={Math.round(particleCount * 0.5)}
        color={particleColor}
        style={particleStyle}
        speed={speed}
        maxSize={maxSize}
        minSize={2}
        seed={100}
      />
      <ParticleField
        count={Math.round(particleCount * 0.2)}
        color={particleColor}
        style={particleStyle}
        speed={speed * 1.5}
        maxSize={maxSize * 0.6}
        minSize={1}
        seed={200}
      />
    </AbsoluteFill>
  );
};
