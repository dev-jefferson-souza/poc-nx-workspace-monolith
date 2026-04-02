import { Component, computed, inject } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@poc-nx-workspace-monolith/shared/i18n';
import { Theme, ThemeService } from '@poc-nx-workspace-monolith/shared/states';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'shared-theme-button',
  standalone: true,
  imports: [ButtonModule, TooltipModule, MenuModule, TranslateModule],
  templateUrl: './theme-button.component.html',
})
export class ThemeButtonComponent {
  readonly #themeService = inject(ThemeService);
  readonly #languageService = inject(LanguageService);
  readonly #translateService = inject(TranslateService);

  currentIcon = computed(() => this.getCurrentIcon(this.#themeService.theme()));
  menuItems = computed(() => {
    this.#languageService.currentLanguage();

    return this.getMenuItems(this.#themeService.theme());
  });

  private getCurrentIcon(currentTheme: Theme) {
    const icons = {
      dark: 'pi pi-moon',
      light: 'pi pi-sun !text-xl',
      system: 'pi pi-palette',
    };

    return icons[currentTheme];
  }

  private getMenuItems(currentTheme: Theme): MenuItem[] {
    return [
      {
        label: this.#translateService.instant('theme.menu'),
        items: [
          {
            label: this.#translateService.instant('theme.light'),
            icon: 'pi pi-sun !text-xl',
            disabled: currentTheme === 'light',
            command: () => this.#themeService.setTheme('light'),
          },
          {
            label: this.#translateService.instant('theme.dark'),
            icon: 'pi pi-moon',
            disabled: currentTheme === 'dark',
            command: () => this.#themeService.setTheme('dark'),
          },
          {
            label: this.#translateService.instant('theme.system'),
            icon: 'pi pi-palette',
            disabled: currentTheme === 'system',
            command: () => this.#themeService.setTheme('system'),
          },
        ],
      },
    ];
  }
}
