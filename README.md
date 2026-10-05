<div align="center">

<img src="public/icons/icon128.png" width="76" alt="DeepSeek 伴读图标">

# DeepSeek 伴读

**读到哪里，就在原文旁理解到哪里。**

简体中文 · [English](README.en.md)

[![Release](https://img.shields.io/github/v/release/zzkws/DeepSeek-Reading-Companion?sort=semver&label=release)](https://github.com/zzkws/DeepSeek-Reading-Companion/releases/latest)
![Chrome](https://img.shields.io/badge/Chrome-116%2B-4285F4)
![Manifest](https://img.shields.io/badge/Manifest-V3-34A853)
![License](https://img.shields.io/badge/license-MIT-green)

<p>
  <a href="docs/posters/01-context-reading.png"><img src="docs/posters/01-context-reading.png" width="31%" alt="网页划词：读到哪里，就在原文旁理解到哪里"></a>
  <a href="docs/posters/02-pdf-reading.png"><img src="docs/posters/02-pdf-reading.png" width="31%" alt="论文 PDF：读论文，理解不离开原文"></a>
  <a href="docs/posters/03-local-pronunciation.png"><img src="docs/posters/03-local-pronunciation.png" width="31%" alt="本地发音：看懂它，也听见它"></a>
</p>

<sub>海报为界面示意，点击看大图；实际使用画面见下方「阅读场景」。</sub>

</div>

DeepSeek 伴读是一个 Chrome 扩展，陪你读英文网页和论文 PDF。选中一个词或一句话，DeepSeek 结合前后文，沿着原文给出直接的中文理解；有疑问就在同一张卡片里接着问，也可以听选中内容的英文发音。解释贴在选区旁边，读完接着看下一行，不用在页面和聊天窗口之间来回切换。

## 特性

- **以原文为准**：沿用原文的对象、术语、主语和论述顺序，保留比较、限定与不确定性；先说选中内容的确切含义，再说原文明确建立的关系。用自然段落直说，不套词典栏目或固定模板。
- **就地追问**：卡片贴着选区展开，答案流式出现；追问沿用当前上下文和已有对话，原文与回答始终同屏。
- **选区自动补齐**：漏选半个单词时自动补到完整的词边界；PDF 里只选中跨行断词的一半，也能得到完整单词。
- **PDF 阅读器**：按栏与段落整理文字，合并跨行、跨页的断词，图注单独存放；使用 Flash 模型时，会把当前页和前面带图注的页面一起交给视觉模型，图表和公式也能对照着讲。
- **本地发音**：Kokoro Q8 美式 Heart 音色，模型约 92 MB，首次下载并校验后离线可用；可选「点击后生成」或「选中后预先生成」，音量可调，最多 240 个字符。
- **历史对话**：最近 200 条保存在本机，可以搜索，也能回到原文。
- **按你的习惯来**：模型（Flash / Pro）、触发方式（选中即弹出 / 按住 Alt 选中）、浮层位置（贴着选区 / 固定在右侧）、深度思考都可在设置里调；界面随系统切换深浅主题。

## 阅读场景

**一个术语，放回这一段。** 技术文章里的词未必难，难的是它在这一段里指什么。选中 `calibrated probabilities`，卡片先给出「校准概率」的含义，再说明它和原文所述答案的关系。

![在英文技术文章中选中 calibrated probabilities，DeepSeek 伴读贴着原文解释](docs/screenshots/web-selection.png)

**顺着论述继续问。** 读到 `Verifiable problems`，单独翻出「可验证」还接不上文章。伴读沿着所在段落说明：这类问题的正确性可以低成本、自动地检查，原文举了数学证明与内核优化的例子。还想再问，直接在卡片底部输入。

![在使用场景段落中选中 Verifiable problems，查看解释与就地追问入口](docs/screenshots/web-follow-up.png)

## 环境要求

- Chrome 116 或更新版本
- 你自己的 [DeepSeek API Key](https://platform.deepseek.com/api_keys)（调用费用计入你的账户）

## 安装

1. 从[最新版本](https://github.com/zzkws/DeepSeek-Reading-Companion/releases/latest)下载 `deepseek-reading-companion.zip`，解压到一个固定的目录。
2. 打开 `chrome://extensions`，开启右上角的「开发者模式」，点「加载已解压的扩展程序」，选择解压后的目录。
3. 设置页会自动打开：填入 API Key，测试连接并保存。发音模型的下载进度也显示在这里。

升级时，用新文件替换原目录里的文件，在 `chrome://extensions` 里重新加载扩展，再刷新已经打开的阅读页面。

## 使用

| 想做的事 | 怎么做 |
| --- | --- |
| 解释网页上的词句 | 直接选中；设置成「按住 Alt 选中」时，按住 <kbd>Alt</kbd> 再选 |
| 读 PDF | 点工具栏图标 →「打开 PDF 阅读器」→ 把文件拖进去，然后照常划词 |
| 追问 | 在卡片底部输入，按 <kbd>Enter</kbd> |
| 听发音 | 点卡片标题旁的扬声器 |
| 关闭卡片 | <kbd>Esc</kbd> 或点 × |
| 找回查过的内容 | 工具栏图标 →「历史对话」 |
| 改设置 | 工具栏图标 →「设置」：API Key、API 地址、模型、深度思考、触发方式、浮层位置、发音 |

Chrome 自带的 PDF 查看器拿不到选区，所以 PDF 要在扩展自己的阅读器里打开。

## 数据与隐私

- **发给 API 的内容**：选中的词句，以及理解它所需的上下文——从文章开头到选区之后约 1000 字，截到句子或段落边界；文章超过 16 万字时，改为发送开头 1.2 万字加选区附近的内容。用 Flash 模型查询 PDF 时，还会附上当前页和相关图表所在页的页图（最多 12 页）。目的地是设置里的 API 地址，默认 `https://api.deepseek.com`。
- **只存在本机的内容**：API Key 和对话历史保存在 `chrome.storage.local`，不会上传到别处。
- **发音**：Kokoro 模型从本项目的 GitHub Release 下载（Hugging Face 作备用源），经 SHA-256 校验后缓存；要读的文本只在本机处理。扩展不执行任何远程下载的 JavaScript 或 WebAssembly。
- **权限用途**：`storage` 存设置和历史；`unlimitedStorage` 保证发音模型缓存不被清理；`offscreen` 用于在后台生成语音；内容脚本运行在所有 http(s) 页面上，用来响应你的选区；主机权限只覆盖 DeepSeek API 和模型下载地址。

**已知限制**：扫描版 PDF 没有可选的文字层，暂时不能划词；复杂公式和表格需要对照原页核实；网页 iframe 里的选区暂不支持。

## 开发

需要 Node.js 22（与发布流程一致）。

```bash
git clone https://github.com/zzkws/DeepSeek-Reading-Companion.git
cd DeepSeek-Reading-Companion
npm ci
npm run build      # 类型检查 + 构建到 dist/
```

在 `chrome://extensions` 里加载生成的 `dist/` 即可调试。

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | Vite 开发模式，改动自动重载 |
| `npm run typecheck` | 只做 TypeScript 类型检查 |
| `npm run zip` | 构建并打包成 `deepseek-reading-companion.zip` |
| `npm run icons` | 重新生成工具栏图标 |

推送 `v*` 标签会触发 GitHub Actions，自动构建并发布 Release。PDF 文本整理和选区补齐的回归脚本在 `scripts/` 里，用法见 [docs/reading-pipeline.md](docs/reading-pipeline.md)。

```
src/
├─ background/   # Service Worker：组装提示词、调用 DeepSeek、流式返回
│  └─ prompt.ts  #   回答原则与上下文裁剪（完整系统提示词在这里）
├─ content/      # 网页内容脚本：正文提取、选区补齐、弹出卡片
├─ pdf/          # 扩展自带的 PDF 阅读器：版面整理、选区映射、页图
├─ ui/           # 卡片界面（Preact），网页与 PDF 共用
├─ speech/       # Kokoro 本地发音：模型缓存、离屏页与 Worker
├─ options/      # 设置页
├─ history/      # 历史对话页
├─ menu/         # 工具栏弹出菜单
└─ shared/       # 设置、历史、类型与选区工具
```

## 关于这个项目

DeepSeek 伴读是围绕 DeepSeek 模型能力与设计风格制作的独立开源作品，**不是 DeepSeek 官方产品**。谨以此作品，表达本人对 DeepSeek 的喜爱之情。

## 许可证

源码采用 [MIT 许可证](LICENSE)。本地发音用到的组件和模型保留各自的许可（Kokoro 为 Apache-2.0，内嵌的 eSpeak NG 为 GPL-3.0 等），详见[第三方许可说明](THIRD_PARTY_NOTICES.md)。
