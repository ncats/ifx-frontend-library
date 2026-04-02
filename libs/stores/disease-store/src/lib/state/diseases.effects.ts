import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Params } from '@angular/router';
import { ObservableQuery } from '@apollo/client';
import {
  Article,
  ClinicalTrial,
  CoreProject,
  Disease,
  DiseaseNode,
  DiseaseQueryFactory,
  DISEASETYPEAHEAD,
  DiseaseWhereParams,
} from 'rdas-models';
import { Filter, FilterCategory, Page } from 'utils-models';
import { Store } from '@ngrx/store';
import { DiseaseService } from '../disease.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import {
  combineLatest,
  filter,
  map,
  mergeMap,
  of,
  switchMap,
  take,
} from 'rxjs';
import {
  BrowseDiseaseListActions,
  FetchDiseaseActions,
  FetchDiseaseListActions,
  SearchDiseasesActions,
} from './diseases.actions';
import * as DiseaseSelectors from './diseases.selectors';

//for disease list browsing
export const fetchDiseasesList$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    diseaseService = inject(DiseaseService),
  ) => {
    return actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) =>
        r.payload.routerState.url.startsWith('/diseases'),
      ),
      map(
        (r: RouterNavigationAction) => r.payload.routerState.root.queryParams,
      ),
      switchMap((params: Params) => {
        const queryFactory = new DiseaseQueryFactory();
        const query = queryFactory.getQuery(params);
        return diseaseService.fetchDiseases(query.query, query.params).pipe(
          map((res: ObservableQuery.Result<unknown>) => {
            const data: {
              diseases: Disease[];
              total: { count: number } | number;
            } = res.data as {
              diseases: Disease[];
              total: { count: number } | number;
            };
            if (data) {
              const diseaseArr: Disease[] = data.diseases.map(
                (obj: Partial<Disease>) => new Disease(obj),
              );
              console.log(diseaseArr);
              return BrowseDiseaseListActions.fetchDiseaseListSuccess({
                diseases: diseaseArr,
                page: _makePage(params, data.total),
              });
            } else
              return BrowseDiseaseListActions.fetchDiseaseListFailure({
                error: 'No Disease found',
              });
          }),
        );
      }),
    );
  },
  { functional: true },
);

//for disease list in profile
export const fetchDiseaseListFromIds$ = createEffect(
  (actions$ = inject(Actions), diseaseService = inject(DiseaseService)) => {
    return actions$.pipe(
      ofType(FetchDiseaseListActions.fetchDiseaseList),
      mergeMap((action: { gardIds: string[] }) => {
        const queryFactory = new DiseaseQueryFactory();
        const query = queryFactory.getQuery(action);
        return diseaseService.fetchDiseases(query.query, query.params).pipe(
          map((res: ObservableQuery.Result<unknown>) => {
            const data: { diseases: DiseaseNode[] } = res.data as {
              diseases: DiseaseNode[];
            };
            if (data) {
              const diseaseArr: Disease[] = data.diseases.map(
                (obj: Partial<Disease>) => new Disease(obj),
              );
              return FetchDiseaseListActions.fetchDiseaseListSuccess({
                diseases: diseaseArr,
              });
            } else
              return FetchDiseaseListActions.fetchDiseaseListFailure({
                error: 'No Disease found',
              });
          }),
        );
      }),
    );
  },
  { functional: true },
);

