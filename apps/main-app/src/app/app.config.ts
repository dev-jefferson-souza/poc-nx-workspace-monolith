import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { LanguageService, provideLanguageInitialize, providerHttpTranslate } from '@poc-nx-workspace-monolith/shared/i18n';
import { appRoutes } from './app.routes';

const initializeLanguage = (languageService: LanguageService) => () => languageService.initialize();

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes), provideAnimations(), provideHttpClient(), providerHttpTranslate(), provideLanguageInitialize()],
};
