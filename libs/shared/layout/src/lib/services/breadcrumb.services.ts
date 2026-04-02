import { computed, inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from '@poc-nx-workspace-monolith/shared/i18n';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  readonly #t = inject(TranslateService);
  readonly #languageService = inject(LanguageService);

  breadcrumbItems = signal<MenuItem[]>([]);
  homeItem = signal<MenuItem>({ label: 'header.breadcrumb.home', icon: 'pi pi-home mr-2', routerLink: '/' });

  translatedBreadcrumbItems = computed(() => {
    this.#languageService.currentLanguage();

    return this.translateItems(this.breadcrumbItems());
  });

  translatedHomeItem = computed(() => {
    this.#languageService.currentLanguage();

    return this.translateItem(this.homeItem());
  });

  setBreadcrumbItems({ items }: { items: MenuItem[] }) {
    this.breadcrumbItems.set(items);
  }

  private translateItems(items: MenuItem[]): MenuItem[] {
    return items.map((item) => this.translateItem(item));
  }

  private translateItem(item: MenuItem): MenuItem {
    return {
      ...item,
      label: item.label ? this.#t.instant(item.label) : item.label,
      items: item.items ? this.translateItems(item.items) : item.items,
    };
  }
}