//disease search typeahead
export const searchDiseases$ = createEffect(
  (actions$ = inject(Actions), diseaseService = inject(DiseaseService)) => {
    return actions$.pipe(
      ofType(SearchDiseasesActions.searchDiseases),
      mergeMap((action: { term: string }) => {
        return diseaseService
          .fetchDiseases(DISEASETYPEAHEAD, {
            searchString: action.term, //.split(' ').join('~ AND ') + '*',
            limit: 10,
          } as DiseaseWhereParams)
          .pipe(
            map((res: ObservableQuery.Result<unknown>) => {
              console.log(res);
              const data: { diseaseSearch: Disease[] } = res.data as {
                diseaseSearch: Disease[];
              };
              if (data) {
                const diseaseArr = data.diseaseSearch.map(
                  (obj: Partial<Disease>) => new Disease(obj),
                );
                console.log(diseaseArr);
                return SearchDiseasesActions.searchDiseasesSuccess({
                  typeahead: diseaseArr,
                });
              } else
                return SearchDiseasesActions.searchDiseasesFailure({
                  error: 'No Diseases found',
                });
            }),
          );
      }),
    );
  },
  { functional: true },
);
/*
// bar and pie charts
export const loadStaticDiseaseFilters$ = createEffect(
  (actions$ = inject(Actions), diseaseService = inject(DiseaseService)) => {
    return actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter(
        (r: RouterNavigationAction) =>
          !r.payload.routerState.url.includes('/diseases') &&
          r.payload.routerState.url.startsWith('/disease'),
      ),
      map((r: RouterNavigationAction) => r.payload.routerState.root),
      mergeMap((root: ActivatedRouteSnapshot) => {
        const params: Params = root.queryParams;
        const gardid: string = params['id'];
        return combineLatest(
          diseaseService
            .fetchArticles(ARTICLEFILTERS, { gardId: gardid })
            .pipe(take(1)),
          diseaseService
            .fetchProjects(PROJECTFILTERS, { gardId: gardid })
            .pipe(take(1)),
          diseaseService
            .fetchTrials(TRIALTYPEFILTERS, _setTrialVariables(params, 'type'))
            .pipe(take(1)),
          diseaseService
            .fetchTrials(
              TRIALSTATUSFILTERS,
              _setTrialVariables(params, 'status'),
            )
            .pipe(take(1)),
          diseaseService
            .fetchTrials(TRIALPHASEFILTERS, _setTrialVariables(params, 'phase'))
            .pipe(take(1)),
        ).pipe(
          map(
            ([
              articleFilterData,
              projectFilterData,
              trialTypeFilterData,
              trialStatusFilterData,
              trialPhaseFilterData,
            ]: [
              ObservableQuery.Result<unknown>,
              ObservableQuery.Result<unknown>,
              ObservableQuery.Result<unknown>,
              ObservableQuery.Result<unknown>,
              ObservableQuery.Result<unknown>,
            ]) => {
              if (
                articleFilterData ||
                projectFilterData ||
                trialTypeFilterData ||
                trialStatusFilterData ||
                trialPhaseFilterData
              ) {
                const typeData = trialTypeFilterData as {
                  data: { trialsByType: Filter[] };
                };
                const statusData = trialStatusFilterData as {
                  data: { trialsByStatus: Filter[] };
                };
                const phaseData = trialPhaseFilterData as {
                  data: { trialsByPhase: Filter[] };
                };
                const trialFilterData = {
                  data: {
                    allClinicalTrialsFilters: {
                      trialsByStatus: statusData.data.trialsByStatus,
                      trialsByType: typeData.data.trialsByType,
                      trialsByPhase: phaseData.data.trialsByPhase,
                    },
                  },
                } as ObservableQuery.Result<unknown>;
                const filters = _parseFilterResponse(
                  articleFilterData,
                  projectFilterData,
                  trialFilterData,
                  params,
                );
                return FetchDiseaseActions.fetchStaticDiseaseFiltersSuccess({
                  filters: filters,
                });
              } else
                return FetchDiseaseActions.fetchStaticDiseaseFiltersFailure({
                  error: 'No Disease found',
                });
            },
          ),
        );
      }),
    );
  },
  { functional: true },
);

//dynamic paged filters list
export const loadDiseaseFilters$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    diseaseService = inject(DiseaseService),
  ) => {
    return actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) => {
        return (
          !r.payload.routerState.url.includes('/diseases') &&
          r.payload.routerState.url.startsWith('/disease') &&
          !r.payload.routerState.root.queryParams['offset']
        );
      }),
      map((r: RouterNavigationAction) => r.payload.routerState.root),
      concatLatestFrom(() =>
        store.select(DiseaseSelectors.getStaticDiseaseFilters),
      ),
      mergeMap(([root, staticFilters]) => {
        const params: Params = root.queryParams;
        const gardid: string = params['id'];
        return combineLatest(
          diseaseService
            .fetchArticles(ARTICLEFILTERS, { gardId: gardid })
            .pipe(take(1)),
          diseaseService
            .fetchProjects(PROJECTFILTERS, { gardId: gardid })
            .pipe(take(1)),
          diseaseService
            .fetchTrials(TRIALTYPEFILTERS, _setTrialVariables(params, 'type'))
            .pipe(take(1)),
          diseaseService
            .fetchTrials(
              TRIALSTATUSFILTERS,
              _setTrialVariables(params, 'status'),
            )
            .pipe(take(1)),
          diseaseService
            .fetchTrials(TRIALPHASEFILTERS, _setTrialVariables(params, 'phase'))
            .pipe(take(1)),
        ).pipe(
          map(
            ([
              articleFilterData,
              projectFilterData,
              trialTypeFilterData,
              trialStatusFilterData,
              trialPhaseFilterData,
            ]: [
              ObservableQuery.Result<unknown>,
              ObservableQuery.Result<unknown>,
              ObservableQuery.Result<unknown>,
              ObservableQuery.Result<unknown>,
              ObservableQuery.Result<unknown>,
            ]) => {
              if (
                articleFilterData ||
                projectFilterData ||
                trialTypeFilterData ||
                trialStatusFilterData ||
                trialPhaseFilterData
              ) {
                const typeData = trialTypeFilterData as {
                  data: { trialsByType: Filter[] };
                };
                const statusData = trialStatusFilterData as {
                  data: { trialsByStatus: Filter[] };
                };
                const phaseData = trialPhaseFilterData as {
                  data: { trialsByPhase: Filter[] };
                };
                const trialFilterData = {
                  data: {
                    allClinicalTrialsFilters: {
                      trialsByStatus: statusData.data.trialsByStatus,
                      trialsByType: typeData.data.trialsByType,
                      trialsByPhase: phaseData.data.trialsByPhase,
                    },
                  },
                } as ObservableQuery.Result<unknown>;
                const filters = _parseFilterResponse(
                  articleFilterData,
                  projectFilterData,
                  trialFilterData,
                  params,
                );
                if (root.fragment) {
                  filters.forEach((filter) => {
                    if (filter.parent === root.fragment) {
                      if (filter.field) {
                        filter.values.map((val) => {
                          if (Array.isArray(params[filter.field])) {
                            params[filter.field].forEach((filter: string) => {
                              if (val.term === filter) {
                                val.selected = true;
                              }
                            });
                          } else {
                            if (val.term === params[filter.field]) {
                              val.selected = true;
                            }
                          }
                          return val;
                        });
                      }
                    }
                  });
                }
                return FetchDiseaseActions.fetchDiseaseFiltersSuccess({
                  filters: filters,
                });
              } else
                return FetchDiseaseActions.fetchDiseaseFiltersFailure({
                  error: 'No Disease found',
                });
            },
          ),
        );
      }),
    );
  },
  { functional: true },
);

//specific disease page
export const loadDisease$ = createEffect(
  (actions$ = inject(Actions), diseaseService = inject(DiseaseService)) => {
    return actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter(
        (r: RouterNavigationAction) =>
          !r.payload.routerState.url.includes('/diseases') &&
          r.payload.routerState.url.startsWith('/disease'),
      ),
      map((r: RouterNavigationAction) => r.payload.routerState.root),
      mergeMap((root: ActivatedRouteSnapshot) => {
        const params = root.queryParams;
        const gardid: string = params['id'];
        _setGardId(gardid);
        if (root.fragment) {
          _setFragment(root.fragment, params);
        }
        return diseaseService
          .fetchDiseases(FETCHDISEASEQUERY, DISEASEQUERYPARAMETERS)
          .pipe(
            map((diseaseData: ObservableQuery.Result<unknown>) => {
              if (diseaseData && diseaseData.data) {
                const diseaseObj: Disease = _makeDiseaseObj(diseaseData);
                return FetchDiseaseActions.fetchDiseaseSuccess({
                  disease: diseaseObj,
                });
              } else
                return FetchDiseaseActions.fetchDiseaseFailure({
                  error: 'No Disease found',
                });
            }),
          );
      }),
    );
  },
  { functional: true },
);

*/

