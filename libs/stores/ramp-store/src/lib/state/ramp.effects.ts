import { inject } from '@angular/core';
import { FilterCategory, OpenApiPath } from 'utils-models';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import {
  Analyte,
  Classes,
  CommonAnalyte,
  Metabolite,
  Ontology,
  Pathway,
  Properties,
  RampChemicalEnrichmentResponse,
  RampOntologyEnrichmentResponse,
  RampPathwayEnrichmentResponse,
  RampReactionClassEnrichmentResponse,
  RampResponse,
  Reaction,
  ReactionClass,
  Stats,
} from 'ramp';
import {
  AnalyteFromPathwayActions,
  ClassesFromMetabolitesActions,
  CommonReactionAnalyteActions,
  IdentifierHarmonizationActions,
  LoadRampActions,
  MetaboliteEnrichmentsActions,
  MetaboliteFromOntologyActions,
  OntologyEnrichmentsActions,
  OntologyFromMetaboliteActions,
  PathwayEnrichmentsActions,
  PathwayFromAnalyteActions,
  PropertiesFromMetaboliteActions,
  ReactionClassEnrichmentsActions,
  ReactionClassesFromAnalytesActions,
  ReactionsFromAnalytesActions,
} from './ramp.actions';
import { RampService } from '../ramp.service';
import { exhaustMap, filter, mergeMap, of, tap } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  getChemicalEnrichment,
  getClusterPlotUrl,
  getCombinedFishersDataframe,
  // getEnrichedChemicalClass,
  getFilteredFishersDataframe,
  getOntologyEnrichment,
  getReactionClassEnrichment,
} from './ramp.selectors';

