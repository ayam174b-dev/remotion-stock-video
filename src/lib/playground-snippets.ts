export type PlaygroundSnippet = {
  id: string;
  label: string;
  description: string;
  code: string;
  durationInFrames: number;
};

export const PLAYGROUND_SNIPPETS: PlaygroundSnippet[] = [
  {
    id: "hello-world",
    label: "Hello World",
    description: "Teks sederhana dengan animasi fade-in",
    durationInFrames: 90,
    code: `// Hello World — animasi teks sederhana
const { AbsoluteFill, useCurrentFrame, interpolate } = Remotion;

function MyVideo() {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 30], [0.8, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          fontSize: 80,
          color: "white",
          fontFamily: "sans-serif",
          opacity,
          transform: \`scale(\${scale})\`,
        }}
      >
        Hello World!
      </h1>
    </AbsoluteFill>
  );
}
`,
  },
  {
    id: "gradient-animation",
    label: "Animated Gradient",
    description: "Background gradient yang bergerak",
    durationInFrames: 300,
    code: `// Animated Gradient Background
const { AbsoluteFill, useCurrentFrame, useVideoConfig } = Remotion;

function MyVideo() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;

  const angle = time * 30;
  const hue1 = (time * 20) % 360;
  const hue2 = (hue1 + 60) % 360;
  const hue3 = (hue1 + 120) % 360;

  return (
    <AbsoluteFill
      style={{
        background: \`linear-gradient(\${angle}deg, 
          hsl(\${hue1}, 80%, 60%), 
          hsl(\${hue2}, 80%, 50%), 
          hsl(\${hue3}, 80%, 60%))\`,
      }}
    />
  );
}
`,
  },
  {
    id: "bouncing-ball",
    label: "Bouncing Ball",
    description: "Bola memantul dengan efek gravity",
    durationInFrames: 180,
    code: `// Bouncing Ball dengan gravity
const { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } = Remotion;

function MyVideo() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  const bounce = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 80 },
  });

  const y = interpolate(bounce, [0, 1], [0, height / 2 - 60]);
  const x = interpolate(frame, [0, fps * 6], [100, width - 160], {
    extrapolateRight: "clamp",
  });
  const squash = interpolate(bounce, [0.9, 1], [1, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a0a" }}>
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #ff6b6b, #feca57)",
          position: "absolute",
          left: x,
          top: y,
          transform: \`scaleX(\${1 + (1 - squash) * 0.3}) scaleY(\${squash})\`,
          boxShadow: "0 0 30px rgba(255, 107, 107, 0.5)",
        }}
      />
    </AbsoluteFill>
  );
}
`,
  },
  {
    id: "text-reveal",
    label: "Text Reveal",
    description: "Teks muncul huruf per huruf",
    durationInFrames: 150,
    code: `// Text Reveal — huruf per huruf
const { AbsoluteFill, useCurrentFrame, interpolate, spring } = Remotion;

function MyVideo() {
  const frame = useCurrentFrame();
  const text = "STOCK VIDEO";

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0c0c0c, #1a1a2e)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: 4 }}>
        {text.split("").map((char, i) => {
          const delay = i * 4;
          const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const y = interpolate(frame - delay, [0, 10], [40, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <span
              key={i}
              style={{
                fontSize: 90,
                fontWeight: "bold",
                color: "white",
                fontFamily: "sans-serif",
                opacity,
                transform: \`translateY(\${y}px)\`,
                display: "inline-block",
                minWidth: char === " " ? 30 : undefined,
              }}
            >
              {char}
            </span>
          );
        })}
      </div>
    </AbsoluteFill>
  );
}
`,
  },
  {
    id: "particle-system",
    label: "Particle System",
    description: "Sistem partikel dengan gerakan acak",
    durationInFrames: 300,
    code: `// Particle System
const { AbsoluteFill, useCurrentFrame, useVideoConfig } = Remotion;

function seededRandom(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

function MyVideo() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const time = frame / fps;
  const particles = 50;

  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      {Array.from({ length: particles }).map((_, i) => {
        const baseX = seededRandom(i * 1) * width;
        const baseY = seededRandom(i * 2) * height;
        const size = 3 + seededRandom(i * 3) * 6;
        const speed = 0.5 + seededRandom(i * 4) * 1.5;
        const hue = seededRandom(i * 5) * 60 + 200;

        const x = baseX + Math.sin(time * speed + i) * 50;
        const y = baseY + Math.cos(time * speed * 0.7 + i) * 40;
        const opacity = 0.3 + 0.5 * Math.sin(time * 2 + i);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: \`hsla(\${hue}, 80%, 70%, \${opacity})\`,
              boxShadow: \`0 0 \${size * 2}px hsla(\${hue}, 80%, 70%, 0.3)\`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
}
`,
  },
  {
    id: "counter-animation",
    label: "Counter Animation",
    description: "Angka counter naik dengan efek spring",
    durationInFrames: 150,
    code: `// Counter Animation
const { AbsoluteFill, useCurrentFrame, interpolate } = Remotion;

function MyVideo() {
  const frame = useCurrentFrame();
  const targetValue = 12450;

  const progress = interpolate(frame, [0, 90], [0, 1], {
    extrapolateRight: "clamp",
  });
  // Ease out cubic
  const eased = 1 - Math.pow(1 - progress, 3);
  const value = Math.round(eased * targetValue);

  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          fontSize: 120,
          fontWeight: "bold",
          color: "white",
          fontFamily: "monospace",
          opacity,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {value.toLocaleString()}
      </div>
      <div
        style={{
          fontSize: 24,
          color: "rgba(255,255,255,0.6)",
          fontFamily: "sans-serif",
          opacity,
        }}
      >
        Total Views
      </div>
    </AbsoluteFill>
  );
}
`,
  },
  {
    id: "wave-bars",
    label: "Audio Wave Bars",
    description: "Simulasi visualisasi audio wave",
    durationInFrames: 300,
    code: `// Audio Wave Bars
const { AbsoluteFill, useCurrentFrame, useVideoConfig } = Remotion;

function MyVideo() {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const time = frame / fps;
  const barCount = 40;
  const barWidth = width / barCount - 4;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0a0a0a",
        justifyContent: "flex-end",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 4,
          alignItems: "flex-end",
          height: height * 0.7,
          padding: "0 20px",
        }}
      >
        {Array.from({ length: barCount }).map((_, i) => {
          const freq = 0.5 + (i / barCount) * 2;
          const phase = i * 0.3;
          const h =
            0.2 +
            0.3 * Math.sin(time * freq * 3 + phase) +
            0.2 * Math.sin(time * freq * 5 + phase * 2) +
            0.15 * Math.cos(time * 2 + i * 0.5);
          const barHeight = Math.max(10, h * height * 0.6);
          const hue = (i / barCount) * 120 + 200;

          return (
            <div
              key={i}
              style={{
                width: barWidth,
                height: barHeight,
                borderRadius: 4,
                background: \`linear-gradient(to top, hsl(\${hue}, 80%, 50%), hsl(\${hue + 30}, 80%, 70%))\`,
                boxShadow: \`0 0 10px hsla(\${hue}, 80%, 60%, 0.3)\`,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
}
`,
  },
  {
    id: "lower-third-custom",
    label: "Custom Lower Third",
    description: "Lower third kustom untuk nama dan title",
    durationInFrames: 120,
    code: `// Custom Lower Third
const { AbsoluteFill, useCurrentFrame, interpolate, spring } = Remotion;

function MyVideo() {
  const frame = useCurrentFrame();
  const { fps } = Remotion.useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 15 } });
  const exit = spring({
    frame: frame - 80,
    fps,
    config: { damping: 15 },
  });

  const lineWidth = interpolate(enter, [0, 1], [0, 300]);
  const textOpacity = interpolate(enter, [0.3, 1], [0, 1], {
    extrapolateLeft: "clamp",
  });
  const slideOut = interpolate(exit, [0, 1], [0, 100]);

  return (
    <AbsoluteFill style={{ backgroundColor: "transparent" }}>
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 80,
          transform: \`translateX(-\${slideOut}%)\`,
        }}
      >
        <div
          style={{
            width: lineWidth,
            height: 3,
            backgroundColor: "#00b4d8",
            marginBottom: 12,
          }}
        />
        <div
          style={{
            opacity: textOpacity,
            fontFamily: "sans-serif",
          }}
        >
          <div
            style={{
              fontSize: 36,
              fontWeight: "bold",
              color: "white",
            }}
          >
            John Doe
          </div>
          <div
            style={{
              fontSize: 20,
              color: "rgba(255,255,255,0.7)",
              marginTop: 4,
            }}
          >
            Creative Director
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
}
`,
  },
];
