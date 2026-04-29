"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import {
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
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

type TemplateEntry = {
  id: string;
  label: string;
  component: React.FC<Record<string, unknown>>;
  defaultProps: Record<string, unknown>;
  durationInFrames: number;
  category: string;
};

const TEMPLATES: TemplateEntry[] = [
  {
    id: "gradient-linear",
    label: "Gradient Loop (Linear)",
    component: GradientLoop as React.FC<Record<string, unknown>>,
    defaultProps: GradientLoopSchema.parse({}),
    durationInFrames: 10 * VIDEO_FPS,
    category: "Backgrounds",
  },
  {
    id: "gradient-radial",
    label: "Gradient Loop (Radial)",
    component: GradientLoop as React.FC<Record<string, unknown>>,
    defaultProps: GradientLoopSchema.parse({
      gradientType: "radial",
      colors: ["#ff6b6b", "#ee5a24", "#f9ca24", "#ff6b6b"],
    }),
    durationInFrames: 10 * VIDEO_FPS,
    category: "Backgrounds",
  },
  {
    id: "particle-rising",
    label: "Particle Rising",
    component: ParticleWave as React.FC<Record<string, unknown>>,
    defaultProps: ParticleWaveSchema.parse({}),
    durationInFrames: 10 * VIDEO_FPS,
    category: "Backgrounds",
  },
  {
    id: "particle-bokeh",
    label: "Bokeh Particles",
    component: ParticleWave as React.FC<Record<string, unknown>>,
    defaultProps: ParticleWaveSchema.parse({
      backgroundColor: "#0d0d0d",
      particleColor: "#fbbf24",
      particleStyle: "bokeh",
      particleCount: 40,
      maxSize: 15,
    }),
    durationInFrames: 10 * VIDEO_FPS,
    category: "Backgrounds",
  },
  {
    id: "text-char",
    label: "Text (Char by Char)",
    component: TextAnimation as React.FC<Record<string, unknown>>,
    defaultProps: TextAnimationSchema.parse({}),
    durationInFrames: 5 * VIDEO_FPS,
    category: "Text",
  },
  {
    id: "text-word",
    label: "Text (Word by Word)",
    component: TextAnimation as React.FC<Record<string, unknown>>,
    defaultProps: TextAnimationSchema.parse({
      animation: "wordByWord",
      title: "Motion Graphics Made Easy",
      subtitle: "With Remotion",
    }),
    durationInFrames: 5 * VIDEO_FPS,
    category: "Text",
  },
  {
    id: "geometric-wave",
    label: "Geometric Grid (Wave)",
    component: GeometricPattern as React.FC<Record<string, unknown>>,
    defaultProps: GeometricPatternSchema.parse({}),
    durationInFrames: 8 * VIDEO_FPS,
    category: "Patterns",
  },
  {
    id: "geometric-circles",
    label: "Geometric Circles (Spiral)",
    component: GeometricPattern as React.FC<Record<string, unknown>>,
    defaultProps: GeometricPatternSchema.parse({
      shape: "circle",
      animationStyle: "spiral",
      primaryColor: "#f43f5e",
      secondaryColor: "#fb7185",
      backgroundColor: "#1c1017",
    }),
    durationInFrames: 8 * VIDEO_FPS,
    category: "Patterns",
  },
  {
    id: "lowerthird-modern",
    label: "Lower Third (Modern)",
    component: LowerThirdTemplate as React.FC<Record<string, unknown>>,
    defaultProps: LowerThirdTemplateSchema.parse({}),
    durationInFrames: 4 * VIDEO_FPS,
    category: "Lower Thirds",
  },
  {
    id: "lowerthird-bold",
    label: "Lower Third (Bold)",
    component: LowerThirdTemplate as React.FC<Record<string, unknown>>,
    defaultProps: LowerThirdTemplateSchema.parse({
      style: "bold",
      name: "Alex Johnson",
      title: "CEO & Founder",
      barColor: "#ef4444",
    }),
    durationInFrames: 4 * VIDEO_FPS,
    category: "Lower Thirds",
  },
];

const CATEGORIES = Array.from(new Set(TEMPLATES.map((t) => t.category)));

const Home: NextPage = () => {
  const [selectedId, setSelectedId] = useState(TEMPLATES[0].id);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const selected = useMemo(
    () => TEMPLATES.find((t) => t.id === selectedId) ?? TEMPLATES[0],
    [selectedId],
  );

  const filtered = activeCategory
    ? TEMPLATES.filter((t) => t.category === activeCategory)
    : TEMPLATES;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 px-6 py-4">
        <h1 className="text-2xl font-bold tracking-tight">
          Remotion Stock Video Generator
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Pilih template, kustomisasi, render. Buat stock video dalam hitungan
          menit.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        <section className="flex-1">
          <div className="overflow-hidden rounded-xl border border-white/10 shadow-2xl">
            <Player
              component={selected.component}
              inputProps={selected.defaultProps}
              durationInFrames={selected.durationInFrames}
              fps={VIDEO_FPS}
              compositionHeight={VIDEO_HEIGHT}
              compositionWidth={VIDEO_WIDTH}
              style={{ width: "100%" }}
              controls
              autoPlay
              loop
            />
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">{selected.label}</h2>
              <span className="text-sm text-white/40">{selected.category}</span>
            </div>
            <div className="flex gap-2 text-xs text-white/50">
              <span className="bg-white/10 rounded px-2 py-1">
                {VIDEO_WIDTH}×{VIDEO_HEIGHT}
              </span>
              <span className="bg-white/10 rounded px-2 py-1">
                {VIDEO_FPS}fps
              </span>
              <span className="bg-white/10 rounded px-2 py-1">
                {(selected.durationInFrames / VIDEO_FPS).toFixed(0)}s
              </span>
            </div>
          </div>
        </section>

        <aside className="w-full lg:w-80 shrink-0">
          <div className="flex flex-wrap gap-2 mb-4">
            <button
              onClick={() => setActiveCategory(null)}
              className={`text-xs px-3 py-1.5 rounded-full transition ${
                activeCategory === null
                  ? "bg-indigo-600 text-white"
                  : "bg-white/10 text-white/60 hover:text-white"
              }`}
            >
              Semua
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full transition ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-white/10 text-white/60 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
            {filtered.map((template) => (
              <button
                key={template.id}
                onClick={() => setSelectedId(template.id)}
                className={`text-left p-3 rounded-lg border transition ${
                  selectedId === template.id
                    ? "border-indigo-500 bg-indigo-500/10"
                    : "border-white/10 bg-white/5 hover:border-white/20"
                }`}
              >
                <div className="text-sm font-medium">{template.label}</div>
                <div className="text-xs text-white/40 mt-0.5">
                  {template.category} •{" "}
                  {(template.durationInFrames / VIDEO_FPS).toFixed(0)}s
                </div>
              </button>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Home;
