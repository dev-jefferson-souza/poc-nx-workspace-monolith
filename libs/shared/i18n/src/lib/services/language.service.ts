import { isPlatformBrowser } from '@angular/common';
import { APP_INITIALIZER, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  readonly defaultLang = 'en';

  readonly #translateService = inject(TranslateService);
  readonly #platformId = inject(PLATFORM_ID);
  readonly #currentLanguage = signal(this.defaultLang);
  #initialized = false;

  readonly LANGUAGES = [
    { label: 'languages.english', code: 'en' },
    { label: 'languages.portuguese', code: 'pt' },
  ] as const;

  get currentLanguage() {
    return this.#currentLanguage.asReadonly();
  }

  getLanguage(): string {
    const browserLang = this.#translateService.getBrowserLang()?.toLowerCase();
    const normalizedBrowserLang = browserLang?.split('-')[0];
    const localStorageLang = this.getFromStorage('lang');

    if (localStorageLang && this.isSupportedLanguage(localStorageLang)) {
      return localStorageLang;
    }

    if (normalizedBrowserLang && this.isSupportedLanguage(normalizedBrowserLang)) {
      return normalizedBrowserLang;
    }

    return this.defaultLang;
  }

  setLanguage(language: string): void {
    const selectedLanguage = this.isSupportedLanguage(language) ? language : this.defaultLang;
    this.setInStorage('lang', selectedLanguage);

    void firstValueFrom(this.#translateService.use(selectedLanguage)).then(() => {
      this.#currentLanguage.set(selectedLanguage);
    });
  }

  async initialize(): Promise<void> {
    if (this.#initialized) {
      return Promise.resolve();
    }

    const lang = this.getLanguage();
    this.#translateService.setFallbackLang(this.defaultLang);
    await firstValueFrom(this.#translateService.use(lang));
    this.#currentLanguage.set(lang);
    this.#initialized = true;
  }

  private getFromStorage(key: string): string | null {
    if (!isPlatformBrowser(this.#platformId)) {
      return null;
    }

    return localStorage.getItem(key);
  }

  private setInStorage(key: string, value: string) {
    if (!isPlatformBrowser(this.#platformId)) {
      return;
    }

    localStorage.setItem(key, value);
  }

  private isSupportedLanguage(language: string): boolean {
    return this.LANGUAGES.some((item) => item.code === language);
  }
}

export function providerHttpTranslate() {
  return provideTranslateService({
    loader: provideTranslateHttpLoader({ prefix: '/assets/i18n/', suffix: '.json' }),
    fallbackLang: 'en',
    lang: 'en',
  });
}

export function provideLanguageInitialize() {
  const initializeLanguage = (languageService: LanguageService) => () => languageService.initialize();

  return {
    provide: APP_INITIALIZER,
    useFactory: initializeLanguage,
    deps: [LanguageService],
    multi: true,
  };
}
