import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { LowerThird } from "../components/LowerThird";
import { GradientBackground } from "../components/GradientBackground";

export const LowerThirdTemplateSchema = z.object({
  name: z.string().default("John Doe"),
  title: z.string().default("Creative Director"),
  barColor: z.string().default("#4f46e5"),
  textColor: z.string().default("#ffffff"),
  style: z.enum(["modern", "minimal", "bold"]).default("modern"),
  position: z.enum(["left", "center", "right"]).default("left"),
  showBackground: z.boolean().default(true),
  backgroundColors: z
    .array(z.string())
    .default(["#1a1a2e", "#16213e", "#0f3460"]),
});

export type LowerThirdTemplateProps = z.infer<typeof LowerThirdTemplateSchema>;

export const LowerThirdTemplate: React.FC<LowerThirdTemplateProps> = ({
  name,
  title,
  barColor,
  textColor,
  style,
  position,
  showBackground,
  backgroundColors,
}) => {
  return (
    <AbsoluteFill>
      {showBackground && (
        <GradientBackground colors={backgroundColors} speed={0.2} />
      )}
      <LowerThird
        name={name}
        title={title}
        barColor={barColor}
        textColor={textColor}
        style={style}
        position={position}
      />
    </AbsoluteFill>
  );
};
