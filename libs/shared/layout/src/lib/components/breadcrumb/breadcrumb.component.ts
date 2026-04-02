import { Component, inject } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BreadcrumbService } from '../../services/breadcrumb.services';

@Component({
  selector: 'shared-breadcrumb',
  standalone: true,
  imports: [BreadcrumbModule],
  template: ` <p-breadcrumb styleClass="border-noround border-none border-y-1" [model]="items()" [home]="homeItem()" /> `,
})
export class BreadcrumbComponent {
  readonly #breadcrumbService = inject(BreadcrumbService);

  items = this.#breadcrumbService.breadcrumbItems;
  homeItem = this.#breadcrumbService.homeItem;
}
