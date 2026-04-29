import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { AbstractBlob } from "../components/AbstractBlob";

export const AbstractBlobLoopSchema = z.object({
  colors: z
    .array(z.string())
    .default(["#667eea", "#764ba2", "#f093fb", "#4f46e5"]),
  count: z.number().default(4),
  speed: z.number().default(1),
  blur: z.number().default(80),
});

export type AbstractBlobLoopProps = z.infer<typeof AbstractBlobLoopSchema>;

export const AbstractBlobLoop: React.FC<AbstractBlobLoopProps> = ({
  colors,
  count,
  speed,
  blur,
}) => {
  return (
    <AbsoluteFill>
      <AbstractBlob colors={colors} count={count} speed={speed} blur={blur} />
    </AbsoluteFill>
  );
};
