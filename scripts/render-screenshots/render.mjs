/**
 * 用扩展真实的卡片组件渲染 README 截图：
 *
 *   npm run screenshots
 *
 * 构建 scene.html → 本地起一个静态服务 → 用无界面 Chrome（独立的临时配置目录）逐张截图，
 * 输出到 docs/screenshots/。找不到 Chrome 时，用环境变量 CHROME_PATH 指定。
 */
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import http from "node:http";
import { tmpdir } from "node:os";
import { dirname, extname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import preact from "@preact/preset-vite";
import { build } from "vite";

const here = dirname(fileURLToPath(import.meta.url));
const docs = resolve(here, "../../docs/screenshots");

// 画面尺寸按卡片实际位置收紧。宽度要留够，卡片才能保持 400px 的完整宽度；
// 高度也要够，否则卡片为预留 280px 最小高度会被往上推，停不到真实位置
const SHOTS = [
  { file: "term.png", scene: "term", theme: "light", width: 900, height: 400 },
  { file: "follow-up.png", scene: "followup", theme: "dark", width: 712, height: 420 },
];

const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2" };

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    join(process.env.PROGRAMFILES ?? "", "Google/Chrome/Application/chrome.exe"),
    join(process.env["PROGRAMFILES(X86)"] ?? "", "Google/Chrome/Application/chrome.exe"),
    join(process.env.LOCALAPPDATA ?? "", "Google/Chrome/Application/chrome.exe"),
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ];
  const found = candidates.find((p) => p && existsSync(p));
  if (!found) throw new Error("Chrome not found; set CHROME_PATH");
  return found;
}

function run(cmd, args) {
  return new Promise((ok, fail) => {
    const child = spawn(cmd, args, { stdio: "ignore" });
    child.on("error", fail);
    child.on("exit", (code) => (code === 0 ? ok() : fail(new Error(`${cmd} exited with ${code}`))));
  });
}

const out = await mkdtemp(join(tmpdir(), "companion-render-"));
const profile = await mkdtemp(join(tmpdir(), "companion-chrome-"));
try {
  await build({
    configFile: false,
    root: here,
    logLevel: "warn",
    plugins: [preact()],
    build: {
      outDir: out,
      emptyOutDir: true,
      target: "esnext",
      rollupOptions: { input: resolve(here, "scene.html") },
    },
  });

  const server = http.createServer(async (req, res) => {
    const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    try {
      const body = await readFile(join(out, path === "/" ? "scene.html" : path));
      res.writeHead(200, { "content-type": TYPES[extname(path)] ?? "application/octet-stream" });
      res.end(body);
    } catch {
      res.writeHead(404).end();
    }
  });
  await new Promise((ok) => server.listen(0, "127.0.0.1", ok));
  const base = `http://127.0.0.1:${server.address().port}/scene.html`;
  const chrome = findChrome();

  for (const s of SHOTS) {
    const target = join(docs, s.file);
    await run(chrome, [
      "--headless=new",
      "--hide-scrollbars",
      "--force-device-scale-factor=2",
      `--window-size=${s.width},${s.height}`,
      `--user-data-dir=${profile}`,
      "--virtual-time-budget=4000",
      `--screenshot=${target}`,
      `${base}?scene=${s.scene}&theme=${s.theme}`,
    ]);
    console.log("saved", target);
  }
  server.close();
} finally {
  await rm(out, { recursive: true, force: true });
  await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
}
