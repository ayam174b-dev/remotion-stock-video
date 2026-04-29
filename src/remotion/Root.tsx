import { Composition, Folder } from "remotion";
import {
  GradientLoop,
  GradientLoopSchema,
} from "./compositions/GradientLoop";
import {
  TextAnimation,
  TextAnimationSchema,
} from "./compositions/TextAnimation";
import {
  ParticleWave,
  ParticleWaveSchema,
} from "./compositions/ParticleWave";
import {
  GeometricPattern,
  GeometricPatternSchema,
} from "./compositions/GeometricPattern";
import {
  LowerThirdTemplate,
  LowerThirdTemplateSchema,
} from "./compositions/LowerThirdTemplate";
import {
  CountdownTemplate,
  CountdownTemplateSchema,
} from "./compositions/CountdownTemplate";
import {
  LogoRevealTemplate,
  LogoRevealTemplateSchema,
} from "./compositions/LogoRevealTemplate";
import {
  KineticTypography,
  KineticTypographySchema,
} from "./compositions/KineticTypography";
import {
  AbstractBlobLoop,
  AbstractBlobLoopSchema,
} from "./compositions/AbstractBlobLoop";
import {
  GlitchTextTemplate,
  GlitchTextTemplateSchema,
} from "./compositions/GlitchTextTemplate";
import {
  ProgressBarTemplate,
  ProgressBarTemplateSchema,
} from "./compositions/ProgressBarTemplate";
import {
  DataCounter,
  DataCounterSchema,
} from "./compositions/DataCounter";
import {
  WaveLoop,
  WaveLoopSchema,
} from "./compositions/WaveLoop";

