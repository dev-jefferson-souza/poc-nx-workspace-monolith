import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'shared-layout',
  standalone: true,
  imports: [CommonModule, HeaderComponent, RouterOutlet],
  templateUrl: './layout.component.html',
})
export class LayoutComponent {}
