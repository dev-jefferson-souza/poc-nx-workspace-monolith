import { Component, inject } from '@angular/core';
import { ThemeService } from '@poc-nx-workspace-monolith/shared/states';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { ThemeButtonComponent } from '../theme-button/theme-button.component';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [ButtonModule, TooltipModule, ThemeButtonComponent],
})
export class HeaderComponent {
  readonly themeService: ThemeService = inject(ThemeService);
}
