import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { ProgressBarOverlay } from "../components/ProgressBarOverlay";
import { GradientBackground } from "../components/GradientBackground";

export const ProgressBarTemplateSchema = z.object({
  label: z.string().default("Loading"),
  percentage: z.number().default(100),
  style: z.enum(["bar", "circle", "minimal"]).default("bar"),
  barColor: z.string().default("#4f46e5"),
  textColor: z.string().default("#ffffff"),
  backgroundColors: z
    .array(z.string())
    .default(["#0f172a", "#1e293b", "#334155"]),
});

export type ProgressBarTemplateProps = z.infer<typeof ProgressBarTemplateSchema>;

export const ProgressBarTemplate: React.FC<ProgressBarTemplateProps> = ({
  label,
  percentage,
  style,
  barColor,
  textColor,
  backgroundColors,
}) => {
  return (
    <AbsoluteFill>
      <GradientBackground colors={backgroundColors} speed={0.15} />
      <ProgressBarOverlay
        label={label}
        percentage={percentage}
        style={style}
        barColor={barColor}
        textColor={textColor}
      />
    </AbsoluteFill>
  );
};
