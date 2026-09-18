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
} from 'rdas-models';
import { Filter, FilterCategory, FilterResponse } from 'utils-models';
import { computed, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  pipe,
  tap,
  filter,
  map,
} from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Actions, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED, ROUTER_NAVIGATION } from '@ngrx/router-store';

const queryFactory = new ArticleQueryFactory();

interface ArticleQueryResponse {
  diseases: {
    allCount: number;
    countEpiArticles: number;
    countNhsArticles: number;
    articles: Article[];
    filteredCount: {
      totalCount: { count: { nodes: number } };
    };
  }[];
}

type ArticleState = {
  articleFilters?: FilterCategory;
  selectedId?: string | number; // which ArticleStore record has been selected
  isLoading: boolean; // has the ArticleStore list been loaded
  error?: string | null; // last known error (if any)
  article: Article;
  articles: Article[];
  allArticlesCount: number;
  articlesCount: number;
  epiArticlesCount: number;
  nhsArticlesCount: number;
};

const initialState: ArticleState = {
  articles: [],
  article: {} as Article,
  articleFilters: { label: 'articles' } as FilterCategory,
  isLoading: false,
  allArticlesCount: 0,
  articlesCount: 0,
  epiArticlesCount: 0,
  nhsArticlesCount: 0,
};

export const ArticleStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    articleCounts: computed(() => {
      return {
        allArticlesCount: state.allArticlesCount(),
        epiArticlesCount: state.epiArticlesCount(),
        nhsArticlesCount: state.nhsArticlesCount(),
        currentArticlesCount: state.articlesCount(),
      };
    }),
  })),
  withMethods(
    (
      store,
      articleListQuery = inject(ArticleListQueryGQL),
      articleQuery = inject(ArticleQueryGQL),
    ) => ({
      loadArticles: rxMethod<Params>(
        pipe(
          tap(() => {
            patchState(store, { isLoading: true });
          }),
          switchMap((params) => {
            const query = queryFactory.getQuery(params);
            return articleListQuery
              .watch({ variables: query.params })
              .valueChanges.pipe(
                tapResponse({
                  next: (articles) => {
                    if (articles.dataState === 'complete') {
                      const data = (<unknown>(
                        articles.data
                      )) as ArticleQueryResponse;
                      const disease = data.diseases![0];
                      const articlesList = disease.articles.map(
                        (article: Partial<Article>) => new Article(article),
                      );
                      patchState(store, (state) => {
                        return {
                          articles: articlesList,
                          isLoading: false,
                          allArticlesCount: disease.allCount,
                          articlesCount:
                            disease.filteredCount.totalCount.count.nodes,
                          epiArticlesCount: disease.countEpiArticles,
                          nhsArticlesCount: disease.countNhsArticles,
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
      loadArticle: rxMethod<Params>(
        pipe(
          tap(() => {
            patchState(store, { isLoading: true });
          }),
          switchMap((params) => {
            const query = queryFactory.getQuery(params);
            return articleQuery
              .watch({ variables: query.params })
              .valueChanges.pipe(
                tapResponse({
                  next: (articles) => {
                    if (articles.dataState === 'complete') {
                      const data = (<unknown>articles.data) as {
                        articles: Article[];
                      };
                      const article: Article = new Article(data.articles[0]);
                      patchState(store, (state) => {
                        return {
                          ...state,
                          article: article,
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
            store.loadArticles(r.payload.routerState.root.queryParams);
          }),
        )
        .subscribe();
    },
  }),
);
