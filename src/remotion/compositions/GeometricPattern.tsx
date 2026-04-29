import React from "react";
import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { GeometricGrid } from "../components/GeometricGrid";

export const GeometricPatternSchema = z.object({
  backgroundColor: z.string().default("#0f172a"),
  primaryColor: z.string().default("#4f46e5"),
  secondaryColor: z.string().default("#818cf8"),
  rows: z.number().default(8),
  cols: z.number().default(14),
  shape: z.enum(["square", "circle", "hexagon"]).default("square"),
  animationStyle: z.enum(["wave", "random", "spiral"]).default("wave"),
  speed: z.number().default(1),
  gap: z.number().default(4),
});

export type GeometricPatternProps = z.infer<typeof GeometricPatternSchema>;

export const GeometricPattern: React.FC<GeometricPatternProps> = ({
  backgroundColor,
  primaryColor,
  secondaryColor,
  rows,
  cols,
  shape,
  animationStyle,
  speed,
  gap,
}) => {
  return (
    <AbsoluteFill style={{ backgroundColor }}>
      <GeometricGrid
        rows={rows}
        cols={cols}
        color={primaryColor}
        secondaryColor={secondaryColor}
        shape={shape}
        animationStyle={animationStyle}
        speed={speed}
        gap={gap}
      />
    </AbsoluteFill>
  );
};
