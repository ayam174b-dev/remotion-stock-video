import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { GradientBackground } from "../components/GradientBackground";
import { ParticleField } from "../components/ParticleField";

export const GradientLoopSchema = z.object({
  colors: z.array(z.string()).default(["#667eea", "#764ba2", "#f093fb", "#667eea"]),
  gradientType: z.enum(["linear", "radial", "conic"]).default("linear"),
  speed: z.number().default(1),
  showParticles: z.boolean().default(true),
  particleColor: z.string().default("rgba(255, 255, 255, 0.6)"),
  particleCount: z.number().default(30),
});

export type GradientLoopProps = z.infer<typeof GradientLoopSchema>;

export const GradientLoop: React.FC<GradientLoopProps> = ({
  colors,
  gradientType,
  speed,
  showParticles,
  particleColor,
  particleCount,
}) => {
  return (
    <AbsoluteFill>
      <GradientBackground colors={colors} type={gradientType} speed={speed} />
      {showParticles && (
        <ParticleField
          count={particleCount}
          color={particleColor}
          style="bokeh"
          maxSize={12}
          minSize={3}
          speed={speed * 0.3}
        />
      )}
    </AbsoluteFill>
  );
};
