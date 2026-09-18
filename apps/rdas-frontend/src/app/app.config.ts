import {
  provideHttpClient,
  withFetch,
  withInterceptorsFromDi,
} from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideRouter,
  PreloadAllModules,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import { appRoutes } from './app.routes';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { UserStore } from 'user-store';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client';
import { provideStore } from '@ngrx/store';

export function rdasInit(userStore = inject(UserStore)) {
  const app = initializeApp(environment.firebase);
  userStore.setUrl(environment.baseUrl);
  return () => {
    userStore.fetchUserFromLocalStorage();
  };
}
export const appConfig: ApplicationConfig = {
  providers: [
    BrowserModule,
    provideAppInitializer(() => {
      const initializerFn = rdasInit();
      return initializerFn();
    }),
    provideHttpClient(withInterceptorsFromDi(), withFetch()),
    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      appRoutes,
      withComponentInputBinding(),
      withViewTransitions(),
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withPreloading(PreloadAllModules),
    ),
    provideZonelessChangeDetection(),
    provideStoreDevtools(),
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideApollo(() => {
      const httpLink = inject(HttpLink);
      return {
        ssrMode: true,
        cache: new InMemoryCache(),
        link: httpLink.create({
          uri: environment.baseUrl + '/api/diseases',
        }),
      };
    }),
  ],
};
