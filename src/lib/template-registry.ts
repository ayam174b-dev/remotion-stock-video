import { z } from "zod";
import {
  GradientLoop,
  GradientLoopSchema,
} from "../remotion/compositions/GradientLoop";
import {
  TextAnimation,
  TextAnimationSchema,
} from "../remotion/compositions/TextAnimation";
import {
  ParticleWave,
  ParticleWaveSchema,
} from "../remotion/compositions/ParticleWave";
import {
  GeometricPattern,
  GeometricPatternSchema,
} from "../remotion/compositions/GeometricPattern";
import {
  LowerThirdTemplate,
  LowerThirdTemplateSchema,
} from "../remotion/compositions/LowerThirdTemplate";
import {
  CountdownTemplate,
  CountdownTemplateSchema,
} from "../remotion/compositions/CountdownTemplate";
import {
  LogoRevealTemplate,
  LogoRevealTemplateSchema,
} from "../remotion/compositions/LogoRevealTemplate";
import {
  KineticTypography,
  KineticTypographySchema,
} from "../remotion/compositions/KineticTypography";
import {
  AbstractBlobLoop,
  AbstractBlobLoopSchema,
} from "../remotion/compositions/AbstractBlobLoop";
import {
  GlitchTextTemplate,
  GlitchTextTemplateSchema,
} from "../remotion/compositions/GlitchTextTemplate";
import {
  ProgressBarTemplate,
  ProgressBarTemplateSchema,
} from "../remotion/compositions/ProgressBarTemplate";
import {
  DataCounter,
  DataCounterSchema,
} from "../remotion/compositions/DataCounter";
import {
  WaveLoop,
  WaveLoopSchema,
} from "../remotion/compositions/WaveLoop";

export type TemplateDefinition = {
  id: string;
  label: string;
  category: string;
  component: React.FC<Record<string, unknown>>;
  schema: z.ZodObject<z.ZodRawShape>;
  defaultProps: Record<string, unknown>;
  durationInFrames: number;
  description: string;
};

const FPS = 30;

