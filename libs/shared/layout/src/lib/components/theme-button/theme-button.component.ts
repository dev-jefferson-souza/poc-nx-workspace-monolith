import { Component, computed, inject } from '@angular/core';
import { Theme, ThemeService } from '@poc-nx-workspace-monolith/shared/states';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'shared-theme-button',
  standalone: true,
  imports: [ButtonModule, TooltipModule, MenuModule],
  templateUrl: './theme-button.component.html',
})
export class ThemeButtonComponent {
  readonly #themeService = inject(ThemeService);

  currentIcon = computed(() => this.getCurrentIcon(this.#themeService.theme()));
  menuItems = computed(() => this.getMenuItems(this.#themeService.theme()));

  private getCurrentIcon(currentTheme: Theme) {
    const icons = {
      dark: 'pi pi-moon',
      light: 'pi pi-sun !text-xl',
      system: 'pi pi-palette',
    };

    return icons[currentTheme];
  }

  private getMenuItems(currentTheme: Theme) {
    return [
      {
        label: 'Tema',
        items: [
          {
            label: 'Claro',
            icon: 'pi pi-sun !text-xl',
            disabled: currentTheme === 'light',
            command: () => this.#themeService.setTheme('light'),
          },
          {
            label: 'Escuro',
            icon: 'pi pi-moon',
            disabled: currentTheme === 'dark',
            command: () => this.#themeService.setTheme('dark'),
          },
          {
            label: 'Sistema',
            icon: 'pi pi-palette',
            disabled: currentTheme === 'system',
            command: () => this.#themeService.setTheme('system'),
          },
        ],
      },
    ];
  }
}
