import { inject } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client';
import {
  ClinicalTrial,
  FETCHTRIALDETAILS,
  FETCHTRIALSQUERY,
  FETCHTRIALSVARIABLES,
  TRIALDETAILSVARIABLES,
} from '@ncats-frontend-library/models/rdas';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { filter, map, mergeMap } from 'rxjs';
import { TrialService } from '../trial.service';
import { FetchTrialActions, FetchTrialsListActions } from './trials.actions';

export const fetchTrial$ = createEffect(
  (actions$ = inject(Actions), trialService = inject(TrialService)) => {
    return actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) => {
        return (
          !r.payload.routerState.url.includes('/trials') &&
          r.payload.routerState.url.startsWith('/trial')
        );
      }),
      map(
        (r: RouterNavigationAction) => r.payload.routerState.root.queryParams,
      ),
      mergeMap((params: { nctid?: string }) => {
        TRIALDETAILSVARIABLES.ctwhere.NCTId = params.nctid;
        return trialService
          .fetchTrials(FETCHTRIALDETAILS, TRIALDETAILSVARIABLES)
          .pipe(
            map((trialData: ApolloQueryResult<unknown>) => {
              const data: { clinicalTrials: ClinicalTrial[] } =
                trialData.data as { clinicalTrials: ClinicalTrial[] };
              if (data) {
                const trial: ClinicalTrial = new ClinicalTrial(
                  data.clinicalTrials[0],
                );
                return FetchTrialActions.fetchTrialSuccess({ trial: trial });
              } else
                return FetchTrialActions.fetchTrialFailure({
                  error: 'No Disease found',
                });
            }),
          );
      }),
    );
  },
  { functional: true },
);

export const fetchTrialList$ = createEffect(
  (actions$ = inject(Actions), trialService = inject(TrialService)) => {
    return actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigationAction) => {
        return r.payload.routerState.url.startsWith('/disease');
      }),
      map((r: RouterNavigationAction) => r.payload.routerState.root),
      mergeMap((root: ActivatedRouteSnapshot) => {
        FETCHTRIALSVARIABLES.ctwhere.mappedToGardGards_SOME.GardId =
          root.queryParams['id'];
        FETCHTRIALSVARIABLES.ctfilters.mappedToGardGards_SOME.GardId =
          root.queryParams['id'];
        if (root.fragment === 'trials') {
          _setTrialsOptions(root.queryParams);
        }
        return trialService
          .fetchTrials(FETCHTRIALSQUERY, FETCHTRIALSVARIABLES)
          .pipe(
            map((trialsData: ApolloQueryResult<unknown>) => {
              const trials: {
                clinicalTrials: ClinicalTrial[];
                count: { count: number };
                allCount: { count: number };
              } = trialsData.data as {
                clinicalTrials: ClinicalTrial[];
                count: { count: number };
                allCount: { count: number };
              };
              const trialsList = trials.clinicalTrials.map(
                (trial: Partial<ClinicalTrial>) => new ClinicalTrial(trial),
              );
              if (trialsList) {
                return FetchTrialsListActions.fetchTrialsListSuccess({
                  trials: trialsList,
                  allTrialCount: trials.allCount.count,
                });
              } else
                return FetchTrialsListActions.fetchTrialsListFailure({
                  error: 'No Disease found',
                });
            }),
          );
      }),
    );
  },
  { functional: true },
);

function _setTrialsOptions(options: {
  limit?: number;
  offset?: number;
  GardId?: string;
  id?: string;
  OverallStatus?: string[];
  StudyType?: string[];
  Phase?: string[];
}) {
  FETCHTRIALSVARIABLES.ctoptions.limit = <number>options['limit']
    ? <number>options['limit']
    : 10;
  if (<number>options['offset']) {
    FETCHTRIALSVARIABLES.ctoptions.offset = <number>options['offset'] * 1;
  } else {
    FETCHTRIALSVARIABLES.ctoptions.offset = 0;
  }
  if (options['GardId']) {
    FETCHTRIALSVARIABLES.ctwhere.mappedToGardGards_SOME.GardId = <string>(
      options['GardId']
    );
  }
  if (options['OverallStatus'] && options['OverallStatus']?.length > 0) {
    FETCHTRIALSVARIABLES.ctfilters.OverallStatus_IN = options['OverallStatus'];
  } else {
    FETCHTRIALSVARIABLES.ctfilters.OverallStatus_IN = undefined;
  }
  if (options['StudyType'] && options['StudyType']?.length > 0) {
    FETCHTRIALSVARIABLES.ctfilters.StudyType_IN = options['StudyType'];
  } else {
    FETCHTRIALSVARIABLES.ctfilters.StudyType_IN = undefined;
  }
  if (options['Phase'] && options['Phase']?.length > 0) {
    FETCHTRIALSVARIABLES.ctfilters.Phase_IN = options['Phase'];
  } else {
    FETCHTRIALSVARIABLES.ctfilters.Phase_IN = undefined;
  }
}
