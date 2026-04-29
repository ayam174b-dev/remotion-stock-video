"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import {
  TEMPLATE_REGISTRY,
  CATEGORIES,
} from "../../lib/template-registry";
import { VIDEO_FPS } from "../../../types/constants";

type AspectRatio = {
  label: string;
  width: number;
  height: number;
  icon: string;
};

const ASPECT_RATIOS: AspectRatio[] = [
  { label: "16:9", width: 1920, height: 1080, icon: "▬" },
  { label: "9:16", width: 1080, height: 1920, icon: "▮" },
  { label: "1:1", width: 1080, height: 1080, icon: "■" },
  { label: "4:5", width: 1080, height: 1350, icon: "▯" },
];

function isColorValue(value: unknown): boolean {
  if (typeof value !== "string") return false;
  return /^#[0-9a-fA-F]{3,8}$/.test(value) || /^rgba?\(/.test(value);
}

function inferFieldType(
  key: string,
  value: unknown,
): "color" | "number" | "boolean" | "enum" | "string" | "array" | "object" {
  if (typeof value === "boolean") return "boolean";
  if (typeof value === "number") return "number";
  if (isColorValue(value)) return "color";
  if (Array.isArray(value)) return "array";
  if (typeof value === "object" && value !== null) return "object";
  return "string";
}

