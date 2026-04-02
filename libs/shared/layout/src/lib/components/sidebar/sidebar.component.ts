import { MenuItem } from 'primeng/api';
import { Component, computed, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '@poc-nx-workspace-monolith/shared/i18n';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { RouterLink } from '@angular/router';

type SidebarItem = {
  id: string;
  icon: string;
  tooltipKey: string;
  routerLink: string;
};

@Component({
  selector: 'shared-sidebar',
  standalone: true,
  imports: [RouterLink, ButtonModule, TooltipModule, TranslateModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  readonly #languageService = inject(LanguageService);

  readonly sidebarItems = computed(() => {
    this.#languageService.currentLanguage();

    const items: MenuItem[] = [
      { id: 'home', icon: 'pi pi-home', tooltip: 'sidebar.mainApp', routerLink: '/' },
      { id: 'users-dev', icon: 'pi pi-users', tooltip: 'sidebar.usersDev', routerLink: '/users' },
    ];

    return items;
  });
}
