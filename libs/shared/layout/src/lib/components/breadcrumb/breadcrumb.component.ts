import { Component, computed, inject } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbService } from '../../services/breadcrumb.services';

@Component({
  selector: 'shared-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule],
  template: ` <p-breadcrumb styleClass="border-noround border-none border-y-1" [model]="translatedItems()" [home]="translatedHomeItem()" /> `,
})
export class BreadcrumbComponent {
  readonly #breadcrumbService = inject(BreadcrumbService);

  translatedItems = computed(() => this.#breadcrumbService.translatedBreadcrumbItems());
  translatedHomeItem = computed(() => this.#breadcrumbService.translatedHomeItem());
}
