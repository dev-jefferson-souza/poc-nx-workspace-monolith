import { Injectable, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class BreadcrumbService {
  breadcrumbItems = signal<MenuItem[]>([]);
  homeItem = signal<MenuItem>({ label: 'Home', icon: 'pi pi-home mr-2', url: '/' });

  setBreadcrumbItems({ items }: { items: MenuItem[] }) {
    this.breadcrumbItems.set(items);
  }
}
