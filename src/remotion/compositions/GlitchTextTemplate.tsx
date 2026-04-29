import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { GlitchText } from "../components/GlitchText";
import { GradientBackground } from "../components/GradientBackground";

export const GlitchTextTemplateSchema = z.object({
  text: z.string().default("GLITCH"),
  fontSize: z.number().default(120),
  color: z.string().default("#ffffff"),
  glitchColor1: z.string().default("#ff0040"),
  glitchColor2: z.string().default("#00ff88"),
  intensity: z.number().default(1),
  backgroundColors: z
    .array(z.string())
    .default(["#0a0a0a", "#111111", "#1a1a1a"]),
});

export type GlitchTextTemplateProps = z.infer<typeof GlitchTextTemplateSchema>;

export const GlitchTextTemplate: React.FC<GlitchTextTemplateProps> = ({
  text,
  fontSize,
  color,
  glitchColor1,
  glitchColor2,
  intensity,
  backgroundColors,
}) => {
  return (
    <AbsoluteFill>
      <GradientBackground colors={backgroundColors} speed={0.1} />
      <GlitchText
        text={text}
        fontSize={fontSize}
        color={color}
        glitchColor1={glitchColor1}
        glitchColor2={glitchColor2}
        intensity={intensity}
      />
    </AbsoluteFill>
  );
};
