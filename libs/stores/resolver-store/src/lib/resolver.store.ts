import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import {
  Project,
  CoreProjectListQueryGQL,
  ProjectQueryFactory,
  CoreProjectQueryGQL,
  CoreProject,
} from 'rdas-models';
import { Filter, FilterCategory, FilterResponse } from 'utils-models';
import { computed, inject } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { switchMap, pipe, tap, filter, map } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ResolverService } from './resolver.service';
import { ResolverForm, ResolverOption, ResolverResponse } from 'ifx';


type ResolverState = {
  isLoading: boolean; // has the Resolver list been loaded
  error?: string | null; // last known error (if any)
  options: Filter[];
  filteredOptionCategories: FilterCategory[];
  selectedOptions: FilterCategory[];
  selectedOptionsList: Filter[];
  previousOptions?: string[];
  data: ResolverResponse[]
};

const initialState: ResolverState = {
  isLoading: false,
  options: [],
  filteredOptionCategories: [],
  selectedOptions: [],
  selectedOptionsList: [],
  data: []
};

export const ResolverStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, resolverService = inject(ResolverService)) => ({
    setPreviousOptions: rxMethod<void>(
      pipe(
        tap(() => {
          patchState(store, { isLoading: true });
        }),
      ),
    ),
    setSelectedOptions: rxMethod<Filter[]>(
      pipe(
        map((filters) => {
          patchState(store, (state) => {
            return {
              selectedOptions: _mapFilterCategoriesFromArray(filters),
              selectedOptionsList: filters,
            };
          });
        }),
      ),
    ),
    filterOptions: rxMethod<string>(
      pipe(
        map((term) => {
          const retArr = store
            .options()
            .filter((val) =>
              val.term
                .toString()
                .toLowerCase()
                .includes(term.toString().toLowerCase()),
            );
          patchState(store, (state) => {
            return {
              filteredOptionCategories: _mapFilterCategoriesFromArray(retArr),
            };
          });
        }),
      ),
    ),
    loadResolverOptions: rxMethod<ParamMap>(
      pipe(
        tap(() => {
          patchState(store, { isLoading: true });
        }),
        switchMap((params) => {
          return resolverService.fetchOptions().pipe(
            tapResponse({
              next: (options: ResolverOption[]) => {
                const selectedFilters: Filter[] = [];
                const retArr: Filter[] = options.map((opt) => {
                  opt.tags = opt.tags.map((tag) =>
                    tag
                      .replace('category', '')
                      .replace(/-/g, ' ')
                      .replace('URL', ' URL')
                      .trim(),
                  );
                  return new Filter({
                    ...opt,
                    value: <string>opt['name'],
                    term: <string>opt['title'],
                  });
                });
                if(params && params.has('options')) {
                  const filters = <string>params.get('options')
                  const filtersArr= filters.split(';');
                  filtersArr.forEach((filter) => {
                   retArr.forEach((fil) => {
                     if(fil.value === filter){
                       fil.selected = true;
                       selectedFilters.push(fil);
                     }
                   })
                  })
                }
                patchState(store, (state) => {
                  return {
                    options: retArr,
                    filteredOptionCategories:
                      _mapFilterCategoriesFromArray(retArr),
                    selectedOptions:
                      _mapFilterCategoriesFromArray(selectedFilters),
                    selectedOptionsList: selectedFilters,
                    isLoading: false,
                  };
                });
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
    resolveQuery: rxMethod<{ urlStub: string; form: ResolverForm }>(
      pipe(
        tap(() => {
          patchState(store, { isLoading: true });
        }),
        switchMap((params) => {
          return resolverService.resolve(params.urlStub, params.form).pipe(
            tapResponse({
              next: (data) => {
                patchState(store, (state) => {
                  return {
                    data: data,
                    isLoading: false
                  };
                });
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
      store.loadResolverOptions(route.snapshot.queryParamMap);
    },
  }),
);


function _mapFilterCategoriesFromArray(
  filterArr: Filter[] | undefined,
): FilterCategory[] {
  if (filterArr && filterArr.length) {
    const retMap: Map<string, FilterCategory> = new Map<
      string,
      FilterCategory
    >();
    filterArr.forEach((opt: Filter) => {
      if (opt.tags) {
        opt.tags.forEach((tag: string) => {
          const parentArr: FilterCategory | undefined = retMap.get(tag);
          if (parentArr) {
            parentArr.values.push(opt);
            retMap.set(tag, parentArr);
          } else {
            retMap.set(
              tag,
              new FilterCategory({ parent: tag, values: [opt] }),
            );
          }
        });
      }
    });
    return Array.from(retMap.values());
  } else return [];
}
