import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Gene, GeneQueryFactory } from 'rdas-models';
import { Filter, FilterCategory } from 'utils-models';
import { inject } from '@angular/core';
import { GeneFiltersGQL } from 'rdas-models';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, pipe, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

const queryFactory = new GeneQueryFactory();

type GeneState = {
  genes: Gene[];
  geneFilters: FilterCategory | undefined;
  isLoading: boolean;
  page: number;
};

const initialState: GeneState = {
  genes: [],
  geneFilters: undefined,
  isLoading: false,
  page: 0,
};

export const GeneStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  // withComputed(({}) => ({})),
  withMethods((store, geneFiltersQuery = inject(GeneFiltersGQL)) => ({
    loadGeneFilters: rxMethod<Params>(
      pipe(
        tap(() => {
          patchState(store, { isLoading: true });
        }),
        switchMap((params) => {
          const query = queryFactory.getQuery(params);
          return geneFiltersQuery
            .watch({ variables: query.params })
            .valueChanges.pipe(
              tapResponse({
                next: (geneFilters) => {
                  if (geneFilters.dataState === 'complete') {
                    let geneFilterCategory: FilterCategory | undefined =
                      undefined;
                    const data: { allFilters: Filter[] } = (<unknown>(
                      geneFilters.data
                    )) as {
                      allFilters: Filter[];
                    };
                    if (data) {
                      let filterArr: Filter[] = [];
                      data.allFilters.forEach((filter) =>
                        filterArr.push(new Filter(filter)),
                      );
                      if (params['genes']) {
                        const genesArr: string[] = params['genes'].split('&');
                        filterArr = filterArr.map((filter) => {
                          filter.selected = genesArr.includes(
                            <string>filter.term,
                          );
                          return filter;
                        });
                      }
                      geneFilterCategory = new FilterCategory({
                        label: 'genes',
                        values: filterArr.sort(
                          (a, b) => Number(b.selected) - Number(a.selected),
                        ),
                        query: params['term'],
                        page: params['skip'] / params['limit'] || 0,
                      });
                      patchState(store, (state) => {
                        let oldValues: Filter[] = [] as Filter[];
                        if (state.geneFilters?.values && !params['term']) {
                          oldValues = state.geneFilters?.values as Filter[];
                        }
                        const newValues: Filter[] = oldValues.concat(
                          geneFilterCategory!.values,
                        );
                        geneFilterCategory!.values = newValues;
                        return {
                          geneFilters: geneFilterCategory,
                          isLoading: false,
                          page: 0,
                        };
                      });
                    }
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
  })),
  withHooks({
    onInit(store, route = inject(ActivatedRoute)) {
      store.loadGeneFilters(route.snapshot.queryParams);
    },
  }),
);
