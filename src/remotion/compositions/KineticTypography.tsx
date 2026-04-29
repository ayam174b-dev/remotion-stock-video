import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { KineticText } from "../components/KineticText";
import { GradientBackground } from "../components/GradientBackground";

export const KineticTypographySchema = z.object({
  words: z.array(z.string()).default(["Create", "Something", "Beautiful", "Today"]),
  style: z.enum(["spotlight", "stack", "typewriter"]).default("spotlight"),
  fontSize: z.number().default(80),
  color: z.string().default("#ffffff"),
  highlightColor: z.string().default("#4f46e5"),
  backgroundColors: z
    .array(z.string())
    .default(["#0f172a", "#1e293b", "#334155"]),
});

export type KineticTypographyProps = z.infer<typeof KineticTypographySchema>;

export const KineticTypography: React.FC<KineticTypographyProps> = ({
  words,
  style,
  fontSize,
  color,
  highlightColor,
  backgroundColors,
}) => {
  return (
    <AbsoluteFill>
      <GradientBackground colors={backgroundColors} speed={0.2} />
      <KineticText
        words={words}
        style={style}
        fontSize={fontSize}
        color={color}
        highlightColor={highlightColor}
      />
    </AbsoluteFill>
  );
};
