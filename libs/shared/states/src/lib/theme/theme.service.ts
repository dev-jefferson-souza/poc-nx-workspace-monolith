import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';

export type Theme = 'light' | 'dark' | 'system';
export type ThemeInUse = Exclude<Theme, 'system'>;

const LOCAL_STORAGE_COLOR_SCHEME = 'SMART_THEME';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly #document = inject(DOCUMENT);
  readonly #themeSignal = signal(this.getInitialTheme());

  constructor() {
    this.setTheme(this.#themeSignal());
    this.listenBrowserThemeChanges();
  }

  get theme() {
    return this.#themeSignal.asReadonly();
  }

  get themeInUse(): ThemeInUse {
    if (this.#themeSignal() === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    return this.#themeSignal() as ThemeInUse;
  }

  setTheme(theme: Theme) {
    this.#themeSignal.set(theme);
    this.setDOMTheme(this.themeInUse);
    localStorage.setItem(LOCAL_STORAGE_COLOR_SCHEME, theme);
  }

  private setDOMTheme(theme: ThemeInUse) {
    const themeLink = this.#document.getElementById('smart-theme') as HTMLLinkElement;

    if (theme === 'dark') {
      themeLink.href = themeLink.href.replace('light', 'dark');
    } else {
      themeLink.href = themeLink.href.replace('dark', 'light');
    }
  }

  private getInitialTheme(): Theme {
    const stored = localStorage.getItem(LOCAL_STORAGE_COLOR_SCHEME) as Theme;
    const availableThemes: Theme[] = ['light', 'dark', 'system'];

    if (availableThemes.includes(stored)) {
      return stored;
    }

    return 'system';
  }

  private listenBrowserThemeChanges() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.#themeSignal() === 'system') {
        this.setDOMTheme(this.themeInUse);
      }
    });
  }
}
