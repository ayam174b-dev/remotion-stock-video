import React from "react";
import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import { z } from "zod";
import { CounterNumber } from "../components/CounterNumber";
import { GradientBackground } from "../components/GradientBackground";

export const DataCounterSchema = z.object({
  items: z
    .array(
      z.object({
        label: z.string(),
        value: z.number(),
        prefix: z.string().default(""),
        suffix: z.string().default(""),
      }),
    )
    .default([
      { label: "Users", value: 10500, prefix: "", suffix: "+" },
      { label: "Downloads", value: 50000, prefix: "", suffix: "+" },
      { label: "Rating", value: 4.9, prefix: "", suffix: "/5" },
    ]),
  color: z.string().default("#ffffff"),
  accentColor: z.string().default("#4f46e5"),
  backgroundColors: z
    .array(z.string())
    .default(["#0f172a", "#1e293b", "#334155"]),
});

export type DataCounterProps = z.infer<typeof DataCounterSchema>;

export const DataCounter: React.FC<DataCounterProps> = ({
  items,
  color,
  accentColor,
  backgroundColors,
}) => {
  const { durationInFrames } = useVideoConfig();
  const itemDuration = Math.floor(durationInFrames / items.length);

  return (
    <AbsoluteFill>
      <GradientBackground colors={backgroundColors} speed={0.2} />
      {items.map((item, i) => (
        <Sequence
          key={i}
          from={i * itemDuration}
          durationInFrames={itemDuration}
        >
          <AbsoluteFill className="justify-center items-center">
            <div style={{ textAlign: "center" }}>
              <CounterNumber
                from={0}
                to={item.value}
                fontSize={100}
                color={color}
                prefix={item.prefix}
                suffix={item.suffix}
                decimals={item.value % 1 !== 0 ? 1 : 0}
              />
              <div
                style={{
                  fontSize: 24,
                  color: accentColor,
                  fontFamily: "Inter, sans-serif",
                  marginTop: -20,
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                }}
              >
                {item.label}
              </div>
            </div>
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
