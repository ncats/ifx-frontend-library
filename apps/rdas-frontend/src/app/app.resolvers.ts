import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { inject } from '@angular/core';
import { GeneStore } from 'gene-store';
import { PhenotypeStore } from 'phenotype-store';
import { ArticleStore } from 'article-store';
import { ProjectStore } from 'project-store';
import { ClinicalTrialStore } from 'trial-store';
import { DiseaseStore } from 'disease-store';
import { UserStore } from 'user-store';

export const geneFilterResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  router: RouterStateSnapshot,
) => {
  const geneStore = inject(GeneStore);
  const params = route.queryParams;
  return geneStore.loadGeneFilters(params);
};
export const phenotypeFilterResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
  router: RouterStateSnapshot,
) => {
  const phenotypeStore = inject(PhenotypeStore);
  const params = route.queryParams;
  return phenotypeStore.loadPhenotypeFilters(params);
};

export const articleResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
) => {
  const articleStore = inject(ArticleStore);
  return articleStore.loadArticle(route.queryParams);
};

export const projectResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
) => {
  const projectStore = inject(ProjectStore);
  return projectStore.loadProject(route.queryParams);
};

export const clinicalTrialResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
) => {
  const clinicalTrialStore = inject(ClinicalTrialStore);
  return clinicalTrialStore.loadClinicalTrial(route.queryParams);
};

export const allStaticDiseaseFiltersResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
) => {
  const allStaticDiseaseFiltersStore = inject(DiseaseStore);
  return allStaticDiseaseFiltersStore.loadAllDiseaseFilters();
};

export const staticDiseaseFiltersResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
) => {
  const staticDiseaseFiltersStore = inject(DiseaseStore);
  return staticDiseaseFiltersStore.loadStaticDiseaseFilters(route.queryParams);
};

export const dynamicDiseaseFiltersResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
) => {
  const diseaseFiltersStore = inject(DiseaseStore);
  return diseaseFiltersStore.loadDynamicDiseaseFilters(route.queryParams);
};

export const diseaseResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
) => {
  const diseaseStore = inject(DiseaseStore);
  return diseaseStore.loadDisease(route.queryParams);
};

export const diseaseListResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
) => {
  const diseaseStore = inject(DiseaseStore);
  return diseaseStore.loadDiseaseList(route.queryParams);
};

export const diseaseSubscriptionResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot,
) => {
  const userStore = inject(UserStore);
  const diseaseStore = inject(DiseaseStore);
  const subscriptions: string[] = userStore
    .subscriptions()
    ?.map((sub) => sub['gardId']) as string[];
  return diseaseStore.loadDiseaseList({ gardIds: subscriptions });
};
