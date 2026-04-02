import { Component, computed, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@poc-nx-workspace-monolith/shared/i18n';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'shared-language-button',
  standalone: true,
  imports: [ButtonModule, TooltipModule, MenuModule, TranslateModule],
  templateUrl: './language-button.component.html',
})
export class LanguageButtonComponent {
  readonly #languageService = inject(LanguageService);
  readonly #translateService = inject(TranslateService);

  currentLanguage = computed(() => this.getCurrentLanguage());
  menuItems = computed(() => this.getMenuItems());

  constructor() {
    this.#languageService.initialize();
  }

  private getCurrentLanguage() {
    const currentLanguage = this.#languageService.currentLanguage();
    return currentLanguage === 'en' ? this.#translateService.instant('languages.english') : this.#translateService.instant('languages.portuguese');
  }

  private getMenuItems(): MenuItem[] {
    const currentLanguage = this.#languageService.currentLanguage();

    return [
      {
        label: this.#translateService.instant('languages.menu'),
        items: this.#languageService.LANGUAGES.map((item) => ({
          label: this.#translateService.instant(item.label),
          disabled: currentLanguage === item.code,
          command: () => this.#languageService.setLanguage(item.code),
        })),
      },
    ];
  }
}