const EditorPage: NextPage = () => {
  const [selectedId, setSelectedId] = useState(TEMPLATE_REGISTRY[0].id);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [customProps, setCustomProps] = useState<Record<string, Record<string, unknown>>>({});
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(ASPECT_RATIOS[0]);
  const [sidebarTab, setSidebarTab] = useState<"templates" | "properties">("properties");

  const template = useMemo(
    () => TEMPLATE_REGISTRY.find((t) => t.id === selectedId) ?? TEMPLATE_REGISTRY[0],
    [selectedId],
  );

  const currentProps = useMemo(() => {
    return { ...template.defaultProps, ...(customProps[selectedId] ?? {}) };
  }, [template.defaultProps, customProps, selectedId]);

  const updateProp = useCallback(
    (key: string, value: unknown) => {
      setCustomProps((prev) => ({
        ...prev,
        [selectedId]: { ...(prev[selectedId] ?? {}), [key]: value },
      }));
    },
    [selectedId],
  );

  const resetProps = useCallback(() => {
    setCustomProps((prev) => {
      const next = { ...prev };
      delete next[selectedId];
      return next;
    });
  }, [selectedId]);

  const filtered = activeCategory
    ? TEMPLATE_REGISTRY.filter((t) => t.category === activeCategory)
    : TEMPLATE_REGISTRY;

  const playerWidth = Math.min(800, aspectRatio.width);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-white/50 hover:text-white transition-colors text-sm"
          >
            ← Dashboard
          </Link>
          <h1 className="text-lg font-bold tracking-tight">Visual Editor</h1>
        </div>
        <div className="flex items-center gap-2">
          {ASPECT_RATIOS.map((ar) => (
            <button
              key={ar.label}
              onClick={() => setAspectRatio(ar)}
              className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${
                aspectRatio.label === ar.label
                  ? "bg-indigo-600 text-white"
                  : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
              }`}
              title={`${ar.width}×${ar.height}`}
            >
              <span className="mr-1">{ar.icon}</span>
              {ar.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-80 border-r border-white/10 flex flex-col shrink-0 overflow-hidden">
          {/* Tab switcher */}
          <div className="flex border-b border-white/10 shrink-0">
            <button
              onClick={() => setSidebarTab("templates")}
              className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                sidebarTab === "templates"
                  ? "text-white border-b-2 border-indigo-500"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setSidebarTab("properties")}
              className={`flex-1 px-4 py-2.5 text-sm font-medium transition-colors ${
                sidebarTab === "properties"
                  ? "text-white border-b-2 border-indigo-500"
                  : "text-white/50 hover:text-white"
              }`}
            >
              Properties
            </button>
          </div>

          {sidebarTab === "templates" ? (
            <div className="flex-1 overflow-y-auto">
              {/* Category filters */}
              <div className="flex flex-wrap gap-1.5 p-3 border-b border-white/10">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                    !activeCategory
                      ? "bg-indigo-600 text-white"
                      : "bg-white/5 text-white/50 hover:bg-white/10"
                  }`}
                >
                  Semua
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setActiveCategory(activeCategory === cat ? null : cat)
                    }
                    className={`px-2.5 py-1 rounded-full text-xs transition-colors ${
                      activeCategory === cat
                        ? "bg-indigo-600 text-white"
                        : "bg-white/5 text-white/50 hover:bg-white/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Template list */}
              <div className="p-3 space-y-1.5">
                {filtered.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedId(t.id);
                      setSidebarTab("properties");
                    }}
                    className={`w-full text-left px-3 py-2.5 rounded-lg transition-colors ${
                      selectedId === t.id
                        ? "bg-indigo-600/20 border border-indigo-500/50"
                        : "hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <div className="text-sm font-medium">{t.label}</div>
                    <div className="text-xs text-white/40 mt-0.5">
                      {t.category} • {(t.durationInFrames / VIDEO_FPS).toFixed(0)}s
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto">
              {/* Current template info */}
              <div className="p-4 border-b border-white/10">
                <h3 className="font-semibold text-sm">{template.label}</h3>
                <p className="text-xs text-white/40 mt-1">{template.description}</p>
                <div className="flex gap-2 mt-3">
                  <span className="px-2 py-0.5 bg-white/5 rounded text-xs text-white/50">
                    {template.category}
                  </span>
                  <span className="px-2 py-0.5 bg-white/5 rounded text-xs text-white/50">
                    {(template.durationInFrames / VIDEO_FPS).toFixed(0)}s
                  </span>
                  <span className="px-2 py-0.5 bg-white/5 rounded text-xs text-white/50">
                    {aspectRatio.width}×{aspectRatio.height}
                  </span>
                </div>
              </div>

              {/* Property panel */}
              <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                    Parameters
                  </h4>
                  <button
                    onClick={resetProps}
                    className="text-xs text-indigo-400 hover:text-indigo-300"
                  >
                    Reset
                  </button>
                </div>

                {Object.entries(currentProps).map(([key, value]) => {
                  const fieldType = inferFieldType(key, value);

                  if (fieldType === "array" || fieldType === "object") {
                    return (
                      <div key={key}>
                        <label className="block text-xs text-white/50 mb-1.5">
                          {key}
                        </label>
                        <textarea
                          value={JSON.stringify(value, null, 2)}
                          onChange={(e) => {
                            try {
                              const parsed = JSON.parse(e.target.value);
                              updateProp(key, parsed);
                            } catch {
                              // ignore invalid JSON while typing
                            }
                          }}
                          className="w-full bg-white/5 border border-white/10 rounded px-3 py-2 text-sm text-white font-mono resize-y min-h-[60px] focus:outline-none focus:border-indigo-500"
                          rows={3}
                        />
                      </div>
                    );
                  }

                  if (fieldType === "color") {
                    return (
                      <div key={key}>
                        <label className="block text-xs text-white/50 mb-1.5">
                          {key}
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="color"
                            value={
                              typeof value === "string" && value.startsWith("#")
                                ? value.length === 4
                                  ? `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`
                                  : value.slice(0, 7)
                                : "#ffffff"
                            }
                            onChange={(e) => updateProp(key, e.target.value)}
                            className="w-10 h-8 rounded border border-white/10 bg-transparent cursor-pointer"
                          />
                          <input
                            type="text"
                            value={String(value)}
                            onChange={(e) => updateProp(key, e.target.value)}
                            className="flex-1 bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white font-mono focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    );
                  }

                  if (fieldType === "boolean") {
                    return (
                      <div key={key} className="flex items-center justify-between">
                        <label className="text-xs text-white/50">{key}</label>
                        <button
                          onClick={() => updateProp(key, !value)}
                          className={`w-10 h-5 rounded-full transition-colors relative ${
                            value ? "bg-indigo-600" : "bg-white/10"
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-transform ${
                              value ? "translate-x-5" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>
                    );
                  }

                  if (fieldType === "number") {
                    return (
                      <div key={key}>
                        <label className="block text-xs text-white/50 mb-1.5">
                          {key}
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="range"
                            min={0}
                            max={
                              key.includes("ount")
                                ? 200
                                : key.includes("ize") || key.includes("ont")
                                  ? 200
                                  : key.includes("peed") || key.includes("ntensity")
                                    ? 5
                                    : key.includes("lur") || key.includes("mplitude")
                                      ? 200
                                      : typeof value === "number" && value > 100
                                        ? value * 2
                                        : 100
                            }
                            step={typeof value === "number" && value % 1 !== 0 ? 0.1 : 1}
                            value={Number(value)}
                            onChange={(e) => updateProp(key, Number(e.target.value))}
                            className="flex-1 accent-indigo-500"
                          />
                          <input
                            type="number"
                            value={Number(value)}
                            onChange={(e) => updateProp(key, Number(e.target.value))}
                            className="w-16 bg-white/5 border border-white/10 rounded px-2 py-1 text-sm text-white text-center focus:outline-none focus:border-indigo-500"
                          />
                        </div>
                      </div>
                    );
                  }

                  // string
                  return (
                    <div key={key}>
                      <label className="block text-xs text-white/50 mb-1.5">
                        {key}
                      </label>
                      <input
                        type="text"
                        value={String(value)}
                        onChange={(e) => updateProp(key, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </aside>

        {/* Main preview area */}
        <main className="flex-1 flex items-center justify-center bg-[#111] p-8 overflow-auto">
          <div
            style={{
              width: playerWidth,
              maxWidth: "100%",
            }}
          >
            <Player
              component={template.component}
              inputProps={currentProps}
              durationInFrames={template.durationInFrames}
              compositionWidth={aspectRatio.width}
              compositionHeight={aspectRatio.height}
              fps={VIDEO_FPS}
              style={{
                width: "100%",
                aspectRatio: `${aspectRatio.width} / ${aspectRatio.height}`,
                borderRadius: 8,
                overflow: "hidden",
              }}
              controls
              autoPlay
              loop
            />
            <div className="flex items-center justify-between mt-4">
              <div className="text-xs text-white/40">
                {aspectRatio.width}×{aspectRatio.height} • {VIDEO_FPS}fps •{" "}
                {(template.durationInFrames / VIDEO_FPS).toFixed(1)}s
              </div>
              <div className="text-xs text-white/40">
                {template.label}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditorPage;
