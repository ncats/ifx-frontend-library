import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Phenotype, PhenotypeQueryFactory } from 'rdas-models';
import { Filter, FilterCategory, FilterResponse } from 'utils-models';
import { inject } from '@angular/core';
import { PhenotypeFiltersGQL } from 'rdas-models';
import { ActivatedRoute, Params } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap, pipe, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

const queryFactory = new PhenotypeQueryFactory();

type PhenotypeState = {
  phenotypes: Phenotype[];
  phenotypeFilters: FilterCategory;
  isLoading: boolean;
  page: number;
};

const initialState: PhenotypeState = {
  phenotypes: [],
  phenotypeFilters: { label: 'genes' } as FilterCategory,
  isLoading: false,
  page: 0,
};

export const PhenotypeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  // withComputed(({}) => ({})),
  withMethods((store, phenotypeFiltersQuery = inject(PhenotypeFiltersGQL)) => ({
    loadPhenotypeFilters: rxMethod<Params>(
      pipe(
        tap(() => {
          patchState(store, { isLoading: true });
        }),
        switchMap((params) => {
          const query = queryFactory.getQuery(params);
          return phenotypeFiltersQuery
            .watch({ variables: query.params })
            .valueChanges.pipe(
              tapResponse({
                next: (phenotypeFilters) => {
                  if (phenotypeFilters.dataState === 'complete') {
                    let phenotypeFilterCategory: FilterCategory | undefined =
                      undefined;
                    const data: { allFilters: Filter[] } = (<unknown>(
                      phenotypeFilters.data
                    )) as {
                      allFilters: Filter[];
                    };
                    if (data) {
                      let filterArr: Filter[] = [];
                      data.allFilters.forEach((filter) =>
                        filterArr.push(new Filter(filter)),
                      );
                      if (params['phenotypes']) {
                        const phenotypesArr: string[] =
                          params['phenotypes'].split('&');
                        filterArr = filterArr.map((filter) => {
                          filter.selected = phenotypesArr.includes(
                            <string>filter.term,
                          );
                          return filter;
                        });
                      }
                      phenotypeFilterCategory = new FilterCategory({
                        label: 'phenotypes',
                        values: filterArr.sort(
                          (a, b) => Number(b.selected) - Number(a.selected),
                        ),
                        query: params['term'],
                        page: params['skip'] / params['limit'] || 0,
                      });

                      patchState(store, (state) => {
                        let oldValues: Filter[] = [] as Filter[];
                        if (state.phenotypeFilters?.values && !params['term']) {
                          oldValues = state.phenotypeFilters
                            ?.values as Filter[];
                        }
                        const newValues: Filter[] = oldValues.concat(
                          phenotypeFilterCategory!.values,
                        );
                        phenotypeFilterCategory!.values = newValues;
                        return {
                          phenotypeFilters: phenotypeFilterCategory,
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
      store.loadPhenotypeFilters(route.snapshot.queryParams);
    },
  }),
);
