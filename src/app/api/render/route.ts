import { NextRequest, NextResponse } from "next/server";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import os from "os";
import { transform } from "sucrase";

export const maxDuration = 120;

type VideoFormat = "mp4" | "mov";
type QualityPreset = "low" | "medium" | "high";

const MP4_MAX_SIZE_BYTES = 20 * 1024 * 1024; // 20 MB
const MOV_MAX_SIZE_BYTES = 100 * 1024 * 1024; // 100 MB

const CRF_PRESETS: Record<QualityPreset, number> = {
  low: 30,
  medium: 24,
  high: 18,
};

const PRORES_PROFILES: Record<
  QualityPreset,
  "proxy" | "light" | "standard" | "hq"
> = {
  low: "proxy",
  medium: "light",
  high: "standard",
};

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export async function POST(req: NextRequest) {
  let tmpDir = "";

  try {
    const body = await req.json();
    const {
      code,
      durationInFrames = 150,
      width = 1920,
      height = 1080,
      fps = 30,
      format = "mp4",
      quality = "medium",
    } = body as {
      code: string;
      durationInFrames: number;
      width: number;
      height: number;
      fps: number;
      format: VideoFormat;
      quality: QualityPreset;
    };

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Field 'code' wajib diisi" },
        { status: 400 },
      );
    }

    const videoFormat: VideoFormat =
      format === "mov" ? "mov" : "mp4";
    const qualityPreset: QualityPreset =
      (["low", "medium", "high"] as const).includes(quality as QualityPreset)
        ? (quality as QualityPreset)
        : "medium";

    // Transpile user code from JSX/TSX to plain JS
    let jsCode: string;
    try {
      jsCode = transform(code, {
        transforms: ["jsx", "typescript"],
        jsxRuntime: "classic",
        jsxPragma: "React.createElement",
        jsxFragmentPragma: "React.Fragment",
      }).code;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      return NextResponse.json(
        { error: `Compile error: ${message}` },
        { status: 400 },
      );
    }

    // Create temp directory for the render project
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "remotion-playground-"));

    // Write the composition entry file
    const entryContent = `
import { registerRoot } from "remotion";
import React from "react";
import * as Remotion from "remotion";
import { Composition } from "remotion";

${jsCode}

const Root = () => {
  return (
    <Composition
      id="PlaygroundComp"
      component={typeof MyVideo !== "undefined" ? MyVideo : () => null}
      durationInFrames={${durationInFrames}}
      fps={${fps}}
      width={${width}}
      height={${height}}
    />
  );
};

registerRoot(Root);
`;
    const entryPath = path.join(tmpDir, "entry.tsx");
    fs.writeFileSync(entryPath, entryContent);

    // Bundle the entry
    const bundled = await bundle({
      entryPoint: entryPath,
      onProgress: () => {
        // no-op
      },
    });

    // Select the composition
    const composition = await selectComposition({
      serveUrl: bundled,
      id: "PlaygroundComp",
    });

    // Build render options based on format and quality
    const extension = videoFormat === "mov" ? "mov" : "mp4";
    const outputPath = path.join(tmpDir, `output.${extension}`);

    if (videoFormat === "mov") {
      await renderMedia({
        composition,
        serveUrl: bundled,
        codec: "prores",
        proResProfile: PRORES_PROFILES[qualityPreset],
        outputLocation: outputPath,
      });
    } else {
      await renderMedia({
        composition,
        serveUrl: bundled,
        codec: "h264",
        crf: CRF_PRESETS[qualityPreset],
        outputLocation: outputPath,
      });
    }

    // Read the rendered file
    const videoBytes = new Uint8Array(fs.readFileSync(outputPath));
    const fileSize = videoBytes.length;

    // Validate file size limits
    const maxSize =
      videoFormat === "mov" ? MOV_MAX_SIZE_BYTES : MP4_MAX_SIZE_BYTES;
    if (fileSize > maxSize) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
      const maxLabel = formatBytes(maxSize);
      const actualLabel = formatBytes(fileSize);
      return NextResponse.json(
        {
          error: `File terlalu besar: ${actualLabel} (max ${maxLabel}). Coba kurangi durasi, turunkan resolusi, atau pilih kualitas lebih rendah.`,
        },
        { status: 413 },
      );
    }

    // Cleanup
    fs.rmSync(tmpDir, { recursive: true, force: true });

    const contentType =
      videoFormat === "mov" ? "video/quicktime" : "video/mp4";
    const filename = `animation.${extension}`;

    return new NextResponse(videoBytes, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(fileSize),
      },
    });
  } catch (err: unknown) {
    // Cleanup on error
    if (tmpDir && fs.existsSync(tmpDir)) {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    }

    const message = err instanceof Error ? err.message : String(err);
    console.error("Render error:", message);
    return NextResponse.json(
      { error: `Render gagal: ${message}` },
      { status: 500 },
    );
  }
}
