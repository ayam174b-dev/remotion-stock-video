import React, { useMemo } from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type GeometricGridProps = {
  rows?: number;
  cols?: number;
  color?: string;
  secondaryColor?: string;
  gap?: number;
  shape?: "square" | "circle" | "hexagon";
  animationStyle?: "wave" | "random" | "spiral";
  speed?: number;
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export const GeometricGrid: React.FC<GeometricGridProps> = ({
  rows = 8,
  cols = 12,
  color = "#4f46e5",
  secondaryColor = "#818cf8",
  gap = 4,
  shape = "square",
  animationStyle = "wave",
  speed = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const cellWidth = (width - gap * (cols + 1)) / cols;
  const cellHeight = (height - gap * (rows + 1)) / rows;
  const cellSize = Math.min(cellWidth, cellHeight);

  const cells = useMemo(() => {
    const result: Array<{ row: number; col: number; seed: number }> = [];
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        result.push({ row: r, col: c, seed: r * cols + c });
      }
    }
    return result;
  }, [rows, cols]);

  const time = (frame / fps) * speed;

  return (
    <AbsoluteFill className="justify-center items-center">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
          gap,
        }}
      >
        {cells.map(({ row, col, seed }) => {
          let delay: number;
          if (animationStyle === "wave") {
            delay = (row + col) * 3;
          } else if (animationStyle === "spiral") {
            const cx = cols / 2;
            const cy = rows / 2;
            const dist = Math.sqrt((col - cx) ** 2 + (row - cy) ** 2);
            delay = dist * 4;
          } else {
            delay = seededRandom(seed) * 40;
          }

          const scale = interpolate(
            frame,
            [delay, delay + 15, delay + 30],
            [0, 1, 0.85],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.34, 1.56, 0.64, 1),
            },
          );

          const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          const cellColor =
            (row + col) % 2 === 0 ? color : secondaryColor;

          const pulseScale =
            frame > delay + 30
              ? 0.85 +
                0.1 * Math.sin(time * Math.PI * 2 + seed * 0.5)
              : scale;

          const shapeStyle: React.CSSProperties = {
            width: cellSize,
            height: cellSize,
            backgroundColor: cellColor,
            opacity,
            transform: `scale(${pulseScale})`,
            borderRadius:
              shape === "circle"
                ? "50%"
                : shape === "hexagon"
                  ? "15%"
                  : "4px",
          };

          return <div key={`${row}-${col}`} style={shapeStyle} />;
        })}
      </div>
    </AbsoluteFill>
  );
};
