import { loadSettings } from "./settings";
import type { Settings } from "./types";

/**
 * 把主题设置落到元素上。
 *
 * 样式里的颜色都写成 light-dark(浅色, 深色)，默认 color-scheme: light dark 跟随系统，
 * 不依赖脚本，页面打开时不会闪。手动选浅色 / 深色时写上 data-theme，样式据此固定 color-scheme。
 */
export function applyTheme(el: HTMLElement, theme: Settings["theme"]): void {
  if (theme === "light" || theme === "dark") el.dataset.theme = theme;
  else delete el.dataset.theme;
}

/** 扩展自己的页面（菜单、历史）：按设置上色，设置保存后即时跟着变 */
export function syncPageTheme(): void {
  const apply = () => void loadSettings().then((s) => applyTheme(document.documentElement, s.theme));
  apply();
  chrome.storage.onChanged.addListener(apply);
}
