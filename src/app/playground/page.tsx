"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import dynamic from "next/dynamic";
import type { NextPage } from "next";
import Link from "next/link";
import * as Remotion from "remotion";
import { Player } from "@remotion/player";
import { transform } from "sucrase";
import {
  PLAYGROUND_SNIPPETS,
  type PlaygroundSnippet,
} from "../../lib/playground-snippets";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-[#1e1e1e] text-white/40 text-sm">
      Loading editor...
    </div>
  ),
});

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
];

type CompileResult =
  | { ok: true; Component: React.FC }
  | { ok: false; error: string };

function compileUserCode(code: string): CompileResult {
  try {
    const jsCode = transform(code, {
      transforms: ["jsx", "typescript"],
      jsxRuntime: "classic",
      jsxPragma: "React.createElement",
      jsxFragmentPragma: "React.Fragment",
    }).code;

    const wrappedCode = `
      "use strict";
      ${jsCode}
      return typeof MyVideo !== "undefined" ? MyVideo : null;
    `;

    const factory = new Function("React", "Remotion", wrappedCode);
    const Component = factory(React, Remotion) as React.FC | null;

    if (!Component) {
      return {
        ok: false,
        error:
          'Tidak ditemukan komponen "MyVideo". Pastikan kode mendefinisikan function MyVideo() { ... }',
      };
    }

    return { ok: true, Component };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  }
}

type RenderStatus = "idle" | "rendering" | "done" | "error";

