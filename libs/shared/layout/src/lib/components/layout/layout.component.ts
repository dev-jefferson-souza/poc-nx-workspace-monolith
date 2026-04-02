import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'shared-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, BreadcrumbComponent, SidebarComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {}
