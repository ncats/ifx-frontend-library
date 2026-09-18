import { inject } from '@angular/core';
import { Filter } from 'utils-models';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { ResolverForm, ResolverResponse } from 'ifx';
import { catchError, of, exhaustMap, map, mergeMap } from 'rxjs';
import { ResolverService } from '../resolver.service';
import {
  LoadResolverOptionsActions,
  ResolveQueryActions,
} from './resolver.actions';
import * as ResolverSelectors from './resolver.selectors';

export const init$ = createEffect(
  (
    store = inject(Store),
    actions$ = inject(Actions),
    resolverService = inject(ResolverService),
  ) => {
    return actions$.pipe(
      ofType(
        LoadResolverOptionsActions.loadResolverOptions,
        LoadResolverOptionsActions.setPreviousFilters,
      ),
      concatLatestFrom(() =>
        store.select(ResolverSelectors.fetchPreviousFilters),
      ),
      mergeMap(([action, opts]) => {
        return resolverService.fetchOptions().pipe(
          map(
            (ret: { [key: string]: unknown }[]) => {
              const retArr: Filter[] = ret
                .map((opt: { [key: string]: unknown }) => {
                  const tags: string[] = opt['tags'] as string[];
                  opt['tags'] = tags.map((tag) =>
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
                })
             //   .sort((a, b) => a.term.toString().localeCompare(b.term.toString()));
              if (opts && opts.length) {
                retArr.forEach((opt: Filter) => {
                  if (opts.includes(<string>opt.value)) {
                    opt.selected = true;
                  }
                });
              }
              return LoadResolverOptionsActions.loadResolverOptionsSuccess({
                options: retArr,
              });
            },
            catchError((error: ErrorEvent) =>
              of(
                LoadResolverOptionsActions.loadResolverOptionsFailure({
                  error: error.message,
                }),
              ),
            ),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const resolveQuery = createEffect(
  (actions$ = inject(Actions), resolverService = inject(ResolverService)) => {
    return actions$.pipe(
      ofType(ResolveQueryActions.resolveQuery),
      exhaustMap((action: { urlStub: string; form: ResolverForm }) => {
        return resolverService.resolve(action.urlStub, action.form).pipe(
          map(
            (response: ResolverResponse[]) => {
              return ResolveQueryActions.resolveQuerySuccess({
                data: response,
              });
            },
            catchError((error: ErrorEvent) =>
              of(
                ResolveQueryActions.resolveQueryFailure({
                  error: error.message,
                }),
              ),
            ),
          ),
        );
      }),
    );
  },
  { functional: true },
);
