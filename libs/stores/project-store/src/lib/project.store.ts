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
import { Params } from '@angular/router';
import { switchMap, pipe, tap, filter, map } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Actions, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';

const queryFactory = new ProjectQueryFactory();

interface ProjectQueryResponse {
  diseases: {
    countProjects: number;
    countCoreProjects: number;
    coreProjects: CoreProject[];
    totalCount: {
      totalCount: number;
    };
  }[];
}

type ProjectState = {
  projectFilters?: FilterCategory;
  selectedId?: string | number; // which ProjectStore record has been selected
  isLoading: boolean; // has the ProjectStore list been loaded
  error?: string | null; // last known error (if any)
  project: CoreProject;
  projects: CoreProject[];
  allProjectsCount: number;
  projectsCount: number;
};

const initialState: ProjectState = {
  projects: [],
  project: {} as CoreProject,
  projectFilters: { label: 'projects' } as FilterCategory,
  isLoading: false,
  allProjectsCount: 0,
  projectsCount: 0,
};

export const ProjectStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((state) => ({
    projectCounts: computed(() => {
      return {
        allProjectsCount: state.allProjectsCount(),
        currentProjectsCount: state.projectsCount(),
      };
    }),
  })),
  withMethods(
    (
      store,
      projectListQuery = inject(CoreProjectListQueryGQL),
      projectQuery = inject(CoreProjectQueryGQL),
    ) => ({
      loadProjects: rxMethod<Params>(
        pipe(
          tap(() => {
            patchState(store, { isLoading: true });
          }),
          switchMap((params) => {
            const query = queryFactory.getQuery(params);
            return projectListQuery
              .watch({ variables: query.params })
              .valueChanges.pipe(
                tapResponse({
                  next: (projects) => {
                    if (projects.dataState === 'complete') {
                      const data = (
                        (<unknown>projects.data) as ProjectQueryResponse
                      ).diseases[0];
                      const coreProjectsList = data.coreProjects.map(
                        (project: Partial<CoreProject>) =>
                          new CoreProject({
                            ...project,
                            subProjectsCount:
                              project._subProjectsCount!.totalCount,
                          }),
                      );
                      patchState(store, (state) => {
                        return {
                          projects: coreProjectsList,
                          isLoading: false,
                          projectsCount: data.countCoreProjects,
                          allProjectsCount: data.countCoreProjects,
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
      loadProject: rxMethod<Params>(
        pipe(
          tap(() => {
            patchState(store, { isLoading: true });
          }),
          switchMap((params) => {
            const query = queryFactory.getQuery(params);
            return projectQuery
              .watch({ variables: query.params })
              .valueChanges.pipe(
                tapResponse({
                  next: (projects) => {
                    if (projects.dataState === 'complete') {
                      const data: { coreProjects: CoreProject[] } = (<unknown>(
                        projects.data
                      )) as {
                        coreProjects: CoreProject[];
                      };
                      const project: CoreProject = new CoreProject(
                        data.coreProjects[0],
                      );
                      patchState(store, (state) => {
                        return {
                          ...state,
                          project: project,
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
            store.loadProjects(r.payload.routerState.root.queryParams);
          }),
        )
        .subscribe();
    },
  }),
);