export const TEMPLATE_REGISTRY: TemplateDefinition[] = [
  // Backgrounds
  {
    id: "gradient-linear",
    label: "Gradient Loop (Linear)",
    category: "Backgrounds",
    component: GradientLoop as React.FC<Record<string, unknown>>,
    schema: GradientLoopSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: GradientLoopSchema.parse({}),
    durationInFrames: 10 * FPS,
    description: "Animated linear gradient background with optional particles",
  },
  {
    id: "gradient-radial",
    label: "Gradient Loop (Radial)",
    category: "Backgrounds",
    component: GradientLoop as React.FC<Record<string, unknown>>,
    schema: GradientLoopSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: GradientLoopSchema.parse({
      gradientType: "radial",
      colors: ["#ff6b6b", "#ee5a24", "#f9ca24", "#ff6b6b"],
    }),
    durationInFrames: 10 * FPS,
    description: "Pulsing radial gradient with dynamic center movement",
  },
  {
    id: "gradient-conic",
    label: "Gradient Loop (Conic)",
    category: "Backgrounds",
    component: GradientLoop as React.FC<Record<string, unknown>>,
    schema: GradientLoopSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: GradientLoopSchema.parse({
      gradientType: "conic",
      colors: ["#00b894", "#00cec9", "#0984e3", "#6c5ce7", "#00b894"],
    }),
    durationInFrames: 10 * FPS,
    description: "Rotating conic gradient with smooth color transitions",
  },
  {
    id: "particle-rising",
    label: "Particle Rising",
    category: "Backgrounds",
    component: ParticleWave as React.FC<Record<string, unknown>>,
    schema: ParticleWaveSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: ParticleWaveSchema.parse({}),
    durationInFrames: 10 * FPS,
    description: "Rising particle effect with customizable colors and density",
  },
  {
    id: "particle-bokeh",
    label: "Bokeh Particles",
    category: "Backgrounds",
    component: ParticleWave as React.FC<Record<string, unknown>>,
    schema: ParticleWaveSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: ParticleWaveSchema.parse({
      backgroundColor: "#0d0d0d",
      particleColor: "#fbbf24",
      particleStyle: "bokeh",
      particleCount: 40,
      maxSize: 15,
    }),
    durationInFrames: 10 * FPS,
    description: "Soft bokeh particle effect ideal for cinematic backgrounds",
  },
  {
    id: "particle-snow",
    label: "Snow Particles",
    category: "Backgrounds",
    component: ParticleWave as React.FC<Record<string, unknown>>,
    schema: ParticleWaveSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: ParticleWaveSchema.parse({
      backgroundColor: "#1a1a2e",
      particleColor: "#e0e0e0",
      particleStyle: "snow",
      particleCount: 100,
    }),
    durationInFrames: 10 * FPS,
    description: "Gentle falling snow particle animation",
  },
  {
    id: "abstract-blob",
    label: "Abstract Blob",
    category: "Backgrounds",
    component: AbstractBlobLoop as React.FC<Record<string, unknown>>,
    schema: AbstractBlobLoopSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: AbstractBlobLoopSchema.parse({}),
    durationInFrames: 10 * FPS,
    description: "Organic blob shapes with smooth morphing animation",
  },
  {
    id: "abstract-blob-warm",
    label: "Abstract Blob (Warm)",
    category: "Backgrounds",
    component: AbstractBlobLoop as React.FC<Record<string, unknown>>,
    schema: AbstractBlobLoopSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: AbstractBlobLoopSchema.parse({
      colors: ["#ff6b6b", "#ee5a24", "#f9ca24", "#ff9ff3"],
      speed: 0.7,
      blur: 100,
    }),
    durationInFrames: 10 * FPS,
    description: "Warm-toned organic blob animation",
  },
  {
    id: "wave-loop",
    label: "Wave Loop",
    category: "Backgrounds",
    component: WaveLoop as React.FC<Record<string, unknown>>,
    schema: WaveLoopSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: WaveLoopSchema.parse({}),
    durationInFrames: 10 * FPS,
    description: "Multi-layer sine wave animation",
  },
  {
    id: "wave-ocean",
    label: "Wave Loop (Ocean)",
    category: "Backgrounds",
    component: WaveLoop as React.FC<Record<string, unknown>>,
    schema: WaveLoopSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: WaveLoopSchema.parse({
      colors: ["#0077b6", "#0096c7", "#00b4d8", "#48cae4"],
      backgroundColor: "#03045e",
      amplitude: 60,
    }),
    durationInFrames: 10 * FPS,
    description: "Ocean-themed wave animation with blue palette",
  },
  // Text
  {
    id: "text-charbychar",
    label: "Text (Char by Char)",
    category: "Text",
    component: TextAnimation as React.FC<Record<string, unknown>>,
    schema: TextAnimationSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: TextAnimationSchema.parse({}),
    durationInFrames: 5 * FPS,
    description: "Character-by-character text reveal animation",
  },
  {
    id: "text-wordbyword",
    label: "Text (Word by Word)",
    category: "Text",
    component: TextAnimation as React.FC<Record<string, unknown>>,
    schema: TextAnimationSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: TextAnimationSchema.parse({
      animation: "wordByWord",
      title: "Motion Graphics Made Easy",
      subtitle: "With Remotion",
    }),
    durationInFrames: 5 * FPS,
    description: "Word-by-word text reveal animation",
  },
  {
    id: "text-slideup",
    label: "Text (Slide Up)",
    category: "Text",
    component: TextAnimation as React.FC<Record<string, unknown>>,
    schema: TextAnimationSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: TextAnimationSchema.parse({
      animation: "slideUp",
      title: "Professional Stock Videos",
      subtitle: "Ready in Minutes",
      backgroundColors: ["#1a0533", "#2d1b69", "#553c9a"],
    }),
    durationInFrames: 5 * FPS,
    description: "Smooth slide-up text animation",
  },
  {
    id: "glitch-text",
    label: "Glitch Text",
    category: "Text",
    component: GlitchTextTemplate as React.FC<Record<string, unknown>>,
    schema: GlitchTextTemplateSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: GlitchTextTemplateSchema.parse({}),
    durationInFrames: 5 * FPS,
    description: "Digital glitch distortion text effect",
  },
  {
    id: "glitch-cyber",
    label: "Glitch Text (Cyber)",
    category: "Text",
    component: GlitchTextTemplate as React.FC<Record<string, unknown>>,
    schema: GlitchTextTemplateSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: GlitchTextTemplateSchema.parse({
      text: "CYBER",
      glitchColor1: "#00ffff",
      glitchColor2: "#ff00ff",
      intensity: 1.5,
      backgroundColors: ["#0a0a1a", "#111133", "#1a1a44"],
    }),
    durationInFrames: 5 * FPS,
    description: "Cyberpunk-style glitch text with neon colors",
  },
  // Typography
  {
    id: "kinetic-spotlight",
    label: "Kinetic (Spotlight)",
    category: "Typography",
    component: KineticTypography as React.FC<Record<string, unknown>>,
    schema: KineticTypographySchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: KineticTypographySchema.parse({}),
    durationInFrames: 6 * FPS,
    description: "Words highlighted one at a time with spotlight effect",
  },
  {
    id: "kinetic-stack",
    label: "Kinetic (Stack)",
    category: "Typography",
    component: KineticTypography as React.FC<Record<string, unknown>>,
    schema: KineticTypographySchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: KineticTypographySchema.parse({
      style: "stack",
      words: ["Think", "Design", "Build", "Ship"],
      highlightColor: "#f43f5e",
    }),
    durationInFrames: 6 * FPS,
    description: "Words stacking vertically with slide-in animation",
  },
  {
    id: "kinetic-typewriter",
    label: "Kinetic (Typewriter)",
    category: "Typography",
    component: KineticTypography as React.FC<Record<string, unknown>>,
    schema: KineticTypographySchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: KineticTypographySchema.parse({
      style: "typewriter",
      words: ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"],
      fontSize: 60,
    }),
    durationInFrames: 6 * FPS,
    description: "Typewriter-style text with blinking cursor",
  },
  // Patterns
  {
    id: "geometric-wave",
    label: "Geometric Grid (Wave)",
    category: "Patterns",
    component: GeometricPattern as React.FC<Record<string, unknown>>,
    schema: GeometricPatternSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: GeometricPatternSchema.parse({}),
    durationInFrames: 8 * FPS,
    description: "Grid of shapes with wave-based color animation",
  },
  {
    id: "geometric-circles",
    label: "Geometric Circles",
    category: "Patterns",
    component: GeometricPattern as React.FC<Record<string, unknown>>,
    schema: GeometricPatternSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: GeometricPatternSchema.parse({
      shape: "circle",
      animationStyle: "spiral",
      primaryColor: "#f43f5e",
      secondaryColor: "#fb7185",
      backgroundColor: "#1c1017",
    }),
    durationInFrames: 8 * FPS,
    description: "Circular pattern with spiral animation",
  },
  {
    id: "geometric-random",
    label: "Geometric Random",
    category: "Patterns",
    component: GeometricPattern as React.FC<Record<string, unknown>>,
    schema: GeometricPatternSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: GeometricPatternSchema.parse({
      shape: "hexagon",
      animationStyle: "random",
      primaryColor: "#10b981",
      secondaryColor: "#34d399",
      backgroundColor: "#0a1f17",
    }),
    durationInFrames: 8 * FPS,
    description: "Hexagonal grid with random staggered reveal",
  },
  // Lower Thirds
  {
    id: "lowerthird-modern",
    label: "Lower Third (Modern)",
    category: "Lower Thirds",
    component: LowerThirdTemplate as React.FC<Record<string, unknown>>,
    schema: LowerThirdTemplateSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: LowerThirdTemplateSchema.parse({}),
    durationInFrames: 4 * FPS,
    description: "Modern lower third with accent bar and slide-in",
  },
  {
    id: "lowerthird-minimal",
    label: "Lower Third (Minimal)",
    category: "Lower Thirds",
    component: LowerThirdTemplate as React.FC<Record<string, unknown>>,
    schema: LowerThirdTemplateSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: LowerThirdTemplateSchema.parse({
      style: "minimal",
      name: "Jane Smith",
      title: "Product Designer",
      barColor: "#f59e0b",
    }),
    durationInFrames: 4 * FPS,
    description: "Clean minimal lower third with subtle animation",
  },
  {
    id: "lowerthird-bold",
    label: "Lower Third (Bold)",
    category: "Lower Thirds",
    component: LowerThirdTemplate as React.FC<Record<string, unknown>>,
    schema: LowerThirdTemplateSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: LowerThirdTemplateSchema.parse({
      style: "bold",
      name: "Alex Johnson",
      title: "CEO & Founder",
      barColor: "#ef4444",
    }),
    durationInFrames: 4 * FPS,
    description: "Bold lower third with full background reveal",
  },
  // Countdown
  {
    id: "countdown-circular",
    label: "Countdown (Circular)",
    category: "Countdown",
    component: CountdownTemplate as React.FC<Record<string, unknown>>,
    schema: CountdownTemplateSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: CountdownTemplateSchema.parse({}),
    durationInFrames: 10 * FPS,
    description: "Circular countdown timer with progress ring",
  },
  {
    id: "countdown-digital",
    label: "Countdown (Digital)",
    category: "Countdown",
    component: CountdownTemplate as React.FC<Record<string, unknown>>,
    schema: CountdownTemplateSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: CountdownTemplateSchema.parse({
      style: "digital",
      accentColor: "#00ff88",
      backgroundColors: ["#0a0a0a", "#111111", "#1a1a1a"],
    }),
    durationInFrames: 10 * FPS,
    description: "Digital-style countdown with neon glow",
  },
  {
    id: "countdown-minimal",
    label: "Countdown (Minimal)",
    category: "Countdown",
    component: CountdownTemplate as React.FC<Record<string, unknown>>,
    schema: CountdownTemplateSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: CountdownTemplateSchema.parse({
      style: "minimal",
      from: 5,
      showParticles: false,
    }),
    durationInFrames: 5 * FPS,
    description: "Clean minimal countdown with large numbers",
  },
  // Logo Reveal
  {
    id: "logoreveal-minimal",
    label: "Logo Reveal (Minimal)",
    category: "Logo Reveal",
    component: LogoRevealTemplate as React.FC<Record<string, unknown>>,
    schema: LogoRevealTemplateSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: LogoRevealTemplateSchema.parse({}),
    durationInFrames: 4 * FPS,
    description: "Clean logo reveal with accent line animation",
  },
  {
    id: "logoreveal-glitch",
    label: "Logo Reveal (Glitch)",
    category: "Logo Reveal",
    component: LogoRevealTemplate as React.FC<Record<string, unknown>>,
    schema: LogoRevealTemplateSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: LogoRevealTemplateSchema.parse({
      style: "glitch",
      text: "STUDIO",
      subtitle: "Digital Agency",
    }),
    durationInFrames: 4 * FPS,
    description: "Glitchy digital logo reveal with RGB split",
  },
  {
    id: "logoreveal-scale",
    label: "Logo Reveal (Scale)",
    category: "Logo Reveal",
    component: LogoRevealTemplate as React.FC<Record<string, unknown>>,
    schema: LogoRevealTemplateSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: LogoRevealTemplateSchema.parse({
      style: "scale",
      text: "DESIGN",
      subtitle: "Made with passion",
      accentColor: "#f59e0b",
    }),
    durationInFrames: 4 * FPS,
    description: "Spring-animated scale reveal for logos",
  },
  // Overlays
  {
    id: "progressbar",
    label: "Progress Bar",
    category: "Overlays",
    component: ProgressBarTemplate as React.FC<Record<string, unknown>>,
    schema: ProgressBarTemplateSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: ProgressBarTemplateSchema.parse({}),
    durationInFrames: 5 * FPS,
    description: "Animated horizontal progress bar overlay",
  },
  {
    id: "progressbar-circle",
    label: "Progress Circle",
    category: "Overlays",
    component: ProgressBarTemplate as React.FC<Record<string, unknown>>,
    schema: ProgressBarTemplateSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: ProgressBarTemplateSchema.parse({
      style: "circle",
      label: "Progress",
      barColor: "#10b981",
    }),
    durationInFrames: 5 * FPS,
    description: "Circular progress indicator with percentage",
  },
  {
    id: "progressbar-minimal",
    label: "Progress (Minimal)",
    category: "Overlays",
    component: ProgressBarTemplate as React.FC<Record<string, unknown>>,
    schema: ProgressBarTemplateSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: ProgressBarTemplateSchema.parse({
      style: "minimal",
      label: "",
      barColor: "#f43f5e",
    }),
    durationInFrames: 5 * FPS,
    description: "Minimal percentage counter with thin progress line",
  },
  {
    id: "data-counter",
    label: "Data Counter",
    category: "Overlays",
    component: DataCounter as React.FC<Record<string, unknown>>,
    schema: DataCounterSchema as unknown as z.ZodObject<z.ZodRawShape>,
    defaultProps: DataCounterSchema.parse({}),
    durationInFrames: 9 * FPS,
    description: "Animated statistics counter with multiple data points",
  },
];

export const CATEGORIES = Array.from(
  new Set(TEMPLATE_REGISTRY.map((t) => t.category)),
);

export function getTemplate(id: string): TemplateDefinition | undefined {
  return TEMPLATE_REGISTRY.find((t) => t.id === id);
}