const PlaygroundPage: NextPage = () => {
  const [snippet, setSnippet] = useState<PlaygroundSnippet>(
    PLAYGROUND_SNIPPETS[0],
  );
  const [code, setCode] = useState(snippet.code);
  const [durationInFrames, setDurationInFrames] = useState(
    snippet.durationInFrames,
  );
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(ASPECT_RATIOS[0]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [compileResult, setCompileResult] = useState<CompileResult>({
    ok: false,
    error: "Compiling...",
  });
  const [renderStatus, setRenderStatus] = useState<RenderStatus>("idle");
  const [renderMessage, setRenderMessage] = useState("");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const doCompile = useCallback((src: string) => {
    const result = compileUserCode(src);
    setCompileResult(result);
  }, []);

  useEffect(() => {
    doCompile(code);
  }, [doCompile]); // only run on mount

  const handleCodeChange = useCallback(
    (value: string | undefined) => {
      const src = value ?? "";
      setCode(src);
      if (!autoRefresh) return;
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => doCompile(src), 600);
    },
    [autoRefresh, doCompile],
  );

  const handleManualRun = useCallback(() => {
    doCompile(code);
  }, [code, doCompile]);

  const handleSnippetSelect = useCallback(
    (s: PlaygroundSnippet) => {
      setSnippet(s);
      setCode(s.code);
      setDurationInFrames(s.durationInFrames);
      doCompile(s.code);
    },
    [doCompile],
  );

  const handleRender = useCallback(async () => {
    if (!compileResult.ok) return;
    setRenderStatus("rendering");
    setRenderMessage("Mengirim kode ke server untuk di-render...");

    try {
      const res = await fetch("/api/render", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          durationInFrames,
          width: aspectRatio.width,
          height: aspectRatio.height,
        }),
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setRenderStatus("error");
        setRenderMessage(data.error || "Render gagal");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "animation.mp4";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setRenderStatus("done");
      setRenderMessage("Video berhasil di-render dan di-download!");
      setTimeout(() => setRenderStatus("idle"), 3000);
    } catch (err: unknown) {
      setRenderStatus("error");
      setRenderMessage(
        err instanceof Error ? err.message : "Terjadi kesalahan saat render",
      );
    }
  }, [code, compileResult.ok, durationInFrames, aspectRatio]);

  const ErrorFallback = useMemo(() => {
    if (compileResult.ok) return null;
    const errorMsg = compileResult.error;
    const Comp: React.FC = () => (
      <Remotion.AbsoluteFill
        style={{
          backgroundColor: "#1a0000",
          justifyContent: "center",
          alignItems: "center",
          padding: 40,
        }}
      >
        <div
          style={{
            color: "#ff6b6b",
            fontFamily: "monospace",
            fontSize: 16,
            whiteSpace: "pre-wrap",
            maxWidth: "80%",
            textAlign: "center",
          }}
        >
          {errorMsg}
        </div>
      </Remotion.AbsoluteFill>
    );
    return Comp;
  }, [compileResult]);

  const PlayerComponent = compileResult.ok
    ? compileResult.Component
    : ErrorFallback;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-white/50 hover:text-white transition-colors text-sm"
          >
            ← Dashboard
          </Link>
          <h1 className="text-lg font-bold tracking-tight">
            Code Playground
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <label className="text-white/50">Durasi:</label>
            <input
              type="number"
              value={durationInFrames}
              onChange={(e) =>
                setDurationInFrames(
                  Math.max(1, parseInt(e.target.value) || 30),
                )
              }
              className="w-16 bg-white/10 border border-white/20 rounded px-2 py-1 text-white text-xs"
              min={1}
            />
            <span className="text-white/40">
              frames ({(durationInFrames / 30).toFixed(1)}s)
            </span>
          </div>

          <div className="flex items-center gap-1">
            {ASPECT_RATIOS.map((ar) => (
              <button
                key={ar.label}
                onClick={() => setAspectRatio(ar)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  aspectRatio.label === ar.label
                    ? "bg-indigo-600 text-white"
                    : "bg-white/5 text-white/50 hover:bg-white/10"
                }`}
                title={`${ar.width}×${ar.height}`}
              >
                {ar.icon}
                {ar.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setAutoRefresh((v) => !v)}
            className={`px-2 py-1 rounded text-xs transition-colors ${
              autoRefresh
                ? "bg-green-600/20 text-green-400 border border-green-600/30"
                : "bg-white/5 text-white/50 border border-white/10"
            }`}
          >
            {autoRefresh ? "Auto" : "Manual"}
          </button>

          {!autoRefresh && (
            <button
              onClick={handleManualRun}
              className="px-3 py-1 rounded text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
            >
              Run
            </button>
          )}

          <button
            onClick={handleRender}
            disabled={!compileResult.ok || renderStatus === "rendering"}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              !compileResult.ok || renderStatus === "rendering"
                ? "bg-white/5 text-white/30 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-500 text-white"
            }`}
          >
            {renderStatus === "rendering" ? "Rendering..." : "Render MP4"}
          </button>
        </div>
      </header>

      {renderStatus !== "idle" && (
        <div
          className={`px-4 py-2 text-xs ${
            renderStatus === "rendering"
              ? "bg-indigo-600/20 text-indigo-300"
              : renderStatus === "done"
                ? "bg-emerald-600/20 text-emerald-300"
                : "bg-red-600/20 text-red-300"
          }`}
        >
          {renderMessage}
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Snippet sidebar */}
        <aside className="w-56 border-r border-white/10 flex flex-col shrink-0 overflow-y-auto">
          <div className="px-3 py-2 border-b border-white/10">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Contoh Kode
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto">
            {PLAYGROUND_SNIPPETS.map((s) => (
              <button
                key={s.id}
                onClick={() => handleSnippetSelect(s)}
                className={`w-full text-left px-3 py-2.5 border-b border-white/5 transition-colors ${
                  snippet.id === s.id
                    ? "bg-indigo-600/10 border-l-2 border-l-indigo-500"
                    : "hover:bg-white/5"
                }`}
              >
                <div className="text-sm font-medium">{s.label}</div>
                <div className="text-xs text-white/40 mt-0.5">
                  {s.description}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Code editor */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 min-h-0">
            <MonacoEditor
              height="100%"
              language="typescript"
              theme="vs-dark"
              value={code}
              onChange={handleCodeChange}
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                wordWrap: "on",
                tabSize: 2,
                automaticLayout: true,
                padding: { top: 12 },
              }}
            />
          </div>

          {!compileResult.ok && (
            <div className="px-4 py-2 bg-red-900/30 border-t border-red-500/30 text-red-300 text-xs font-mono max-h-24 overflow-y-auto">
              {compileResult.error}
            </div>
          )}
        </div>

        {/* Preview panel */}
        <div className="w-[480px] border-l border-white/10 flex flex-col shrink-0">
          <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Preview
            </h3>
            <span className="text-xs text-white/30">
              {aspectRatio.width}x{aspectRatio.height} | 30fps |{" "}
              {(durationInFrames / 30).toFixed(1)}s
            </span>
          </div>
          <div className="flex-1 flex items-center justify-center p-4 bg-[#111]">
            {PlayerComponent && (
              <Player
                component={PlayerComponent}
                inputProps={{}}
                durationInFrames={durationInFrames}
                fps={30}
                compositionWidth={aspectRatio.width}
                compositionHeight={aspectRatio.height}
                style={{
                  width: "100%",
                  maxHeight: "100%",
                  borderRadius: 8,
                  overflow: "hidden",
                }}
                controls
                autoPlay
                loop
              />
            )}
          </div>

          <div className="px-4 py-3 border-t border-white/10 text-xs text-white/40 space-y-1">
            <p>
              <strong className="text-white/60">Cara pakai:</strong> Tulis
              komponen React bernama{" "}
              <code className="text-indigo-400">MyVideo</code>.
            </p>
            <p>
              API tersedia via{" "}
              <code className="text-indigo-400">Remotion</code>:{" "}
              <code className="text-indigo-400">AbsoluteFill</code>,{" "}
              <code className="text-indigo-400">useCurrentFrame</code>,{" "}
              <code className="text-indigo-400">interpolate</code>,{" "}
              <code className="text-indigo-400">spring</code>,{" "}
              <code className="text-indigo-400">useVideoConfig</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaygroundPage;
