import { Route } from '@angular/router';
import * as Resolvers from './app.resolvers';

export const appRoutes: Route[] = [
  {
    path: '',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    loadComponent: () => import('rdas-home').then((m) => m.RdasHomeComponent),
  },
  {
    path: 'diseases',
    pathMatch: 'full',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      allStaticFilters: Resolvers.allStaticDiseaseFiltersResolver,
      diseases: Resolvers.diseaseListResolver,
    },
    loadComponent: () =>
      import('rdas-browse').then((m) => m.RdasBrowseComponent),
  },
  {
    path: 'disease',
    pathMatch: 'full',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      staticFilters: Resolvers.staticDiseaseFiltersResolver,
      dynamicFilters: Resolvers.dynamicDiseaseFiltersResolver,
      disease: Resolvers.diseaseResolver,
    },
    loadComponent: () =>
      import('rdas-disease-page').then((m) => m.RdasDiseasePageComponent),
  },
  {
    path: 'about',
    pathMatch: 'full',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    loadComponent: () =>
      import('rdas-about').then((m) => m.FeaturesRdasRdasAboutComponent),
  },
  {
    path: 'privacy',
    pathMatch: 'full',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    title: 'RDAS: Privacy Policy',
    loadComponent: () => import('ifx-privacy-page').then((m) => m.PrivacyPage),
    data: {
      appFullTitle: 'Rare Disease Alert System',
      appAcronym: 'RDAS',
      collectsPii: true,
      accountRegistration: true,
      contactEmail: 'ncatsrdas@mail.nih.gov',
    },
  },
  {
    path: 'subscriptions',
    pathMatch: 'full',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      diseases: Resolvers.diseaseSubscriptionResolver,
    },
    loadComponent: () =>
      import('rdas-subscriptions').then((m) => m.RdasSubscriptionsComponent),
  },
  {
    path: 'article',
    pathMatch: 'full',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      article: Resolvers.articleResolver,
    },
    loadComponent: () =>
      import('article-page').then((m) => m.ArticlePageComponent),
  },
  {
    path: 'project',
    pathMatch: 'full',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      project: Resolvers.projectResolver,
    },
    loadComponent: () =>
      import('project-page').then((m) => m.ProjectPageComponent),
  },
  {
    path: 'trial',
    pathMatch: 'full',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      clinicalTrial: Resolvers.clinicalTrialResolver,
    },
    loadComponent: () => import('trial-page').then((m) => m.TrialPageComponent),
  },
  {
    path: 'apis/diseases',
    pathMatch: 'full',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    loadComponent: () =>
      import('graphql-sandbox').then((m) => m.GraphqlSandboxComponent),
  },
  {
    path: 'apis/epi',
    pathMatch: 'full',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    loadComponent: () => import('epi-api').then((m) => m.EpiApiComponent),
  },
  {
    path: 'apis/history',
    pathMatch: 'full',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    loadComponent: () =>
      import('history-api').then((m) => m.HistoryApiComponent),
  },
  /*  {
    path: 'apis/abstract-abstraction',
    pathMatch: 'full',
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    loadComponent: () =>
      import('abstract-extraction-api').then((m) => m.AbstractExtractionApi),
  },*/
  { path: '**', redirectTo: '' },
];
