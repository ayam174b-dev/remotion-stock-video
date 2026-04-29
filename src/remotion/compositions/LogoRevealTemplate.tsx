import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { LogoReveal } from "../components/LogoReveal";
import { GradientBackground } from "../components/GradientBackground";

export const LogoRevealTemplateSchema = z.object({
  text: z.string().default("BRAND"),
  subtitle: z.string().default("Creative Studio"),
  style: z.enum(["minimal", "glitch", "scale"]).default("minimal"),
  color: z.string().default("#ffffff"),
  accentColor: z.string().default("#4f46e5"),
  fontSize: z.number().default(100),
  backgroundColors: z
    .array(z.string())
    .default(["#0a0a0a", "#1a1a2e", "#16213e"]),
});

export type LogoRevealTemplateProps = z.infer<typeof LogoRevealTemplateSchema>;

export const LogoRevealTemplate: React.FC<LogoRevealTemplateProps> = ({
  text,
  subtitle,
  style,
  color,
  accentColor,
  fontSize,
  backgroundColors,
}) => {
  return (
    <AbsoluteFill>
      <GradientBackground colors={backgroundColors} speed={0.15} />
      <LogoReveal
        text={text}
        subtitle={subtitle}
        style={style}
        color={color}
        accentColor={accentColor}
        fontSize={fontSize}
      />
    </AbsoluteFill>
  );
};