/*
//load values for first level of hierarchy tree
export const fetchTreeParent$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    diseaseService = inject(DiseaseService),
  ) => {
    return actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) =>
        r.payload.routerState.url.startsWith('/diseases'),
      ),
      map(
        (r: RouterNavigationAction) => r.payload.routerState.root.queryParams,
      ),
      concatLatestFrom(() => store.select(DiseaseSelectors.getDiseaseTree)),
      mergeMap(([params, tree]) => {
        return diseaseService.fetchDiseases(FETCHROOT, {}).pipe(
          map((res: ObservableQuery.Result<unknown>) => {
            const data: {
              treeBranch: { nodes: DiseaseNode[] }[];
              diseases: DiseaseNode[];
            } = res.data as {
              treeBranch: { nodes: DiseaseNode[] }[];
              diseases: DiseaseNode[];
            };
            let diseaseArr: DiseaseNode[] = [] as DiseaseNode[];
            if (data) {
              if (data.treeBranch) {
                diseaseArr = data.treeBranch[0].nodes.map(
                  (obj: Partial<DiseaseNode>) => new DiseaseNode(obj),
                );
              } else if (tree) {
                diseaseArr = _addToTree(data.diseases[0], tree);
              } else if (data.diseases) {
                diseaseArr = data.diseases.map(
                  (obj: Partial<DiseaseNode>) => new DiseaseNode(obj),
                );
              }
              return BrowseDiseaseListActions.fetchDiseaseTreeSuccess({
                diseases: diseaseArr,
              });
            } else
              return BrowseDiseaseListActions.fetchDiseaseTreeFailure({
                error: 'No Disease found',
              });
          }),
        );
      }),
    );
  },
  { functional: true },
);

//get tree branch data
export const fetchTreeBranch$ = createEffect(
  (
    actions$ = inject(Actions),
    store = inject(Store),
    diseaseService = inject(DiseaseService),
  ) => {
    return actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) =>
        r.payload.routerState.url.startsWith('/diseasess'),
      ),
      map(
        (r: RouterNavigationAction) => r.payload.routerState.root.queryParams,
      ),
      concatLatestFrom(() => store.select(DiseaseSelectors.getDiseaseTree)),
      mergeMap(([params, tree]) => {
        let query;
        let qParams: { [key: string]: unknown } | undefined;
        if (!tree) {
          if (params['parentId']) {
            query = FETCHPATH;
            qParams = { searchString: params['parentId'] };
            if (params['phenotypes']) {
              qParams['where'] = {
                hasPhenotypePhenotypes_SOME: {
                  HPOTerm_IN: params['phenotypes'].split('&'),
                },
              };
            }
          } else {
            query = FETCHROOT;
            qParams = params['phenotypes']
              ? {
                  where: {
                    hasPhenotypePhenotypes_SOME: {
                      HPOTerm_IN: params['phenotypes'].split('&'),
                    },
                  },
                }
              : undefined;
          }
        } else {
          if (params['pageIndex']) {
            query = FETCHROOT;
            qParams = params['phenotypes']
              ? {
                  where: {
                    hasPhenotypePhenotypes_SOME: {
                      HPOTerm_IN: params['phenotypes'].split('&'),
                    },
                  },
                }
              : undefined;
          } else {
            if (params['parentId']) {
              DISEASEQUERYPARAMETERS.where = { GardId: params['parentId'] };
              if (params['phenotypes']) {
                DISEASEQUERYPARAMETERS.where.hasPhenotypePhenotypes_SOME = {
                  HPOTerm_IN: params['phenotypes'].split('&'),
                };
              }
              query = CATEGORYTREEBRANCH;
              qParams = DISEASEQUERYPARAMETERS;
            } else {
              query = FETCHROOT;
              qParams = params['phenotypes']
                ? {
                    where: {
                      hasPhenotypePhenotypes_SOME: {
                        HPOTerm_IN: params['phenotypes'].split('&'),
                      },
                    },
                  }
                : undefined;
            }
          }
        }

        return diseaseService.fetchDiseases(query, qParams).pipe(
          map((res: ObservableQuery.Result<unknown>) => {
            const data: {
              treeBranch: { nodes: DiseaseNode[] }[];
              diseases: DiseaseNode[];
            } = res.data as {
              treeBranch: { nodes: DiseaseNode[] }[];
              diseases: DiseaseNode[];
            };
            let diseaseArr: DiseaseNode[] = [] as DiseaseNode[];
            if (data) {
              if (data.treeBranch) {
                diseaseArr = data.treeBranch[0].nodes
                  .map((obj: Partial<DiseaseNode>) => new DiseaseNode(obj))
                  .sort((a: DiseaseNode, b: DiseaseNode) => b.count - a.count);
              } else if (tree) {
                diseaseArr = _addToTree(data.diseases[0], tree);
              } else if (data.diseases) {
                diseaseArr = data.diseases
                  .map((obj: Partial<DiseaseNode>) => new DiseaseNode(obj))
                  .sort((a: DiseaseNode, b: DiseaseNode) => b.count - a.count);
              }
              return BrowseDiseaseListActions.fetchDiseaseTreeSuccess({
                diseases: diseaseArr,
              });
            } else
              return BrowseDiseaseListActions.fetchDiseaseTreeFailure({
                error: 'No Disease found',
              });
          }),
        );
      }),
    );
  },
  { functional: true },
);

// gets all filter for disease/trials/projects to show charts on browse page
export const loadAllDiseaseFilters$ = createEffect(
  (actions$ = inject(Actions), diseaseService = inject(DiseaseService)) => {
    return actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) =>
        r.payload.routerState.url.startsWith('/diseases'),
      ),
      map((r: RouterNavigationAction) => r.payload.routerState.root),
      mergeMap((root: ActivatedRouteSnapshot) => {
        const params: Params = root.queryParams;
        return combineLatest(
          diseaseService.fetchArticles(ALLARTICLEFILTERS).pipe(take(1)),
          diseaseService.fetchProjects(ALLPROJECTFILTERS).pipe(take(1)),
          diseaseService.fetchTrials(ALLTRIALFILTERS).pipe(take(1)),
        ).pipe(
          map(
            ([articleFilterData, projectFilterData, trialFilterData]: [
              ObservableQuery.Result<unknown>,
              ObservableQuery.Result<unknown>,
              ObservableQuery.Result<unknown>,
            ]) => {
              const filters: FilterCategory[] = [];
              if (articleFilterData || projectFilterData || trialFilterData) {
                if (articleFilterData) {
                  const articleFilterDataList: {
                    allCountsByYear: Filter[];
                    allCountsByEpi: Filter[];
                    allCountsByNHS: Filter[];
                  } = articleFilterData.data as {
                    allCountsByYear: Filter[];
                    allCountsByEpi: Filter[];
                    allCountsByNHS: Filter[];
                  };
                  if (articleFilterDataList.allCountsByYear.length) {
                    filters.push(
                      new FilterCategory({
                        parent: 'articles',
                        label: 'All Articles by Year',
                        // filterable: false,
                        field: 'year',
                        values: articleFilterDataList.allCountsByYear
                          .filter((fil) => fil.term != '')
                          .map((fil: Partial<Filter>) => new Filter(fil)),
                      }),
                    );
                  }
                  if (articleFilterDataList.allCountsByEpi.length) {
                    filters.push(
                      new FilterCategory({
                        parent: 'articles',
                        label: 'Epidemiology Articles by Year',
                        field: 'year',
                        values: articleFilterDataList.allCountsByEpi
                          .filter((fil) => fil.term != '')
                          .filter(
                            (year: Partial<Filter>) =>
                              year.label == 'Epidemiology Articles',
                          )
                          .map(
                            (fil: Partial<Filter>) =>
                              new Filter({ ...fil, label: 'year' }),
                          ),
                      }),
                    );
                  }
                  if (articleFilterDataList.allCountsByNHS.length) {
                    filters.push(
                      new FilterCategory({
                        parent: 'articles',
                        label: 'Natural Health Study Articles by Year',
                        field: 'year',
                        values: articleFilterDataList.allCountsByNHS
                          .filter((fil) => fil.term != '')
                          .filter(
                            (year: Partial<Filter>) =>
                              year.label == 'Natural Health Study Articles',
                          )
                          .map(
                            (fil: Partial<Filter>) =>
                              new Filter({ ...fil, label: 'year' }),
                          ),
                      }),
                    );
                  }
                }
                if (projectFilterData) {
                  const projectFilterDataList: {
                    allCountsByYear: Filter[];
                    allFundingByYear: Filter[];
                  } = projectFilterData.data as {
                    allCountsByYear: Filter[];
                    allFundingByYear: Filter[];
                  };

                  if (projectFilterDataList.allCountsByYear.length) {
                    filters.push(
                      new FilterCategory({
                        parent: 'projects',
                        label: 'Projects Count by Year',
                        filterable: false,
                        values: projectFilterDataList.allCountsByYear.map(
                          (fil: Partial<Filter>) => new Filter(fil),
                        ),
                      }),
                    );
                  }
                  if (projectFilterDataList.allFundingByYear.length) {
                    filters.push(
                      new FilterCategory({
                        parent: 'projects',
                        label: 'Projects Funding by Year',
                        filterable: false,
                        values: projectFilterDataList.allFundingByYear.map(
                          (fil: Partial<Filter>) => new Filter(fil),
                        ),
                      }),
                    );
                  }
                }
                if (trialFilterData) {
                  const trialFilterDataList: {
                    allTrialsByStatus: Filter[];
                    allTrialsByType: Filter[];
                    allTrialsByPhase: Filter[];
                  } = trialFilterData.data as {
                    allTrialsByStatus: Filter[];
                    allTrialsByType: Filter[];
                    allTrialsByPhase: Filter[];
                  };
                  if (
                    trialFilterDataList.allTrialsByStatus &&
                    trialFilterDataList.allTrialsByStatus.length
                  ) {
                    filters.push(
                      new FilterCategory({
                        parent: 'trials',
                        label: 'Clinical Trials by Status',
                        field: 'OverallStatus',
                        values: trialFilterDataList.allTrialsByStatus.map(
                          (fil: Partial<Filter>) =>
                            new Filter({
                              ...fil,
                              selected:
                                params['OverallStatus'] === fil.term ||
                                params['OverallStatus']?.includes(fil.term),
                            }),
                        ),
                      }),
                    );
                  }
                  if (
                    trialFilterDataList.allTrialsByType &&
                    trialFilterDataList.allTrialsByType.length
                  ) {
                    filters.push(
                      new FilterCategory({
                        parent: 'trials',
                        label: 'Clinical Trials by Type',
                        field: 'StudyType',
                        values: trialFilterDataList.allTrialsByType.map(
                          (fil: Partial<Filter>) => new Filter(fil),
                        ),
                      }),
                    );
                  }
                  if (
                    trialFilterDataList.allTrialsByPhase &&
                    trialFilterDataList.allTrialsByPhase.length
                  ) {
                    filters.push(
                      new FilterCategory({
                        parent: 'trials',
                        label: 'Clinical Trials by Phase',
                        field: 'Phase',
                        values: trialFilterDataList.allTrialsByPhase.map(
                          (fil: Partial<Filter>) => new Filter(fil),
                        ),
                      }),
                    );
                  }
                }
                return FetchDiseaseListActions.fetchAllDiseaseFiltersSuccess({
                  filters: filters,
                });
              } else
                return FetchDiseaseListActions.fetchAllDiseaseFiltersFailure({
                  error: 'No Filters found',
                });
            },
          ),
        );
      }),
    );
  },
  { functional: true },
);

function _makeDiseaseObj(
  diseaseData: ObservableQuery.Result<unknown>,
  articleData?: ObservableQuery.Result<unknown>,
  projectsData?: ObservableQuery.Result<unknown>,
  trialsData?: ObservableQuery.Result<unknown>,
): Disease {
  const disease: { disease: Disease[] } = diseaseData.data as {
    disease: Disease[];
  };
  if (disease) {
    const diseaseObj: Disease = new Disease(disease.disease[0]);
    if (articleData) {
      const articles: {
        articles: {
          articles: Article[];
          _count: { count: number };
          allCount: { count: number };
        }[];
      } = articleData.data as {
        articles: {
          articles: Article[];
          _count: { count: number };
          allCount: { count: number };
        }[];
      };
    }

    if (projectsData) {
      const projects: {
        coreProjects: CoreProject[];
        count: { count: number };
      } = projectsData.data as {
        coreProjects: CoreProject[];
        count: { count: number };
      };
      diseaseObj.projects = projects.coreProjects.map(
        (proj: Partial<CoreProject>) => new CoreProject(proj),
      );
      diseaseObj.projectCount = projects.count.count;
      diseaseObj.allProjectCount = projects.count.count;
    }
    if (trialsData) {
      const trials: {
        clinicalTrials: ClinicalTrial[];
        count: { count: number };
        allCount: { count: number };
      } = trialsData.data as {
        clinicalTrials: ClinicalTrial[];
        count: { count: number };
        allCount: { count: number };
      };
      diseaseObj.clinicalTrials = trials.clinicalTrials.map(
        (trial: Partial<ClinicalTrial>) => new ClinicalTrial(trial),
      );
      diseaseObj.allClinicalTrialCount = trials.allCount.count;
      diseaseObj.clinicalTrialCount = trials.count.count;
    }
    return diseaseObj;
  } else return new Disease({});
}


function _addToTree(
  data: DiseaseNode,
  parent?: DiseaseNode[] | undefined,
): DiseaseNode[] {
  let ret: DiseaseNode[] = [] as DiseaseNode[];
  const dNode = new DiseaseNode(data);
  if (!parent) {
    return [data];
  } else {
    const diseaseMap = new Map<string, DiseaseNode>();
    let found = false;
    parent.map((disease) => {
      if (disease.gardId === dNode.gardId) {
        found = true;
        diseaseMap.set(dNode.gardId, dNode);
      } else {
        diseaseMap.set(disease.gardId, disease);
      }
    });
    if (found) {
      ret = [...diseaseMap.values()].sort((a, b) => b.count - a.count);
    } else {
      parent.some((disease) => {
        if (disease.children) {
          const lll = _addToTree(dNode, disease.children);
          const d2: DiseaseNode = new DiseaseNode({
            ...disease,
            children: lll,
          });
          diseaseMap.set(d2.gardId, d2);
          ret = [...diseaseMap.values()].sort((a, b) => b.count - a.count);
        }
      });
    }
    return ret;
  }
}

function _setFragment(
  origin: string | null,
  options: {
    limit?: number;
    offset?: number;
    year?: string | string[];
    GardId?: string;
    isEpi?: string | string[];
    isNHS?: string | string[];
    OverallStatus?: string[];
    StudyType?: string[];
    Phase?: string[];
  },
) {
  switch (origin) {
     */ /*

 */
