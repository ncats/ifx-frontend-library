import {
  patchState,
  signalStore,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  Disease,
  DiseaseDynamicFiltersQueryGQL,
  DiseaseListQueryGQL,
  DiseaseQueryFactory,
  DiseaseQueryGQL,
  DiseaseStaticFiltersQueryGQL,
  DiseasesTypeaheadGQL,
  FieldCountsGQL,
} from 'rdas-models';
import {
  _parseFilters,
  Filter,
  FilterCategory,
  Page,
} from 'utils-models';
import { inject } from '@angular/core';
import { Params } from '@angular/router';
import { switchMap, pipe, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

const queryFactory = new DiseaseQueryFactory();

class DiseaseFilterResponse {
  [key: string]: Filter[];
}

type DiseaseState = {
  allStaticFilters: FilterCategory[];
  staticDiseaseFilters: FilterCategory[];
  dynamicDiseaseFilters: FilterCategory[];
  disease: Disease;
  diseases: Disease[];
  typeahead: Disease[];
  page: Page;
  isLoading: boolean; // has the DiseaseStore list been loaded
  error?: string | null; // last known error (if any)
};

const initialState: DiseaseState = {
  allStaticFilters: [{ label: 'diseases' } as FilterCategory],
  staticDiseaseFilters: [{ label: 'diseases' } as FilterCategory],
  dynamicDiseaseFilters: [{ label: 'diseases' } as FilterCategory],
  disease: {} as Disease,
  diseases: [] as Disease[],
  typeahead: [] as Disease[],
  page: {} as Page,
  isLoading: false,
};

export const DiseaseStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  // withComputed((state) => ({})),
  withMethods(
    (
      store,
      diseaseQuery = inject(DiseaseQueryGQL),
      diseaseListQuery = inject(DiseaseListQueryGQL),
      staticFiltersQuery = inject(DiseaseStaticFiltersQueryGQL),
      dynamicFiltersQuery = inject(DiseaseDynamicFiltersQueryGQL),
      allStaticFiltersQuery = inject(FieldCountsGQL),
      diseaseTypeaheadQuery = inject(DiseasesTypeaheadGQL),
    ) => ({
      loadDisease: rxMethod<Params>(
        pipe(
          tap(() => {
            patchState(store, {
              disease: {} as Disease,
              isLoading: true,
            });
          }),
          switchMap((params) => {
            const query = queryFactory.getQuery(params);
            return diseaseQuery
              .watch({
                variables: query.params,
              })
              .valueChanges.pipe(
                tapResponse({
                  next: (res) => {
                    if (res.dataState === 'complete') {
                      const data: {
                        diseases: Disease[];
                      } = (<unknown>res.data) as {
                        diseases: Disease[];
                      };
                      const diseaseArr: Disease[] = data.diseases.map(
                        (obj: Partial<Disease>) => new Disease(obj),
                      );

                      patchState(store, (state) => {
                        return {
                          disease: diseaseArr[0],
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

      loadDiseaseList: rxMethod<Params>(
        pipe(
          tap(() => {
            patchState(store, { isLoading: true });
          }),
          switchMap((params) => {
            const query = queryFactory.getQuery(params);
            return diseaseListQuery
              .watch({
                variables: query.params,
              })
              .valueChanges.pipe(
                tapResponse({
                  next: (res) => {
                    if (res.dataState === 'complete') {
                      const data: {
                        diseases: Disease[];
                        total: { count: number } | number;
                      } = (<unknown>res.data) as {
                        diseases: Disease[];
                        total: { count: number } | number;
                      };
                      const diseaseArr: Disease[] = data.diseases.map(
                        (obj: Partial<Disease>) => new Disease(obj),
                      );
                      patchState(store, () => {
                        return {
                          diseases: diseaseArr,
                          page: _makePage(params, data.total),
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

      diseaseTypeaheadList: rxMethod<{ term: string }>(
        pipe(
          switchMap((action: { term: string }) => {
            return diseaseTypeaheadQuery
              .watch({
                variables: {
                  searchString: action.term, //.split(' ').join('~ AND ') + '*',
                  limit: 10,
                },
              })
              .valueChanges.pipe(
                tapResponse({
                  next: (res) => {
                    if (res.dataState === 'complete') {
                      const data: {
                        diseaseSearch: Disease[];
                      } = (<unknown>res.data) as {
                        diseaseSearch: Disease[];
                      };
                      const diseaseArr: Disease[] =
                        data.diseaseSearch as Disease[];
                      patchState(store, () => {
                        return {
                          typeahead: diseaseArr,
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
      loadStaticDiseaseFilters: rxMethod<Params>(
        pipe(
          tap(() => {
            patchState(store, { isLoading: true });
          }),
          switchMap((params) => {
            const query = queryFactory.getStaticFilterQuery(params);
            return staticFiltersQuery
              .watch({
                variables: query.params,
              })
              .valueChanges.pipe(
                tapResponse({
                  next: (res) => {
                    if (res.dataState === 'complete') {
                      const data: {
                        diseases: Disease[];
                      } = (<unknown>res.data) as {
                        diseases: Disease[];
                      };
                      const diseaseArr: Disease[] = data.diseases.map(
                        (obj: Partial<Disease>) => new Disease(obj),
                      );
                      const filters = _parseFilters(
                        diseaseArr[0].filterCounts as DiseaseFilterResponse,
                      );
                      patchState(store, (state) => {
                        return {
                          staticDiseaseFilters: filters,
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
      loadDynamicDiseaseFilters: rxMethod<Params>(
        pipe(
          tap(() => {
            patchState(store, { isLoading: true });
          }),
          switchMap((params) => {
            const query = queryFactory.getDynamicFilterQuery(params);
            return dynamicFiltersQuery
              .watch({
                variables: query.params,
              })
              .valueChanges.pipe(
                tapResponse({
                  next: (res) => {
                    if (res.dataState === 'complete') {
                      const data = (<unknown>res.data) as DiseaseFilterResponse;
                      const filters = _parseFilters(data);
                      patchState(store, () => {
                        return {
                          dynamicDiseaseFilters: filters,
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
      loadAllDiseaseFilters: rxMethod<void>(
        pipe(
          tap(() => {
            patchState(store, { isLoading: true });
          }),
          switchMap(() => {
            return allStaticFiltersQuery.watch().valueChanges.pipe(
              tapResponse({
                next: (res) => {
                  if (res.dataState === 'complete') {
                    const data: {
                      fieldCounts: [{ fieldCounts: DiseaseFilterResponse }];
                    } = (<unknown>res.data) as {
                      fieldCounts: [{ fieldCounts: DiseaseFilterResponse }];
                    };
                    const filters = _parseFilters(
                      data.fieldCounts[0].fieldCounts as DiseaseFilterResponse,
                    );

                    patchState(store, (state) => {
                      return {
                        ...state,
                        allStaticFilters: filters,
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

  /*  withHooks({
   // onInit(store, actions$ = inject(Actions)) {},}),
*/
);

function _makePage(params: Params, total: { count: number } | number) {
  const pageSize: number = params['pageSize']
    ? (params['pageSize'] as number)
    : 10;
  const pageIndex: number = params['pageIndex'] ? params['pageIndex'] - 1 : 0;
  const page: Page = {
    pageSize: pageSize,
    pageIndex: pageIndex,
    total: typeof total !== 'number' ? total.count : total,
  };
  return page;
}
