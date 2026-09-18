import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  Article,
  ArticleListQueryGQL,
  ArticleQueryFactory,
  ArticleQueryGQL,
  ClinicalTrial,
  ClinicalTrialListQueryGQL,
  ClinicalTrialQueryFactory,
  ClinicalTrialQueryGQL,
} from 'rdas-models';
import { Filter, FilterCategory, FilterResponse } from 'utils-models';
import { computed, inject } from '@angular/core';
import { Params } from '@angular/router';
import { switchMap, pipe, tap, filter, map } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Actions, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';

const queryFactory = new ClinicalTrialQueryFactory();

interface ClinicalTrialQueryResponse {
  diseases: {
    allCount: number;
    clinicalTrials: ClinicalTrial[];
    filteredCount: {
      totalCount: { count: { nodes: number } };
    };
  }[];
}

type ClinicalTrialState = {
  clinicalTrialFilters?: FilterCategory;
  selectedId?: string | number; // which ClinicalTrialStore record has been selected
  isLoading: boolean; // has the ClinicalTrialStore list been loaded
  error?: string | null; // last known error (if any)
  clinicalTrial: ClinicalTrial;
  clinicalTrials: ClinicalTrial[];
  allClinicalTrialsCount: number;
  clinicalTrialsCount: number;
};

const initialState: ClinicalTrialState = {
  clinicalTrials: [],
  clinicalTrial: {} as ClinicalTrial,
  clinicalTrialFilters: { label: 'clinicalTrials' } as FilterCategory,
  isLoading: false,
  allClinicalTrialsCount: 0,
  clinicalTrialsCount: 0,
};

export const ClinicalTrialStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    clinicalTrialCounts: computed(() => {
      return {
        allClinicalTrialsCount: state.allClinicalTrialsCount(),
        currentClinicalTrialsCount: state.clinicalTrialsCount(),
      };
    }),
  })),
  withMethods(
    (
      store,
      clinicalTrialListQuery = inject(ClinicalTrialListQueryGQL),
      clinicalTrialQuery = inject(ClinicalTrialQueryGQL),
    ) => ({
      loadClinicalTrials: rxMethod<Params>(
        pipe(
          tap(() => {
            patchState(store, { isLoading: true });
          }),
          switchMap((params) => {
            const query = queryFactory.getQuery(params);
            return clinicalTrialListQuery
              .watch({ variables: query.params })
              .valueChanges.pipe(
                tapResponse({
                  next: (clinicalTrials) => {
                    if (clinicalTrials.dataState === 'complete') {
                      const data = (<unknown>(
                        clinicalTrials.data
                      )) as ClinicalTrialQueryResponse;
                      const disease = data.diseases![0];
                      const clinicalTrialsList = disease.clinicalTrials.map(
                        (clinicalTrial: Partial<ClinicalTrial>) =>
                          new ClinicalTrial(clinicalTrial),
                      );
                      patchState(store, (state) => {
                        return {
                          clinicalTrials: clinicalTrialsList,
                          isLoading: false,
                          allClinicalTrialsCount: disease.allCount,
                          clinicalTrialsCount:
                            disease.filteredCount.totalCount.count.nodes,
                        };
                      });
                    }
                  },
                  error: (err) => {
                    patchState(store, { isLoading: false });
                    console.error(err);
                  },
                }),
              );
          }),
        ),
      ),
      loadClinicalTrial: rxMethod<Params>(
        pipe(
          tap(() => {
            patchState(store, { isLoading: true });
          }),
          switchMap((params) => {
            const query = queryFactory.getQuery(params);
            return clinicalTrialQuery
              .watch({ variables: query.params })
              .valueChanges.pipe(
                tapResponse({
                  next: (clinicalTrials) => {
                    if (clinicalTrials.dataState === 'complete') {
                      const data = (<unknown>clinicalTrials.data) as {
                        clinicalTrials: ClinicalTrial[];
                      };
                      const clinicalTrial: ClinicalTrial = new ClinicalTrial(
                        data.clinicalTrials[0],
                      );
                      patchState(store, (state) => {
                        return {
                          ...state,
                          clinicalTrial: clinicalTrial,
                          isLoading: false,
                        };
                      });
                    }
                  },
                  error: (err) => {
                    patchState(store, { isLoading: false });
                    console.error(err);
                  },
                }),
              );
          }),
        ),
      ),
    }),
  ),
  withHooks({
    onInit(store, actions$ = inject(Actions)) {
      actions$
        .pipe(
          ofType(ROUTER_NAVIGATED),
          filter((r) => {
            return (
              !r.payload.routerState.url.includes('/diseases') &&
              r.payload.routerState.url.includes('/disease')
            );
          }),
          map((r) => {
            store.loadClinicalTrials(r.payload.routerState.root.queryParams);
          }),
        )
        .subscribe();
    },
  }),
);
