import { Disease, DiseaseNode } from 'rdas-models';
import { FilterCategory, Page } from 'utils-models';
import {
  createAction,
  createActionGroup,
  emptyProps,
  props,
} from '@ngrx/store';

export const init = createAction('[Diseases Page] Init');

export const BrowseDiseaseListActions = createActionGroup({
  source: 'Browse Disease List',
  events: {
    setLoading: emptyProps(),
    fetchDiseaseList: props<{ top: number; skip: number }>(),
    setDisease: props<{ disease: Disease }>(),
    fetchDiseaseListSuccess: props<{ diseases: Disease[]; page?: Page }>(),
    fetchDiseaseListFailure: props<{ error: string }>(),
    fetchDiseaseTree: props<{ gardId: string }>(),
    fetchDiseaseTreeSuccess: props<{ diseases: DiseaseNode[] }>(),
    fetchDiseaseTreeFailure: props<{ error: string }>(),
    fetchAllDiseaseFilters: emptyProps(),
    fetchAllDiseaseFiltersSuccess: props<{ filters: FilterCategory[] }>(),
    fetchAllDiseaseFiltersFailure: props<{ error: string }>(),
  },
});

export const SearchDiseasesActions = createActionGroup({
  source: 'Search Diseases',
  events: {
    searchDiseases: props<{ term: string }>(),
    searchDiseasesSuccess: props<{ typeahead: Disease[] }>(),
    searchDiseasesFailure: props<{ error: string }>(),
    clearTypeahead: emptyProps(),
  },
});

export const FetchDiseaseActions = createActionGroup({
  source: 'Fetch Disease',
  events: {
    fetchDisease: props<{
      gardId: string;
      source: string;
      options?: { [key: string]: string };
    }>(),
    fetchDiseaseSuccess: props<{ disease: Disease }>(),
    fetchDiseaseFailure: props<{ error: string }>(),
    fetchDiseaseFilters: props<{ gardId: string }>(),
    fetchDiseaseFiltersSuccess: props<{ filters: FilterCategory[] }>(),
    fetchDiseaseFiltersFailure: props<{ error: string }>(),
    fetchStaticDiseaseFilters: props<{ gardId: string }>(),
    fetchStaticDiseaseFiltersSuccess: props<{ filters: FilterCategory[] }>(),
    fetchStaticDiseaseFiltersFailure: props<{ error: string }>(),
    clearStaticDiseaseFilters: emptyProps(),
    clearDisease: emptyProps(),
  },
});

export const FetchDiseaseListActions = createActionGroup({
  source: 'Fetch Disease List',
  events: {
    fetchDiseaseList: props<{ gardIds: string[] }>(),
    fetchDiseaseListSuccess: props<{ diseases: Disease[] }>(),
    fetchDiseaseListFailure: props<{ error: string }>(),
  },
});
