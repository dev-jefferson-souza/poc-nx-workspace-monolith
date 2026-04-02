import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { LanguageButtonComponent } from '../language-button/language-button.component';
import { ThemeButtonComponent } from '../theme-button/theme-button.component';

@Component({
  selector: 'shared-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterLink, ThemeButtonComponent, LanguageButtonComponent, TranslateModule],
})
export class HeaderComponent {}
