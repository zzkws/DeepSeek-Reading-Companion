import { loadSettings } from "./settings";
import type { Settings } from "./types";

/**
 * 把主题设置落到元素上。
 *
 * 样式里的颜色都写成 light-dark(浅色, 深色)。没有 data-theme 时是浅色，与默认设置一致，
 * 脚本读到设置之前页面不会闪；data-theme 为 system / dark 时样式改成跟随系统 / 深色。
 */
export function applyTheme(el: HTMLElement, theme: Settings["theme"]): void {
  el.dataset.theme = theme;
}

/** 扩展自己的页面（菜单、历史）：按设置上色，设置保存后即时跟着变 */
export function syncPageTheme(): void {
  const apply = () => void loadSettings().then((s) => applyTheme(document.documentElement, s.theme));
  apply();
  chrome.storage.onChanged.addListener(apply);
}