const FPS = 30;
const LANDSCAPE = { width: 1920, height: 1080 };

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Backgrounds">
        <Composition
          id="GradientLoop"
          component={GradientLoop}
          durationInFrames={10 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={GradientLoopSchema.parse({})}
          schema={GradientLoopSchema}
        />
        <Composition
          id="GradientLoop-Radial"
          component={GradientLoop}
          durationInFrames={10 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={GradientLoopSchema.parse({
            gradientType: "radial",
            colors: ["#ff6b6b", "#ee5a24", "#f9ca24", "#ff6b6b"],
          })}
          schema={GradientLoopSchema}
        />
        <Composition
          id="GradientLoop-Conic"
          component={GradientLoop}
          durationInFrames={10 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={GradientLoopSchema.parse({
            gradientType: "conic",
            colors: ["#00b894", "#00cec9", "#0984e3", "#6c5ce7", "#00b894"],
          })}
          schema={GradientLoopSchema}
        />
        <Composition
          id="ParticleWave"
          component={ParticleWave}
          durationInFrames={10 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={ParticleWaveSchema.parse({})}
          schema={ParticleWaveSchema}
        />
        <Composition
          id="ParticleWave-Snow"
          component={ParticleWave}
          durationInFrames={10 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={ParticleWaveSchema.parse({
            backgroundColor: "#1a1a2e",
            particleColor: "#e0e0e0",
            particleStyle: "snow",
            particleCount: 100,
          })}
          schema={ParticleWaveSchema}
        />
        <Composition
          id="ParticleWave-Bokeh"
          component={ParticleWave}
          durationInFrames={10 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={ParticleWaveSchema.parse({
            backgroundColor: "#0d0d0d",
            particleColor: "#fbbf24",
            particleStyle: "bokeh",
            particleCount: 40,
            maxSize: 15,
          })}
          schema={ParticleWaveSchema}
        />
        <Composition
          id="AbstractBlob"
          component={AbstractBlobLoop}
          durationInFrames={10 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={AbstractBlobLoopSchema.parse({})}
          schema={AbstractBlobLoopSchema}
        />
        <Composition
          id="AbstractBlob-Warm"
          component={AbstractBlobLoop}
          durationInFrames={10 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={AbstractBlobLoopSchema.parse({
            colors: ["#ff6b6b", "#ee5a24", "#f9ca24", "#ff9ff3"],
            speed: 0.7,
            blur: 100,
          })}
          schema={AbstractBlobLoopSchema}
        />
        <Composition
          id="WaveLoop"
          component={WaveLoop}
          durationInFrames={10 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={WaveLoopSchema.parse({})}
          schema={WaveLoopSchema}
        />
        <Composition
          id="WaveLoop-Ocean"
          component={WaveLoop}
          durationInFrames={10 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={WaveLoopSchema.parse({
            colors: ["#0077b6", "#0096c7", "#00b4d8", "#48cae4"],
            backgroundColor: "#03045e",
            amplitude: 60,
          })}
          schema={WaveLoopSchema}
        />
      </Folder>

      <Folder name="Text">
        <Composition
          id="TextAnimation-CharByChar"
          component={TextAnimation}
          durationInFrames={5 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={TextAnimationSchema.parse({})}
          schema={TextAnimationSchema}
        />
        <Composition
          id="TextAnimation-WordByWord"
          component={TextAnimation}
          durationInFrames={5 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={TextAnimationSchema.parse({
            animation: "wordByWord",
            title: "Motion Graphics Made Easy",
            subtitle: "With Remotion",
          })}
          schema={TextAnimationSchema}
        />
        <Composition
          id="TextAnimation-SlideUp"
          component={TextAnimation}
          durationInFrames={5 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={TextAnimationSchema.parse({
            animation: "slideUp",
            title: "Professional Stock Videos",
            subtitle: "Ready in Minutes",
            backgroundColors: ["#1a0533", "#2d1b69", "#553c9a"],
          })}
          schema={TextAnimationSchema}
        />
        <Composition
          id="GlitchText"
          component={GlitchTextTemplate}
          durationInFrames={5 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={GlitchTextTemplateSchema.parse({})}
          schema={GlitchTextTemplateSchema}
        />
        <Composition
          id="GlitchText-Cyber"
          component={GlitchTextTemplate}
          durationInFrames={5 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={GlitchTextTemplateSchema.parse({
            text: "CYBER",
            glitchColor1: "#00ffff",
            glitchColor2: "#ff00ff",
            intensity: 1.5,
            backgroundColors: ["#0a0a1a", "#111133", "#1a1a44"],
          })}
          schema={GlitchTextTemplateSchema}
        />
      </Folder>

      <Folder name="Typography">
        <Composition
          id="KineticTypography-Spotlight"
          component={KineticTypography}
          durationInFrames={6 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={KineticTypographySchema.parse({})}
          schema={KineticTypographySchema}
        />
        <Composition
          id="KineticTypography-Stack"
          component={KineticTypography}
          durationInFrames={6 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={KineticTypographySchema.parse({
            style: "stack",
            words: ["Think", "Design", "Build", "Ship"],
            highlightColor: "#f43f5e",
          })}
          schema={KineticTypographySchema}
        />
        <Composition
          id="KineticTypography-Typewriter"
          component={KineticTypography}
          durationInFrames={6 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={KineticTypographySchema.parse({
            style: "typewriter",
            words: ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"],
            fontSize: 60,
          })}
          schema={KineticTypographySchema}
        />
      </Folder>

      <Folder name="Patterns">
        <Composition
          id="GeometricPattern-Wave"
          component={GeometricPattern}
          durationInFrames={8 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={GeometricPatternSchema.parse({})}
          schema={GeometricPatternSchema}
        />
        <Composition
          id="GeometricPattern-Circles"
          component={GeometricPattern}
          durationInFrames={8 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={GeometricPatternSchema.parse({
            shape: "circle",
            animationStyle: "spiral",
            primaryColor: "#f43f5e",
            secondaryColor: "#fb7185",
            backgroundColor: "#1c1017",
          })}
          schema={GeometricPatternSchema}
        />
        <Composition
          id="GeometricPattern-Random"
          component={GeometricPattern}
          durationInFrames={8 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={GeometricPatternSchema.parse({
            shape: "hexagon",
            animationStyle: "random",
            primaryColor: "#10b981",
            secondaryColor: "#34d399",
            backgroundColor: "#0a1f17",
          })}
          schema={GeometricPatternSchema}
        />
      </Folder>

      <Folder name="Lower-Thirds">
        <Composition
          id="LowerThird-Modern"
          component={LowerThirdTemplate}
          durationInFrames={4 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={LowerThirdTemplateSchema.parse({})}
          schema={LowerThirdTemplateSchema}
        />
        <Composition
          id="LowerThird-Minimal"
          component={LowerThirdTemplate}
          durationInFrames={4 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={LowerThirdTemplateSchema.parse({
            style: "minimal",
            name: "Jane Smith",
            title: "Product Designer",
            barColor: "#f59e0b",
          })}
          schema={LowerThirdTemplateSchema}
        />
        <Composition
          id="LowerThird-Bold"
          component={LowerThirdTemplate}
          durationInFrames={4 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={LowerThirdTemplateSchema.parse({
            style: "bold",
            name: "Alex Johnson",
            title: "CEO & Founder",
            barColor: "#ef4444",
          })}
          schema={LowerThirdTemplateSchema}
        />
      </Folder>

      <Folder name="Countdown">
        <Composition
          id="Countdown-Circular"
          component={CountdownTemplate}
          durationInFrames={10 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={CountdownTemplateSchema.parse({})}
          schema={CountdownTemplateSchema}
        />
        <Composition
          id="Countdown-Digital"
          component={CountdownTemplate}
          durationInFrames={10 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={CountdownTemplateSchema.parse({
            style: "digital",
            accentColor: "#00ff88",
            backgroundColors: ["#0a0a0a", "#111111", "#1a1a1a"],
          })}
          schema={CountdownTemplateSchema}
        />
        <Composition
          id="Countdown-Minimal"
          component={CountdownTemplate}
          durationInFrames={5 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={CountdownTemplateSchema.parse({
            style: "minimal",
            from: 5,
            showParticles: false,
          })}
          schema={CountdownTemplateSchema}
        />
      </Folder>

      <Folder name="Logo-Reveal">
        <Composition
          id="LogoReveal-Minimal"
          component={LogoRevealTemplate}
          durationInFrames={4 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={LogoRevealTemplateSchema.parse({})}
          schema={LogoRevealTemplateSchema}
        />
        <Composition
          id="LogoReveal-Glitch"
          component={LogoRevealTemplate}
          durationInFrames={4 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={LogoRevealTemplateSchema.parse({
            style: "glitch",
            text: "STUDIO",
            subtitle: "Digital Agency",
          })}
          schema={LogoRevealTemplateSchema}
        />
        <Composition
          id="LogoReveal-Scale"
          component={LogoRevealTemplate}
          durationInFrames={4 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={LogoRevealTemplateSchema.parse({
            style: "scale",
            text: "DESIGN",
            subtitle: "Made with passion",
            accentColor: "#f59e0b",
          })}
          schema={LogoRevealTemplateSchema}
        />
      </Folder>

      <Folder name="Overlays">
        <Composition
          id="ProgressBar"
          component={ProgressBarTemplate}
          durationInFrames={5 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={ProgressBarTemplateSchema.parse({})}
          schema={ProgressBarTemplateSchema}
        />
        <Composition
          id="ProgressBar-Circle"
          component={ProgressBarTemplate}
          durationInFrames={5 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={ProgressBarTemplateSchema.parse({
            style: "circle",
            label: "Progress",
            barColor: "#10b981",
          })}
          schema={ProgressBarTemplateSchema}
        />
        <Composition
          id="ProgressBar-Minimal"
          component={ProgressBarTemplate}
          durationInFrames={5 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={ProgressBarTemplateSchema.parse({
            style: "minimal",
            label: "",
            barColor: "#f43f5e",
          })}
          schema={ProgressBarTemplateSchema}
        />
        <Composition
          id="DataCounter"
          component={DataCounter}
          durationInFrames={9 * FPS}
          fps={FPS}
          {...LANDSCAPE}
          defaultProps={DataCounterSchema.parse({})}
          schema={DataCounterSchema}
        />
      </Folder>
    </>
  );
};
