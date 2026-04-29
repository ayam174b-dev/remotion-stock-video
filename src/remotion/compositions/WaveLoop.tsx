import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { WaveBackground } from "../components/WaveBackground";

export const WaveLoopSchema = z.object({
  layers: z.number().default(4),
  colors: z
    .array(z.string())
    .default(["#4f46e5", "#7c3aed", "#a855f7", "#c084fc"]),
  speed: z.number().default(1),
  amplitude: z.number().default(50),
  backgroundColor: z.string().default("#0f0a1e"),
});

export type WaveLoopProps = z.infer<typeof WaveLoopSchema>;

export const WaveLoop: React.FC<WaveLoopProps> = ({
  layers,
  colors,
  speed,
  amplitude,
  backgroundColor,
}) => {
  return (
    <AbsoluteFill>
      <WaveBackground
        layers={layers}
        colors={colors}
        speed={speed}
        amplitude={amplitude}
        backgroundColor={backgroundColor}
      />
    </AbsoluteFill>
  );
};
