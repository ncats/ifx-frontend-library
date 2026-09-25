import { isPlatformBrowser } from '@angular/common';
import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  PLATFORM_ID,
  provideAppInitializer, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import {Store } from '@ngrx/store';
import {
  ResolverService,
} from 'resolver-store';
import { environment } from '../environments/environment';
import { appRoutes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration, withEventReplay,
} from '@angular/platform-browser';

export function load_resolver(
) {
  return () => {
    const resolverService= inject(ResolverService);
    resolverService._setOptionsUrl(environment.resolverOptionsUrl);
    resolverService._setResolverUrl(environment.resolverUrl);
    resolverService._setextraString(environment.extraString);
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    BrowserModule,
    provideAppInitializer(() => {
      const initializerFn = load_resolver();
      return initializerFn();
    }),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(
      appRoutes,
      withViewTransitions(),
      withComponentInputBinding(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withPreloading(PreloadAllModules),
    ),
  ],
};
