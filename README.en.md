<div align="center">

<img src="public/icons/icon128.png" width="76" alt="DeepSeek Reading Companion icon">

# DeepSeek Reading Companion

**Understand English text right where you read it.**

[简体中文](README.md) · English

[![Release](https://img.shields.io/github/v/release/zzkws/DeepSeek-Reading-Companion?sort=semver&label=release)](https://github.com/zzkws/DeepSeek-Reading-Companion/releases/latest)
![Chrome](https://img.shields.io/badge/Chrome-116%2B-4285F4)
![Manifest](https://img.shields.io/badge/Manifest-V3-34A853)
![License](https://img.shields.io/badge/license-MIT-green)

<p>
  <a href="docs/posters/01-context-reading.png"><img src="docs/posters/01-context-reading.png" width="31%" alt="Web pages: understand it right beside the source"></a>
  <a href="docs/posters/02-pdf-reading.png"><img src="docs/posters/02-pdf-reading.png" width="31%" alt="Papers: understanding never leaves the text"></a>
  <a href="docs/posters/03-local-pronunciation.png"><img src="docs/posters/03-local-pronunciation.png" width="31%" alt="Local pronunciation: read it, and hear it"></a>
</p>

<sub>Posters are illustrations (click to enlarge); see <em>In use</em> below for real screenshots.</sub>

</div>

DeepSeek Reading Companion (DeepSeek 伴读) is a Chrome extension for **Chinese-speaking readers of English** web pages and paper PDFs. Select a word or a sentence and DeepSeek explains it **in Chinese**, using the surrounding text and following the source's own argument. Ask follow-up questions in the same card, or listen to the English pronunciation. The explanation sits right next to your selection, so you keep reading instead of bouncing between the page and a chat window.

> The interface and the explanations are in Chinese.

## Features

- **Faithful to the source** — keeps the text's subjects, terms and order of argument, and its comparisons, qualifications and uncertainty. It says what the selection means first, then the relationships the text actually establishes, in plain paragraphs instead of dictionary-style templates.
- **Ask in place** — the card opens beside the selection and streams its answer; follow-up questions reuse the same context and conversation, with the source still on screen.
- **Smart selection** — half-selected words are completed to whole words; in PDFs, selecting either half of a word hyphenated across lines still gives you the full word.
- **PDF reader** — rebuilds columns and paragraphs, joins words split across lines and pages, and keeps figure captions separate. On the Flash model it also hands the current page and earlier pages with figure captions to the vision model, so figures and formulas are read in place.
- **Local pronunciation** — Kokoro Q8 with the American "Heart" voice. The ~92 MB model is downloaded and verified once, then works offline. Generate on click or ahead of time; volume adjustable; up to 240 characters.
- **History** — your last 200 conversations stay on your machine, searchable, each one linked back to its source.
- **Your way** — model (Flash / Pro), trigger (select, or Alt + select), card position (beside the selection / fixed on the right) and deep thinking are all in settings; light and dark themes follow the system.

## In use

**A term, put back into its paragraph.** Technical words are rarely hard on their own; what is hard is what they mean *here*. Select `calibrated probabilities` and the card first defines it, then explains how it relates to the answers the text describes.

![Selecting "calibrated probabilities" in a technical article; the explanation appears beside the source](docs/screenshots/web-selection.png)

**Follow the argument.** At `Verifiable problems`, a dictionary gloss of "verifiable" doesn't connect to the article. The companion explains it within the paragraph: problems whose correctness can be checked cheaply and automatically, illustrated in the text by math proofs and kernel optimisation. Need more? Type a follow-up at the bottom of the card.

![Selecting "Verifiable problems", with the explanation and the follow-up box](docs/screenshots/web-follow-up.png)

## Requirements

- Chrome 116 or newer
- Your own [DeepSeek API key](https://platform.deepseek.com/api_keys) (usage is billed to your account)

## Install with Claude Code

Using [Claude Code](https://claude.com/claude-code)? Copy the prompt below (copy button at the top-right of the block) and paste it in. It reviews the source, builds the extension from the reviewed code (or falls back to the prebuilt package without Node.js), then walks you through loading and checking it in Chrome. You enter your API key in the extension's settings page yourself; it never passes through the agent.

```text
Please help me install the Chrome extension DeepSeek Reading Companion
(https://github.com/zzkws/DeepSeek-Reading-Companion). It explains selected text on English web pages and
PDFs in Chinese, using DeepSeek and the surrounding context, and can pronounce it locally. Review it, prepare
it and guide me through installing it, step by step, and tell me what you find along the way.

1. Check the environment
   - Confirm Chrome 116 or newer is installed and tell me the version.
   - Check for git and Node.js 22 (`node --version`). Node.js is optional; without it, step 4 uses the
     prebuilt package instead.

2. Get the code
   - Clone the repo into a permanent folder: %USERPROFILE%\DeepSeek-Reading-Companion on Windows,
     ~/DeepSeek-Reading-Companion on macOS / Linux, unless I name another place. Chrome keeps loading the
     extension from there, so it must not be deleted or moved later.
   - Check out the tag of the latest release (find it with `gh release view` or on the Releases page,
     e.g. v0.3.0).

3. Review before installing
   - Read `manifest.config.ts` and the files in `src/background`, `src/content`, `src/pdf`, `src/speech`
     and `src/shared`.
   - Check that its behaviour matches this list, and report anything outside it (especially other network
     requests, analytics or remote code execution) before continuing:
     * Network: only /chat/completions on the API URL from settings (default https://api.deepseek.com);
       the speech model is downloaded from this project's GitHub release, with Hugging Face as fallback,
       and checked with SHA-256; the PDF reader downloads a PDF only when opened with `?file=<url>`.
     * Data sent: the selection plus context from the start of the article to about 1,000 characters past
       it (for articles over 160,000 characters, only the first 12,000 plus the part around the selection);
       PDF queries on the Flash model also attach up to 12 page images.
     * Local storage: the API key, settings and up to 200 history entries in chrome.storage.local; the
       speech model in Cache Storage.
     * Permissions: storage, offscreen, unlimitedStorage; a content script in the main frame of http(s)
       pages; host_permissions only for the DeepSeek API and the Hugging Face and GitHub download locations.
     * No remotely downloaded JavaScript or WebAssembly is executed (see content_security_policy in the
       manifest).

4. Prepare the folder to load
   - With Node.js 22, build from the reviewed source: `npm ci`, then `npm run build`; the folder to load is
     `dist`. That way what gets installed is exactly the code you reviewed. Newer npm versions may say some
     dependencies' install scripts were blocked; leave them blocked, the build doesn't need them. Only if
     the build fails, consider allowing them, and ask me first.
   - Without Node.js, or if the build fails, download `deepseek-reading-companion.zip` from the same release
     and unzip it into a `release` folder inside the repo; that is the folder to load. The package is built
     on GitHub from the same tag by `.github/workflows/release.yml`.
   - Make sure the folder contains `manifest.json`, then tell me its full path.

5. Guide me through loading it (I have to click in Chrome myself; you can't do this step for me)
   - Have me open chrome://extensions, turn on Developer mode (top right), click "Load unpacked" and pick
     the folder from step 4.
   - The settings page opens automatically. I will enter my DeepSeek API key there myself
     (https://platform.deepseek.com/api_keys), test the connection and save. Don't ask me to send you the
     key, and don't write it into any file.
   - Remind me to stay on the settings page until the speech model (about 92 MB) has finished downloading.

6. Verify
   - Ask me to open any English web page, select a word and confirm the explanation card appears beside it,
     then click the speaker next to the card title to hear it.
   - If anything is off, help me troubleshoot: check this extension's errors in chrome://extensions first,
     then the connection test on the settings page.

7. Hand over
   - The interface is in Chinese. Explain how to use it in my language: just select text (or hold Alt while
     selecting, if that trigger is set); type a follow-up at the bottom of the card and press Enter; Esc
     closes it; for PDFs, click the toolbar icon, open the PDF reader (打开 PDF 阅读器) and drop the file in;
     the toolbar icon also has History (历史对话) and Settings (设置).
   - Tell me how to upgrade: `git fetch --tags` in the repo, check out the new tag and rebuild (or download
     the new package over the `release` folder), then reload the extension in chrome://extensions and
     refresh any open pages.
   - Tell me how to uninstall: remove the extension in chrome://extensions, then delete the folder.

Don't change the project's code, and ask me before installing anything globally.
```

## Install manually

1. Download `deepseek-reading-companion.zip` from the [latest release](https://github.com/zzkws/DeepSeek-Reading-Companion/releases/latest) and unzip it into a permanent folder.
2. Open `chrome://extensions`, turn on **Developer mode** (top right), click **Load unpacked** and pick the unzipped folder.
3. The settings page opens automatically: enter your API key, test the connection and save. The pronunciation model's download progress is shown there too.

To upgrade, replace the files in that folder, reload the extension in `chrome://extensions`, and refresh any pages you are reading.

## Usage

| To | Do |
| --- | --- |
| Explain something on a web page | Just select it (or hold <kbd>Alt</kbd> while selecting, if you chose that trigger) |
| Read a PDF | Toolbar icon → *Open PDF reader* (打开 PDF 阅读器) → drop the file in, then select as usual |
| Ask a follow-up | Type at the bottom of the card, press <kbd>Enter</kbd> |
| Hear it | Click the speaker next to the card title |
| Close the card | <kbd>Esc</kbd> or × |
| Find past lookups | Toolbar icon → *History* (历史对话) |
| Change settings | Toolbar icon → *Settings* (设置): API key, API URL, model, deep thinking, trigger, card position, speech |

Chrome's built-in PDF viewer doesn't expose selections, so PDFs open in the extension's own reader.

## Data & privacy

- **Sent to the API**: your selection plus the context needed to explain it — the article from the beginning to about 1,000 characters past the selection, cut at a sentence or paragraph boundary. For articles over 160,000 characters, the first 12,000 characters plus the part around the selection. PDF queries on the Flash model also attach images of the current page and of pages with relevant figures (up to 12). Everything goes to the API URL in settings, `https://api.deepseek.com` by default.
- **Kept on your machine**: your API key and conversation history, in `chrome.storage.local`.
- **Pronunciation**: the Kokoro model is downloaded from this project's GitHub release (with Hugging Face as fallback), checked with SHA-256 and cached; the text being spoken never leaves your machine. No remotely downloaded JavaScript or WebAssembly is ever executed.
- **Permissions**: `storage` for settings and history; `unlimitedStorage` so the speech model cache isn't evicted; `offscreen` to synthesise speech in the background; a content script on http(s) pages to respond to your selections; host permissions only for the DeepSeek API and the model download locations.

**Known limitations**: scanned PDFs have no selectable text layer; complex formulas and tables should be checked against the page; selections inside web page iframes aren't supported yet.

## Development

Requires Node.js 22 (the version used by the release workflow).

```bash
git clone https://github.com/zzkws/DeepSeek-Reading-Companion.git
cd DeepSeek-Reading-Companion
npm ci
npm run build      # type-check + build into dist/
```

Load the generated `dist/` in `chrome://extensions` to try it.

| Command | Does |
| --- | --- |
| `npm run dev` | Vite dev mode with auto reload |
| `npm run typecheck` | TypeScript type check only |
| `npm run zip` | Build and package `deepseek-reading-companion.zip` |
| `npm run icons` | Regenerate the toolbar icons |

Pushing a `v*` tag makes GitHub Actions build and publish a release. Regression scripts for PDF text reconstruction and selection completion live in `scripts/`; see [docs/reading-pipeline.md](docs/reading-pipeline.md) (in Chinese).

```
src/
├─ background/   # service worker: builds the prompt, calls DeepSeek, streams the answer
│  └─ prompt.ts  #   answering principles and context trimming (the full system prompt)
├─ content/      # content script: article extraction, selection completion, the card
├─ pdf/          # the built-in PDF reader: layout, selection mapping, page images
├─ ui/           # card UI (Preact), shared by web pages and the PDF reader
├─ speech/       # Kokoro local speech: model cache, offscreen page, worker
├─ options/      # settings page
├─ history/      # history page
├─ menu/         # toolbar popup
└─ shared/       # settings, history, types, selection helpers
```

## About

DeepSeek Reading Companion is an independent open-source project built around DeepSeek's models and design language. **It is not an official DeepSeek product.** It was made out of affection for DeepSeek.

## License

Source code is [MIT](LICENSE). The local speech components and model keep their own licenses (Kokoro is Apache-2.0, the embedded eSpeak NG is GPL-3.0, and others); see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).