export const init$ = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(LoadRampActions.loadRamp),
      exhaustMap(() => {
        return rampService.fetchSupportedIds().pipe(
          map(
            (ret: { analyteType: string; idTypes: string[] }[]) => {
              return LoadRampActions.loadRampSuccess({ supportedIds: ret });
            },
            catchError((error: ErrorEvent) =>
              of(LoadRampActions.loadRampFailure({ error: error.message })),
            ),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const loadApi$ = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(LoadRampActions.loadRampApi),
      exhaustMap((action) => {
        return rampService.fetchApi(action.url).pipe(
          map(
            (ret: {
              tags: {
                name: string;
                description: string;
                sections?: string[];
              }[];
              paths: { [key: string]: { post?: { [key: string]: unknown } } };
            }) => {
              const tempMap: Map<string, OpenApiPath[]> = new Map<
                string,
                OpenApiPath[]
              >();
              ret.tags.forEach(
                (tag: {
                  name: string;
                  description: string;
                  sections?: string[];
                }) => {
                  let tempArr: OpenApiPath[] = [] as OpenApiPath[];
                  if (tempMap.has(tag.name)) {
                    tempArr = tempMap.get(tag.name) as OpenApiPath[];
                  }

                  Object.entries(ret.paths).forEach(([pathKey, pathValue]) => {
                    const title = pathKey.split('/api/')[1];
                    if (tag.sections?.includes(title)) {
                      let subsections: string[] = [];
                      if (pathValue.post && pathValue.post['x-subsections']) {
                        subsections = pathValue.post[
                          'x-subsections'
                        ] as string[];
                      }
                      tempArr.push(
                        new OpenApiPath({
                          ...pathValue.post,
                          title: title,
                          pageDescription: tag.description,
                        }),
                      );
                      subsections.forEach((subsection) => {
                        let path: {
                          [key: string]: { post?: { [key: string]: unknown } };
                        } = {};
                        Object.entries(ret.paths).forEach(
                          ([pathKey, pathValue]) => {
                            const splitPathName = pathKey.split('/api/')[1];
                            if (splitPathName === subsection) {
                              path = pathValue;
                            }
                          },
                        );
                        tempArr.push(
                          new OpenApiPath({
                            ...path['post'],
                            title: title,
                            subtitle: subsection,
                            //filter: true,
                            pageDescription: tag.description,
                          }),
                        );
                      });
                    }
                    if (tempArr.length) {
                      tempMap.set(tag.name, tempArr);
                    }
                  });
                },
              );
              return LoadRampActions.loadRampApiSuccess({ api: tempMap });
            },
            catchError((error: ErrorEvent) =>
              of(LoadRampActions.loadRampApiFailure({ error: error.message })),
            ),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const fetchStats = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(LoadRampActions.loadRampStats),
      exhaustMap(() => {
        return rampService.loadAboutData().pipe(
          map(
            (ret: Stats) => {
              const data: Stats = ret as Stats;
              if (data) {
                return LoadRampActions.loadRampStatsSuccess({ data: data });
              } else {
                return LoadRampActions.loadRampStatsFailure({
                  error: 'No Stats Available',
                });
              }
            },
            catchError((error: ErrorEvent) =>
              of(
                LoadRampActions.loadRampStatsFailure({ error: error.message }),
              ),
            ),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const fetchPathwaysFromAnalytes = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(
        PathwayFromAnalyteActions.fetchPathwaysFromAnalytes,
        PathwayEnrichmentsActions.fetchPathwaysFromAnalytes,
      ),
      exhaustMap((action) => {
        return rampService.fetchPathwaysFromAnalytes(action.analytes).pipe(
          map(
            (ret: RampResponse<Pathway>) => {
              ret.background = action.background;
              ret.backgroundFile = action.backgroundFile;
              ret.pValType = action.pValType;
              ret.pValCutoff = action.pValCutoff;
              ret.percAnalyteOverlap = action.percAnalyteOverlap;
              ret.minPathwayToCluster = action.minPathwayToCluster;
              ret.percPathwayOverlap = action.percPathwayOverlap;
              return PathwayFromAnalyteActions.fetchPathwaysFromAnalytesSuccess(
                ret,
              );
            },
            catchError((error: ErrorEvent) => {
              return of(
                PathwayFromAnalyteActions.fetchPathwaysFromAnalytesFailure({
                  error: error.message,
                }),
              );
            }),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const fetchAnalytesFromPathways = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(AnalyteFromPathwayActions.fetchAnalytesFromPathways),
      exhaustMap((action) => {
        return rampService.fetchAnalytesFromPathways(action).pipe(
          map(
            (ret: RampResponse<Analyte>) => {
              return AnalyteFromPathwayActions.fetchAnalytesFromPathwaysSuccess(
                { ...ret },
              );
            },
            catchError((error: ErrorEvent) =>
              of(
                AnalyteFromPathwayActions.fetchAnalytesFromPathwaysFailure({
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

export const fetchOntologiesFromMetabolites = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(OntologyFromMetaboliteActions.fetchOntologiesFromMetabolites),
      exhaustMap((action) => {
        return rampService
          .fetchOntologiesFromMetabolites(action.metabolites)
          .pipe(
            map(
              (ret: RampResponse<Ontology>) => {
                return OntologyFromMetaboliteActions.fetchOntologiesFromMetabolitesSuccess(
                  { ...ret },
                );
              },
              catchError((error: ErrorEvent) =>
                of(
                  OntologyFromMetaboliteActions.fetchOntologiesFromMetabolitesFailure(
                    { error: error.message },
                  ),
                ),
              ),
            ),
          );
      }),
    );
  },
  { functional: true },
);

export const fetchOntologies = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) =>
        r.payload.routerState.url.includes('/ontologies'),
      ),
      exhaustMap(() => {
        return rampService.fetchOntologies().pipe(
          map(
            (ret: { data: FilterCategory[] }) => {
              return MetaboliteFromOntologyActions.fetchOntologiesSuccess(ret);
            },
            catchError((error: ErrorEvent) =>
              of(
                MetaboliteFromOntologyActions.fetchOntologiesFailure({
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

export const fetchMetabolitesFromOntologies = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(MetaboliteFromOntologyActions.fetchMetabolitesFromOntologies),
      exhaustMap((action) => {
        return rampService
          .fetchMetabolitesFromOntologies(action.ontologies)
          .pipe(
            map(
              (ret: RampResponse<Metabolite>) =>
                MetaboliteFromOntologyActions.fetchMetabolitesFromOntologiesSuccess(
                  ret,
                ),
              catchError((error: ErrorEvent) =>
                of(
                  MetaboliteFromOntologyActions.fetchMetaboliteFromOntologiesFailure(
                    { error: error.message },
                  ),
                ),
              ),
            ),
          );
      }),
    );
  },
  { functional: true },
);

export const fetchOntologyEnrichment = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(OntologyEnrichmentsActions.fetchOntologyEnrichment),
      exhaustMap((action) => {
        return rampService
          .fetchEnrichmentFromOntologies(
            action.metabolites,
            action.background,
            action.backgroundFile,
          )
          .pipe(
            map(
              (ret: RampOntologyEnrichmentResponse) => {
                return OntologyEnrichmentsActions.fetchOntologyEnrichmentSuccess(
                  {
                    data: ret,
                  },
                );
              },
              catchError((error: ErrorEvent) =>
                of(
                  OntologyEnrichmentsActions.fetchOntologyEnrichmentFailure({
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

/*
export const filterOntologyEnrichment = createEffect(
  (
    actions$ = inject(Actions),
    rampService = inject(RampService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(
        OntologyEnrichmentsActions.fetchOntologyEnrichmentSuccess,
        OntologyEnrichmentsActions.filterOntologyEnrichment,
      ),
      concatLatestFrom(() => store.select(getOntologyEnrichment)),
      mergeMap(([action, dataframe]) => {
        if (dataframe) {
          return rampService
            .filterOntologyEnrichment(
              dataframe.data as RampOntologyEnrichmentResponse,
              action.pValType,
              action.pValCutoff,
            )
            .pipe(
              map(
                (ret: RampReaction0ClassEnrichmentResponse) => {
                  return OntologyEnrichmentsActions.filterOntologyEnrichmentSuccess(
                    { data: ret },
                  );
                },
                catchError((error: ErrorEvent) =>
                  of(
                    OntologyEnrichmentsActions.filterOntologyEnrichmentFailure(
                      { error: error.message },
                    ),
                  ),
                ),
              ),
            );
        } else {
          return of(
            MetaboliteEnrichmentsActions.filterEnrichmentFromMetabolitesFailure(
              { error: 'No dataframe available' },
            ),
          );
        }
      }),
    );
  },
  { functional: true },
);
*/

export const fetchOntologyEnrichmentFile = createEffect(
  (
    actions$ = inject(Actions),
    rampService = inject(RampService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(OntologyEnrichmentsActions.fetchOntologyEnrichmentFile),
      concatLatestFrom(() => store.select(getOntologyEnrichment)),
      tap(([action, dataframe]) => {
        if (action && dataframe) {
          //     rampService.fetchOntologyEnrichmentFile(dataframe.data);
        }
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const fetchMetabolitesFromOntologiesFile = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(MetaboliteFromOntologyActions.fetchMetabolitesFromOntologiesFile),
      tap((action) =>
        rampService.fetchMetabolitesFromOntologiesFile(
          action.ontologies,
          action.format,
        ),
      ),
    );
  },
  { functional: true, dispatch: false },
);

export const fetchClassesFromMetabolites = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(
        ClassesFromMetabolitesActions.fetchClassesFromMetabolites,
        MetaboliteEnrichmentsActions.fetchClassesFromMetabolites,
      ),
      exhaustMap((action) => {
        return rampService
          .fetchChemicalClass(
            action.metabolites,
            action.background,
            action.backgroundFile,
          )
          .pipe(
            map(
              (ret: RampResponse<Classes>) =>
                ClassesFromMetabolitesActions.fetchClassesFromMetabolitesSuccess(
                  ret,
                ),
              catchError((error: ErrorEvent) =>
                of(
                  ClassesFromMetabolitesActions.fetchClassesFromMetabolitesFailure(
                    { error: error.message },
                  ),
                ),
              ),
            ),
          );
      }),
    );
  },
  { functional: true },
);

export const fetchPropertiesFromMetabolites = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(PropertiesFromMetaboliteActions.fetchPropertiesFromMetabolites),
      exhaustMap((action) => {
        return rampService
          .fetchPropertiesFromMetabolites(action.metabolites)
          .pipe(
            map(
              (ret: RampResponse<Properties>) =>
                PropertiesFromMetaboliteActions.fetchPropertiesFromMetabolitesSuccess(
                  { ...ret },
                ),
              catchError((error: ErrorEvent) =>
                of(
                  PropertiesFromMetaboliteActions.fetchPropertiesFromMetabolitesFailure(
                    { error: error.message },
                  ),
                ),
              ),
            ),
          );
      }),
    );
  },
  { functional: true },
);

export const fetchCommonReactionAnalytes = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(CommonReactionAnalyteActions.fetchCommonReactionAnalytes),
      exhaustMap((action) => {
        return rampService.fetchCommonReactionAnalytes(action.analytes).pipe(
          map(
            (ret: RampResponse<CommonAnalyte>) =>
              CommonReactionAnalyteActions.fetchCommonReactionAnalytesSuccess({
                ...ret,
              }),
            catchError((error: ErrorEvent) =>
              of(
                CommonReactionAnalyteActions.fetchCommonReactionAnalytesFailure(
                  { error: error.message },
                ),
              ),
            ),
          ),
        );
      }),
    );
  },
  { functional: true },
);

export const fetchReactionsFromAnalytes = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(ReactionsFromAnalytesActions.fetchReactionsFromAnalytes),
      exhaustMap((action) => {
        return rampService
          .fetchReactionsFromAnalytes(
            action.analytes,
            action.onlyHumanMets,
            action.humanProtein,
            action.includeTransportRxns,
            action.rxnDirs,
            action.includeRxnURLs,
          )
          .pipe(
            map(
              (ret: RampResponse<Reaction>) => {
                return ReactionsFromAnalytesActions.fetchReactionsFromAnalytesSuccess(
                  {
                    ...ret,
                  },
                );
              },
              catchError((error: ErrorEvent) =>
                of(
                  ReactionsFromAnalytesActions.fetchReactionsFromAnalytesFailure(
                    { error: error.message },
                  ),
                ),
              ),
            ),
          );
      }),
    );
  },
  { functional: true },
);

export const fetchReactionClassesFromAnalytes = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(
        ReactionClassesFromAnalytesActions.fetchReactionClassesFromAnalytes,
      ),
      exhaustMap((action) => {
        return rampService
          .fetchReactionClassesFromAnalytes(
            action.analytes,
            action.multiRxnParticipantCount,
            action.humanProtein,
            action.concatResults,
            action.includeReactionIDs,
            action.useIdMapping,
          )
          .pipe(
            map(
              (ret: RampResponse<ReactionClass>) => {
                return ReactionClassesFromAnalytesActions.fetchReactionClassesFromAnalyteSuccess(
                  {
                    ...ret,
                  },
                );
              },
              catchError((error: ErrorEvent) =>
                of(
                  ReactionClassesFromAnalytesActions.fetchReactionClassesFromAnalyteFailure(
                    { error: error.message },
                  ),
                ),
              ),
            ),
          );
      }),
    );
  },
  { functional: true },
);

export const fetchReactionClassEnrichment = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(ReactionClassEnrichmentsActions.fetchReactionClassEnrichment),
      exhaustMap((action) => {
        return rampService
          .fetchEnrichmentFromReactionClasses(
            action.analytes,
            action.background,
            action.backgroundFile,
          )
          .pipe(
            map(
              (ret: RampReactionClassEnrichmentResponse) => {
                return ReactionClassEnrichmentsActions.fetchReactionClassEnrichmentSuccess(
                  {
                    data: ret,
                  },
                );
              },
              catchError((error: ErrorEvent) =>
                of(
                  ReactionClassEnrichmentsActions.fetchReactionClassEnrichmentFailure(
                    { error: error.message },
                  ),
                ),
              ),
            ),
          );
      }),
    );
  },
  { functional: true },
);

export const filterReactionClassEnrichment = createEffect(
  (
    actions$ = inject(Actions),
    rampService = inject(RampService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(
        ReactionClassEnrichmentsActions.fetchReactionClassEnrichmentSuccess,
        ReactionClassEnrichmentsActions.filterReactionClassEnrichment,
      ),
      concatLatestFrom(() => store.select(getReactionClassEnrichment)),
      mergeMap(([action, dataframe]) => {
        if (dataframe) {
          return rampService
            .filterReactionClassEnrichment(
              dataframe,
              action.pValType,
              action.pValCutoff,
            )
            .pipe(
              map(
                (ret: RampReactionClassEnrichmentResponse) => {
                  return ReactionClassEnrichmentsActions.filterReactionClassEnrichmentSuccess(
                    { data: ret },
                  );
                },
                catchError((error: ErrorEvent) =>
                  of(
                    ReactionClassEnrichmentsActions.filterReactionClassEnrichmentFailure(
                      { error: error.message },
                    ),
                  ),
                ),
              ),
            );
        } else {
          return of(
            MetaboliteEnrichmentsActions.filterEnrichmentFromMetabolitesFailure(
              { error: 'No dataframe available' },
            ),
          );
        }
      }),
    );
  },
  { functional: true },
);

export const fetchReactionClassEnrichmentFile = createEffect(
  (
    actions$ = inject(Actions),
    rampService = inject(RampService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(ReactionClassEnrichmentsActions.fetchReactionClassEnrichmentFile),
      concatLatestFrom(() => store.select(getReactionClassEnrichment)),
      tap(([action, dataframe]) => {
        if (action && dataframe) {
          //     rampService.fetchReactionClassEnrichmentFile(dataframe.data);
        }
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const fetchPathwayAnalysis = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(PathwayEnrichmentsActions.fetchEnrichmentFromPathways),
      exhaustMap((action) => {
        return rampService
          .fetchEnrichmentFromPathways(
            action.analytes,
            action.background,
            action.backgroundFile,
            action.dataSourceExclusion,
          )
          .pipe(
            map(
              (ret: RampPathwayEnrichmentResponse) => {
                ret.background = action.background;
                ret.backgroundFile = action.backgroundFile;
                ret.dataSourceExclusion = action.dataSourceExclusion;
                ret.pValType = action.pValType;
                ret.pValCutoff = Number(action.pValCutoff);
                ret.percAnalyteOverlap = Number(action.percAnalyteOverlap);
                ret.minPathwayToCluster = Number(action.minPathwayToCluster);
                ret.percPathwayOverlap = Number(action.percPathwayOverlap);
                return PathwayEnrichmentsActions.fetchEnrichmentFromPathwaysSuccess(
                  ret,
                );
              },
              catchError((error: ErrorEvent) =>
                of(
                  PathwayEnrichmentsActions.fetchEnrichmentFromPathwaysFailure({
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

export const filterEnrichedPathways = createEffect(
  (
    actions$ = inject(Actions),
    rampService = inject(RampService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(
        PathwayEnrichmentsActions.filterEnrichmentFromPathways,
        PathwayEnrichmentsActions.fetchEnrichmentFromPathwaysSuccess,
      ),
      concatLatestFrom(() => store.select(getCombinedFishersDataframe)),
      mergeMap(([action, dataframe]) => {
        if (dataframe && dataframe?.fishresults?.length) {
          return rampService
            .filterPathwayEnrichment(
              dataframe,
              action.pValType,
              action.pValCutoff,
            )
            .pipe(
              map(
                (ret: RampPathwayEnrichmentResponse) => {
                  return PathwayEnrichmentsActions.filterEnrichmentFromPathwaysSuccess(
                    {
                      percAnalyteOverlap: action.percAnalyteOverlap,
                      minPathwayToCluster: action.minPathwayToCluster,
                      percPathwayOverlap: action.percPathwayOverlap,
                      filteredFishersDataframe: ret.data,
                      ...ret,
                    } as RampPathwayEnrichmentResponse,
                  );
                },
                catchError((error: ErrorEvent) =>
                  of(
                    PathwayEnrichmentsActions.filterEnrichmentFromPathwaysFailure(
                      { error: error.message },
                    ),
                  ),
                ),
              ),
            );
        } else {
          return of(
            PathwayEnrichmentsActions.filterEnrichmentFromPathwaysFailure({
              error: 'no dataframe available',
            }),
          );
        }
      }),
    );
  },
  { functional: true },
);

export const fetchPathwayCluster = createEffect(
  (
    actions$ = inject(Actions),
    rampService = inject(RampService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(
        PathwayEnrichmentsActions.filterEnrichmentFromPathwaysSuccess,
        PathwayEnrichmentsActions.fetchClusterFromEnrichment,
      ),
      concatLatestFrom(() => store.select(getFilteredFishersDataframe)),
      mergeMap(([action, dataframe]) => {
        if (dataframe) {
          return rampService
            .getClusteredData(
              dataframe,
              action.percAnalyteOverlap,
              action.minPathwayToCluster,
              action.percPathwayOverlap,
            )
            .pipe(
              map(
                (ret: {
                  data: RampPathwayEnrichmentResponse;
                  plotUrl: string | undefined;
                }) => {
                  return PathwayEnrichmentsActions.fetchClusterFromEnrichmentSuccess(
                    {
                      data: ret.data.data,
                      clusterImageUrl: ret.plotUrl,
                      query: ret.data.query,
                      dataAsDataProperty: ret.data.dataAsDataProperty,
                    },
                  );
                },
                catchError((error: ErrorEvent) =>
                  of(
                    PathwayEnrichmentsActions.fetchClusterFromEnrichmentFailure(
                      { error: error.message },
                    ),
                  ),
                ),
              ),
            );
        } else
          return of(
            PathwayEnrichmentsActions.fetchClusterFromEnrichmentFailure({
              error: 'no dataframe available',
            }),
          );
      }),
    );
  },
  { functional: true },
);

export const fetchChemicalAnalysis = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(MetaboliteEnrichmentsActions.fetchEnrichmentFromMetabolites),
      exhaustMap((action) => {
        return rampService
          .fetchEnrichmentFromMetabolites(
            action.metabolites,
            action.background,
            action.backgroundFile,
          )
          .pipe(
            map(
              (ret: RampChemicalEnrichmentResponse) => {
                return MetaboliteEnrichmentsActions.fetchEnrichmentFromMetabolitesSuccess(
                  {
                    data: ret,
                  },
                );
              },
              catchError((error: ErrorEvent) =>
                of(
                  MetaboliteEnrichmentsActions.fetchEnrichmentFromMetabolitesFailure(
                    { error: error.message },
                  ),
                ),
              ),
            ),
          );
      }),
    );
  },
  { functional: true },
);

export const filterEnrichedChemicalClasses = createEffect(
  (
    actions$ = inject(Actions),
    rampService = inject(RampService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(
        MetaboliteEnrichmentsActions.fetchEnrichmentFromMetabolitesSuccess,
        MetaboliteEnrichmentsActions.filterEnrichmentFromMetabolites,
      ),
      concatLatestFrom(() => store.select(getChemicalEnrichment)),
      mergeMap(([action, dataframe]) => {
        if (dataframe) {
          return rampService
            .filterMetaboliteEnrichment(
              dataframe.data as RampChemicalEnrichmentResponse,
              action.pValType,
              action.pValCutoff,
            )
            .pipe(
              map(
                (ret: RampChemicalEnrichmentResponse) => {
                  return MetaboliteEnrichmentsActions.filterEnrichmentFromMetabolitesSuccess(
                    { data: ret },
                  );
                },
                catchError((error: ErrorEvent) =>
                  of(
                    MetaboliteEnrichmentsActions.filterEnrichmentFromMetabolitesFailure(
                      { error: error.message },
                    ),
                  ),
                ),
              ),
            );
        } else {
          return of(
            MetaboliteEnrichmentsActions.filterEnrichmentFromMetabolitesFailure(
              { error: 'No dataframe available' },
            ),
          );
        }
      }),
    );
  },
  { functional: true },
);

export const fetchEnrichmentFromMetabolitesFile = createEffect(
  (
    actions$ = inject(Actions),
    rampService = inject(RampService),
    store = inject(Store),
  ) => {
    return actions$.pipe(
      ofType(MetaboliteEnrichmentsActions.fetchEnrichmentFromMetabolitesFile),
      concatLatestFrom(() => store.select(getChemicalEnrichment)),
      tap(([action, dataframe]) => {
        if (action && dataframe) {
          rampService.fetchEnrichmentFromMetabolitesFile(
            dataframe.enriched_chemical_class_list,
          );
        }
      }),
    );
  },
  { functional: true, dispatch: false },
);

export const runIdentifierHarmonization = createEffect(
  (actions$ = inject(Actions), rampService = inject(RampService)) => {
    return actions$.pipe(
      ofType(IdentifierHarmonizationActions.runIdentifierHarmonization),
      exhaustMap((action) => {
        return rampService
          .runIdentifierHarmonization(action.files, action.manifest)
          .pipe(
            map(
              (ret) => {
                return IdentifierHarmonizationActions.runIdentifierHarmonizationSuccess();
              },
              catchError((error: ErrorEvent) =>
                of(
                  IdentifierHarmonizationActions.runIdentifierHarmonizationFailure(
                    { error: error.message },
                  ),
                ),
              ),
            ),
          );
      }),
    );
  },
  { functional: true },
);
