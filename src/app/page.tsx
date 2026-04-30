"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import Link from "next/link";
import { useMemo, useState } from "react";
import {
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../../types/constants";
import {
  TEMPLATE_REGISTRY,
  CATEGORIES,
} from "../lib/template-registry";

const Home: NextPage = () => {
  const [selectedId, setSelectedId] = useState(TEMPLATE_REGISTRY[0].id);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const selected = useMemo(
    () => TEMPLATE_REGISTRY.find((t) => t.id === selectedId) ?? TEMPLATE_REGISTRY[0],
    [selectedId],
  );

  const filtered = activeCategory
    ? TEMPLATE_REGISTRY.filter((t) => t.category === activeCategory)
    : TEMPLATE_REGISTRY;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <header className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Remotion Stock Video Generator
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Pilih template, kustomisasi, render. Buat stock video dalam hitungan
            menit.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/playground"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-medium transition-colors"
          >
            Code Playground →
          </Link>
          <Link
            href="/editor"
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-sm font-medium transition-colors"
          >
            Open Editor →
          </Link>
        </div>
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
              <p className="text-xs text-white/40 mt-0.5">{selected.description}</p>
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
              <Link
                href="/editor"
                className="bg-indigo-600/20 text-indigo-400 rounded px-2 py-1 hover:bg-indigo-600/30 transition-colors"
              >
                Edit →
              </Link>
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
