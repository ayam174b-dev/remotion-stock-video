import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { z } from "zod";
import { fontFamily, loadFont } from "@remotion/google-fonts/Inter";
import { AnimatedTitle } from "../components/AnimatedTitle";
import { GradientBackground } from "../components/GradientBackground";

loadFont("normal", { subsets: ["latin"], weights: ["400", "700"] });

export const TextAnimationSchema = z.object({
  title: z.string().default("Create Beautiful"),
  subtitle: z.string().default("Stock Videos"),
  animation: z
    .enum(["fade", "slideUp", "scaleIn", "charByChar", "wordByWord"])
    .default("charByChar"),
  titleColor: z.string().default("#ffffff"),
  subtitleColor: z.string().default("rgba(255, 255, 255, 0.8)"),
  backgroundColors: z
    .array(z.string())
    .default(["#0f172a", "#1e293b", "#334155"]),
  fontSize: z.number().default(80),
});

export type TextAnimationProps = z.infer<typeof TextAnimationSchema>;

export const TextAnimation: React.FC<TextAnimationProps> = ({
  title,
  subtitle,
  animation,
  titleColor,
  subtitleColor,
  backgroundColors,
  fontSize,
}) => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill>
      <GradientBackground colors={backgroundColors} speed={0.3} />

      <Sequence premountFor={fps}>
        <AnimatedTitle
          text={title}
          fontSize={fontSize}
          color={titleColor}
          fontFamily={fontFamily}
          animation={animation}
        />
      </Sequence>

      <Sequence from={Math.round(1.5 * fps)} premountFor={fps}>
        <AbsoluteFill
          className="justify-center items-center"
          style={{ marginTop: fontSize + 20 }}
        >
          <AnimatedTitle
            text={subtitle}
            fontSize={fontSize * 0.5}
            color={subtitleColor}
            fontFamily={fontFamily}
            animation="fade"
            animationDuration={0.8}
          />
        </AbsoluteFill>
      </Sequence>
    </AbsoluteFill>
  );
};
