/**
 * README 截图的渲染场景：把扩展真实的卡片组件（src/ui/Popup.tsx + styles.css）挂到一页英文正文旁边。
 * 用法见同目录的 render.mjs。地址参数：?scene=term|followup&theme=light|dark
 *
 * 卡片里的回答原样取自真实使用时 DeepSeek 给出的输出，不是编写的示例。
 */
import { render } from "preact";
import css from "../../src/ui/styles.css?inline";
import { applyTheme } from "../../src/shared/theme";
import { Popup } from "../../src/ui/Popup";
import { anchor, placement, status, thread, visible, word } from "../../src/ui/store";

// 最小的扩展环境替身：发音按钮挂载时会连接后台，这里给一个什么也不做的端口
const port = {
  onMessage: { addListener() {} },
  onDisconnect: { addListener() {} },
  postMessage() {},
  disconnect() {},
};
(globalThis as unknown as { chrome: unknown }).chrome = { runtime: { connect: () => port } };

type Paragraph = [lead: string, text: string];

const SCENES: Record<string, { paragraphs: Paragraph[]; selection: string; answer: string }> = {
  term: {
    paragraphs: [
      ["Unstructured data", "(e.g. text) goes in; the emphasis is on structured program state."],
      ["Type-safe structured values.", "Outputs follow a schema known in advance, so the model never returns malformed data. All answers come with calibrated probabilities and confidence scores."],
      ["Parallel.", "Generates all outputs in a single query, efficiently and with the hardware in mind."],
    ],
    selection: "calibrated probabilities",
    answer: "校准概率，指经过校准的、与模型实际准确率相符的概率值。原文说明：所有答案都附带校准概率和置信度分数。",
  },
  followup: {
    paragraphs: [
      ["Human-in-the-loop tasks", "(chatbots, copilots, coding agents) are general and powerful, but need oversight because their freedom also means they can go off the rails."],
      ["Verifiable problems", "(math proofs, kernel optimization). When correctness can be checked cheaply and automatically, models can generate, test and iterate until they find something that works."],
      ["AI-powered workflows.", "Structured outputs slot into ordinary software as fuzzy decision rules: classify, route, score or extract."],
    ],
    selection: "Verifiable problems",
    answer: "可验证的问题，指正确性能够被廉价且自动地检查的问题，例如数学证明、内核优化。",
  },
};

const params = new URLSearchParams(location.search);
const scene = SCENES[params.get("scene") ?? "term"] ?? SCENES.term;
const theme = params.get("theme") === "dark" ? "dark" : "light";

// 1. 正文，选区包一层高亮
const article = document.getElementById("article")!;
let selected: HTMLElement | null = null;
for (const [lead, text] of scene.paragraphs) {
  const p = document.createElement("p");
  const b = document.createElement("b");
  b.textContent = lead;
  p.append(b, " ");
  const full = `${lead} ${text}`;
  const at = full.indexOf(scene.selection);
  if (at >= 0 && !selected) {
    // 选区可能落在加粗的开头，也可能在正文里
    p.textContent = "";
    const before = full.slice(0, at);
    const after = full.slice(at + scene.selection.length);
    const mark = document.createElement("span");
    mark.className = "sel";
    mark.textContent = scene.selection;
    if (at < lead.length) {
      const bold = document.createElement("b");
      bold.append(before, mark, full.slice(at + scene.selection.length, lead.length));
      p.append(bold, full.slice(lead.length));
    } else {
      p.append(b, before.slice(lead.length), mark, after);
    }
    selected = mark;
  } else {
    p.append(text);
  }
  article.append(p);
}

// 2. 卡片：与内容脚本相同，挂在 Shadow DOM 里；主题用扩展自己的开关固定，不跟随截图机器的系统设置
const host = document.createElement("div");
host.style.cssText = "position:fixed;top:0;left:0;width:0;height:0;";
applyTheme(host, theme);
const shadow = host.attachShadow({ mode: "open" });
const style = document.createElement("style");
style.textContent = css;
const mount = document.createElement("div");
shadow.append(style, mount);
document.body.append(host);

const range = document.createRange();
range.selectNodeContents(selected!);
anchor.value = range;
word.value = scene.selection;
placement.value = "follow";
thread.value = [{ question: null, answer: scene.answer }];
status.value = "done";
visible.value = true;

render(<Popup onClose={() => {}} onOpenOptions={() => {}} onRetry={() => {}} onAsk={() => {}} />, mount);
