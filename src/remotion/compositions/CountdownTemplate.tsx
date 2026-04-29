import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { CountdownTimer } from "../components/CountdownTimer";
import { GradientBackground } from "../components/GradientBackground";
import { ParticleField } from "../components/ParticleField";

export const CountdownTemplateSchema = z.object({
  from: z.number().default(10),
  to: z.number().default(0),
  style: z.enum(["circular", "digital", "minimal"]).default("circular"),
  color: z.string().default("#ffffff"),
  accentColor: z.string().default("#4f46e5"),
  backgroundColors: z
    .array(z.string())
    .default(["#0f172a", "#1e293b", "#334155"]),
  showParticles: z.boolean().default(true),
});

export type CountdownTemplateProps = z.infer<typeof CountdownTemplateSchema>;

export const CountdownTemplate: React.FC<CountdownTemplateProps> = ({
  from,
  to,
  style,
  color,
  accentColor,
  backgroundColors,
  showParticles,
}) => {
  return (
    <AbsoluteFill>
      <GradientBackground colors={backgroundColors} speed={0.2} />
      {showParticles && (
        <ParticleField
          count={20}
          color="rgba(255,255,255,0.3)"
          style="dots"
          maxSize={4}
          speed={0.2}
        />
      )}
      <CountdownTimer
        from={from}
        to={to}
        style={style}
        color={color}
        accentColor={accentColor}
      />
    </AbsoluteFill>
  );
};
