import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'shared-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, BreadcrumbComponent],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {}
