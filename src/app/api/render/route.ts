import { NextRequest, NextResponse } from "next/server";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";
import path from "path";
import fs from "fs";
import os from "os";
import { transform } from "sucrase";

export const maxDuration = 120;

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
    } = body as {
      code: string;
      durationInFrames: number;
      width: number;
      height: number;
      fps: number;
    };

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "Field 'code' wajib diisi" },
        { status: 400 },
      );
    }

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

    // Render the video
    const outputPath = path.join(tmpDir, "output.mp4");
    await renderMedia({
      composition,
      serveUrl: bundled,
      codec: "h264",
      outputLocation: outputPath,
    });

    // Read the rendered file and return it
    const videoBytes = new Uint8Array(fs.readFileSync(outputPath));

    // Cleanup
    fs.rmSync(tmpDir, { recursive: true, force: true });

    return new NextResponse(videoBytes, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": 'attachment; filename="animation.mp4"',
        "Content-Length": String(videoBytes.length),
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
