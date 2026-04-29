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
    </>
  );
};