/*    case 'epiArticles': {
      EPIARTICLES.articleOptions.limit = <number>options['limit']
        ? <number>options['limit']
        : 10;
      if (<number>options['offset']) {
        EPIARTICLES.articleOptions.offset = <number>options['offset'] * 1;
      }
      if (options['year'] && options['year'].length > 0) {
        EPIARTICLES.articleFilter.publicationYear_IN = options['year'];
      } else {
        EPIARTICLES.articleFilter.publicationYear_IN = undefined;
      }
      break;
    }
    case 'articles': {
      console.log(options)
      ALLARTICLES.articleOptions.limit = <number>options['limit']
        ? <number>options['limit']
        : 10;
      if (<number>options['offset']) {
        ALLARTICLES.articleOptions.offset = <number>options['offset'] * 1;
      }
      if (options['year'] && options['year'].length > 0) {
        ALLARTICLES.articleFilter.publicationYear_IN = options['year'];
      }
      if (options['isEpi']) {
        ALLARTICLES.articleFilter.publicationYear_IN = options['isEpi'];
      }
      if (options['isNHS'] ) {
        ALLARTICLES.articleFilter.publicationYear_IN = options['isNHS'];
      }
      break;
    }*/ /*
 */
/*

    case 'projects': {
      PROJECTVARIABLES.limit = <number>options['limit']
        ? <number>options['limit']
        : 10;
      if (<number>options['offset']) {
        PROJECTVARIABLES.offset = <number>options['offset'] * 1;
      }
      break;
    }
    case 'trials': {
      FETCHTRIALSVARIABLES.ctoptions.limit = <number>options['limit']
        ? <number>options['limit']
        : 10;
      if (<number>options['offset']) {
        FETCHTRIALSVARIABLES.ctoptions.offset = <number>options['offset'] * 1;
      } else {
        FETCHTRIALSVARIABLES.ctoptions.offset = 0;
      }
      if (options['GardId']) {
        FETCHTRIALSVARIABLES.gardWhere.GardId = <string>options['GardId'];
      }
      if (options['OverallStatus'] && options['OverallStatus'].length > 0) {
        FETCHTRIALSVARIABLES.ctfilters.OverallStatus_IN =
          options['OverallStatus'];
      } else {
        FETCHTRIALSVARIABLES.ctfilters.OverallStatus_IN = undefined;
      }
      if (options['StudyType'] && options['StudyType'].length > 0) {
        FETCHTRIALSVARIABLES.ctfilters.StudyType_IN = options['StudyType'];
      } else {
        FETCHTRIALSVARIABLES.ctfilters.StudyType_IN = undefined;
      }
      if (options['Phase'] && options['Phase'].length > 0) {
        FETCHTRIALSVARIABLES.ctfilters.Phase_IN = options['Phase'];
      } else {
        FETCHTRIALSVARIABLES.ctfilters.Phase_IN = undefined;
      }
      break;
    }
  }
}

function _setGardId(gardid: string) {
  DISEASEQUERYPARAMETERS.where = { GardId: gardid };
  EPIARTICLES.gardWhere.GardId = gardid;
  ALLARTICLES.gardWhere.GardId = gardid;
  PROJECTVARIABLES.gardId = gardid;
  FETCHTRIALSVARIABLES.gardWhere.GardId = gardid;
}

function _setTrialVariables(params: Params, origin: string) {
  if (origin !== 'type' && params['StudyType'] && params['StudyType'].length) {
    FETCHTRIALSVARIABLES.ctfilters.StudyType_IN = params['StudyType'];
  } else {
    FETCHTRIALSVARIABLES.ctfilters.StudyType_IN = undefined;
  }
  if (origin !== 'phase' && params['Phase'] && params['Phase'].length) {
    FETCHTRIALSVARIABLES.ctfilters.Phase_IN = params['Phase'];
  } else {
    FETCHTRIALSVARIABLES.ctfilters.Phase_IN = undefined;
  }
  if (
    origin !== 'status' &&
    params['OverallStatus'] &&
    params['OverallStatus'].length
  ) {
    FETCHTRIALSVARIABLES.ctfilters.OverallStatus_IN = params['OverallStatus'];
  } else {
    FETCHTRIALSVARIABLES.ctfilters.OverallStatus_IN = undefined;
  }
  return FETCHTRIALSVARIABLES;
}

function _setArticleVariables(params: Params) {
  if (params['year'] && params['year'].length) {
    // FETCHART.ctfilters.StudyType_IN = params['StudyType']
  } else {
    FETCHTRIALSVARIABLES.ctfilters.StudyType_IN = undefined;
  }

  return FETCHTRIALSVARIABLES;
}

function _parseFilterResponse(
  articleFilterData: ObservableQuery.Result<unknown>,
  projectFilterData: ObservableQuery.Result<unknown>,
  trialFilterData: ObservableQuery.Result<unknown>,
  params: Params,
): FilterCategory[] {
  const filters: FilterCategory[] = [];
  if (articleFilterData) {
    const articleFilterDataList: {
      countsByYear: Filter[];
      countsByEpi: Filter[];
      countsByNHS: Filter[];
    } = articleFilterData.data as {
      countsByYear: Filter[];
      countsByEpi: Filter[];
      countsByNHS: Filter[];
    };
    if (articleFilterDataList.countsByYear.length) {
      filters.push(
        new FilterCategory({
          parent: 'articles',
          label: 'Articles by Year',
          field: 'year',
          values: articleFilterDataList.countsByYear.map(
            (fil: Partial<Filter>) => new Filter(fil),
          ),
        }),
      );
      const fc = new FilterCategory({
        parent: 'articles',
        label: 'Epidemiology Articles ',
        field: 'isEpi',
        values: articleFilterDataList.countsByEpi.map(
          (fil: Partial<Filter>) => new Filter({ ...fil, label: 'isEpi' }),
        ),
      });
      filters.push(fc);
      filters.push(
        new FilterCategory({
          parent: 'articles',
          label: 'Natural Health Study Articles',
          field: 'isNHS',
          values: articleFilterDataList.countsByNHS.map(
            (fil: Partial<Filter>) => new Filter({ ...fil, label: 'isNHS' }),
          ),
        }),
      );
    }
  }
  if (projectFilterData) {
    const projectFilterDataList: {
      countsByYear: Filter[];
      costByYear: Filter[];
    } = projectFilterData.data as {
      countsByYear: Filter[];
      costByYear: Filter[];
    };
    if (projectFilterDataList.countsByYear.length) {
      filters.push(
        new FilterCategory({
          parent: 'projects',
          label: 'Projects Count by Year',
          filterable: false,
          values: projectFilterDataList.countsByYear.map(
            (fil: Partial<Filter>) => new Filter(fil),
          ),
        }),
      );
    }
    if (projectFilterDataList.costByYear.length) {
      filters.push(
        new FilterCategory({
          parent: 'projects',
          label: 'Projects Funding by Year',
          filterable: false,
          values: projectFilterDataList.costByYear.map(
            (fil: Partial<Filter>) => new Filter(fil),
          ),
        }),
      );
    }
  }
  if (trialFilterData) {
    const dataObj: {
      allClinicalTrialsFilters: {
        trialsByStatus: Filter[];
        trialsByType: Filter[];
        trialsByPhase: Filter[];
      };
    } = trialFilterData.data as {
      allClinicalTrialsFilters: {
        trialsByStatus: Filter[];
        trialsByType: Filter[];
        trialsByPhase: Filter[];
      };
    };
    const trialFilterDataList: {
      trialsByStatus: Filter[];
      trialsByType: Filter[];
      trialsByPhase: Filter[];
    } = dataObj.allClinicalTrialsFilters as {
      trialsByStatus: Filter[];
      trialsByType: Filter[];
      trialsByPhase: Filter[];
    };
    if (
      trialFilterDataList.trialsByStatus &&
      trialFilterDataList.trialsByStatus.length
    ) {
      filters.push(
        new FilterCategory({
          parent: 'trials',
          label: 'Clinical Trials by Status',
          field: 'OverallStatus',
          values: trialFilterDataList.trialsByStatus.map(
            (fil: Partial<Filter>) =>
              new Filter({
                ...fil,
                selected:
                  params['OverallStatus'] === fil.term ||
                  params['OverallStatus']?.includes(fil.term),
              }),
          ),
        }),
      );
    }
    if (
      trialFilterDataList.trialsByType &&
      trialFilterDataList.trialsByType.length
    ) {
      filters.push(
        new FilterCategory({
          parent: 'trials',
          label: 'Clinical Trials by Type',
          field: 'StudyType',
          values: trialFilterDataList.trialsByType.map(
            (fil: Partial<Filter>) => new Filter(fil),
          ),
        }),
      );
    }
    if (
      trialFilterDataList.trialsByPhase &&
      trialFilterDataList.trialsByPhase.length
    ) {
      filters.push(
        new FilterCategory({
          parent: 'trials',
          label: 'Clinical Trials by Phase',
          field: 'Phase',
          values: trialFilterDataList.trialsByPhase.map(
            (fil: Partial<Filter>) => new Filter(fil),
          ),
        }),
      );
    }
  }
  return filters;
}
 */

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
