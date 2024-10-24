import {
  FilterCategory,
  OpenApiPath,
} from '@ncats-frontend-library/models/utils';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import {
  Analyte,
  Classes,
  EntityCount,
  FisherResult,
  FishersDataframe,
  Metabolite,
  Ontology,
  Pathway,
  Properties,
  RampResponse,
  RampQuery,
  Reaction,
  SourceVersion,
  RampChemicalEnrichmentResponse,
  CommonAnalyte,
  ReactionClass,
} from 'ramp';

import {
  AnalyteFromPathwayActions,
  ClassesFromMetabolitesActions,
  CommonReactionAnalyteActions,
  LoadRampActions,
  MetaboliteEnrichmentsActions,
  MetaboliteFromOntologyActions,
  OntologyFromMetaboliteActions,
  PathwayEnrichmentsActions,
  PathwayFromAnalyteActions,
  PropertiesFromMetaboliteActions,
  ReactionClassesFromAnalytesActions,
  ReactionsFromAnalytesActions,
} from './ramp.actions';

export const RAMP_STORE_FEATURE_KEY = 'rampStore';

export interface RampEntity {
  loading: false;
}

export interface State extends EntityState<RampEntity> {
  selectedId?: string | number; // which RampStore record has been selected
  loading: boolean; // has the RampStore list been loaded
  error?: string | null; // last known error (if any)
  supportedIds?: { analyteType: string; idTypes: string[] }[];
  sourceVersions: SourceVersion[];
  entityCounts: EntityCount[];
  metaboliteIntersects: { id: string; sets: string[]; size: number }[];
  geneIntersects: { id: string; sets: string[]; size: number }[];
  databaseUrl?: string;
  ontologies?: RampResponse<Ontology>;
  analytes?: RampResponse<Analyte>;
  pathways?: RampResponse<Pathway>;
  commonReactions?: RampResponse<CommonAnalyte>;
  reactions?: RampResponse<Reaction>;
  reactionClasses?: RampResponse<ReactionClass>;
  metabolites?: RampResponse<Metabolite>;
  ontologiesList?: FilterCategory[];

  metClasses?: RampResponse<Classes>;

  properties?: RampResponse<Properties>;

  chemicalEnrichments?: RampChemicalEnrichmentResponse;

  pathwayEnrichments?: {
    data: FisherResult[];
    plot?: string[];
    query?: RampQuery;
    dataframe?: FishersDataframe;
    openModal?: boolean;
  };

  filteredFishersDataframe?: FishersDataframe;

  combinedFishersDataframe?: FishersDataframe;

  clusterPlot?: string;
  openModal?: boolean;
  api?: Map<string, OpenApiPath[]>;
}

export interface RampPartialState {
  readonly [RAMP_STORE_FEATURE_KEY]: State;
}

export const rampAdapter: EntityAdapter<RampEntity> =
  createEntityAdapter<RampEntity>();

export const initialState: State = rampAdapter.getInitialState({
  // set initial required properties
  loading: false,
  entityCounts: [],
  sourceVersions: [],
  geneIntersects: [] as { id: string; sets: string[]; size: number }[],
  metaboliteIntersects: [] as { id: string; sets: string[]; size: number }[],
});

export const rampReducer = createReducer(
  initialState,

  on(LoadRampActions.loadRamp, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),

  on(LoadRampActions.loadRampStats, (state) => ({
    ...state,
    error: null,
  })),

  on(
    OntologyFromMetaboliteActions.fetchOntologiesFromMetabolites,
    AnalyteFromPathwayActions.fetchAnalytesFromPathways,
    PathwayEnrichmentsActions.fetchPathwaysFromAnalytes,
    PathwayFromAnalyteActions.fetchPathwaysFromAnalytes,
    MetaboliteFromOntologyActions.fetchMetabolitesFromOntologies,
    CommonReactionAnalyteActions.fetchCommonReactionAnalytes,
    ClassesFromMetabolitesActions.fetchClassesFromMetabolites,
    PropertiesFromMetaboliteActions.fetchPropertiesFromMetabolites,
    MetaboliteEnrichmentsActions.fetchEnrichmentFromMetabolites,
    PathwayEnrichmentsActions.fetchEnrichmentFromPathways,
    (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
  ),

  on(LoadRampActions.loadRampStatsSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    sourceVersions: data.sourceVersions,
    entityCounts: data.entityCounts,
    metaboliteIntersects: data.metaboliteIntersects,
    geneIntersects: data.geneIntersects,
    databaseUrl: data.databaseUrl,
  })),

  /*

  on(LoadRampActions.loadRampSuccess, (state, { data }) => ({
    ...state,
    loading: false,
    supportedIds: data,
  })),
*/

  on(LoadRampActions.loadRampSuccess, (state, { supportedIds }) => ({
    ...state,
    loading: false,
    supportedIds: supportedIds,
  })),

  on(LoadRampActions.loadSourceVersionsSuccess, (state, { versions }) => ({
    ...state,
    loading: false,
    sourceVersions: versions,
  })),

  on(LoadRampActions.loadRampApiSuccess, (state, { api }) => ({
    ...state,
    loading: false,
    api: api,
  })),

  on(
    OntologyFromMetaboliteActions.fetchOntologiesFromMetabolitesSuccess,
    (state, { data, query, dataframe }) => ({
      ...state,
      loading: false,
      ontologies: { data, query, dataframe },
    }),
  ),

  on(
    AnalyteFromPathwayActions.fetchAnalytesFromPathwaysSuccess,
    (state, { data, query, dataframe }) => ({
      ...state,
      loading: false,
      analytes: { data, query, dataframe },
    }),
  ),

  on(
    PathwayEnrichmentsActions.fetchPathwaysFromAnalytesSuccess,
    PathwayFromAnalyteActions.fetchPathwaysFromAnalytesSuccess,
    (state, { data, query, dataframe }) => {
      return {
        ...state,
        loading: false,
        pathways: { data, query, dataframe },
      };
    },
  ),

  on(
    CommonReactionAnalyteActions.fetchCommonReactionAnalytesSuccess,
    (state, { data, query, dataframe }) => ({
      ...state,
      loading: false,
      commonReactions: { data, query, dataframe },
    }),
  ),

  on(
    ReactionsFromAnalytesActions.fetchReactionsFromAnalytesSuccess,
    (state, { data, query, dataframe, plot }) => ({
      ...state,
      loading: false,
      reactions: { data, query, dataframe, plot },
    }),
  ),

  on(
    ReactionClassesFromAnalytesActions.fetchReactionClassesFromAnalyteSuccess,
    (state, { data, query, dataframe }) => ({
      ...state,
      loading: false,
      reactionClasses: { data, query, dataframe },
    }),
  ),

  on(
    MetaboliteFromOntologyActions.fetchMetabolitesFromOntologiesSuccess,
    (state, { data, query, dataframe }) => ({
      ...state,
      loading: false,
      metabolites: { data, query, dataframe },
    }),
  ),

  on(
    MetaboliteFromOntologyActions.fetchOntologiesSuccess,
    (state, { data }) => ({
      ...state,
      loading: false,
      ontologiesList: data,
    }),
  ),

  on(
    ClassesFromMetabolitesActions.fetchClassesFromMetabolitesSuccess,
    MetaboliteEnrichmentsActions.fetchClassesFromMetabolitesSuccess,
    (state, { data, query, dataframe }) => ({
      ...state,
      loading: false,
      metClasses: { data, query, dataframe },
    }),
  ),

  on(
    PropertiesFromMetaboliteActions.fetchPropertiesFromMetabolitesSuccess,
    (state, { data, query, dataframe }) => ({
      ...state,
      loading: false,
      properties: { data, query, dataframe },
    }),
  ),

  on(
    MetaboliteEnrichmentsActions.filterEnrichmentFromMetabolitesSuccess,
    MetaboliteEnrichmentsActions.fetchEnrichmentFromMetabolitesSuccess,
    (state, { data }) => {
      return {
        ...state,
        loading: false,
        chemicalEnrichments: data,
        openModal: true,
      };
    },
  ),

  on(
    PathwayEnrichmentsActions.fetchEnrichmentFromPathwaysSuccess,
    (state, { data, query, combinedFishersDataframe }) => {
      return {
        ...state,
        loading: false,
        pathwayEnrichments: { data, query },
        combinedFishersDataframe: combinedFishersDataframe,
        filteredFishersDataframe: undefined,
        clusterPlot: '',
      };
    },
  ),

  on(
    PathwayEnrichmentsActions.filterEnrichmentFromPathwaysSuccess,
    (state, { data, query, filteredFishersDataframe }) => {
      return {
        ...state,
        loading: false,
        pathwayEnrichments: {
          data,
          query,
          dataframe: filteredFishersDataframe,
          openModal: true,
        },
        filteredFishersDataframe: filteredFishersDataframe,
        clusterPlot: '',
      };
    },
  ),

  on(
    PathwayEnrichmentsActions.fetchClusterFromEnrichmentSuccess,
    (state, { data, plot, query, dataframe }) => {
      return {
        ...state,
        loading: false,
        pathwayEnrichments: { data, query, dataframe },
        clusterPlot: plot,
        openModal: true,
      };
    },
  ),

  on(
    LoadRampActions.loadRampFailure,
    LoadRampActions.loadRampApiFailure,
    LoadRampActions.loadRampStatsFailure,
    LoadRampActions.loadSourceVersionsFailure,
    PathwayFromAnalyteActions.fetchPathwaysFromAnalytesFailure,
    OntologyFromMetaboliteActions.fetchOntologiesFromMetabolitesFailure,
    MetaboliteFromOntologyActions.fetchMetaboliteFromOntologiesFailure,
    MetaboliteFromOntologyActions.fetchOntologiesFailure,
    CommonReactionAnalyteActions.fetchCommonReactionAnalytesFailure,
    ReactionsFromAnalytesActions.fetchReactionsFromAnalytesFailure,
    ReactionClassesFromAnalytesActions.fetchReactionClassesFromAnalyteFailure,
    ClassesFromMetabolitesActions.fetchClassesFromMetabolitesFailure,
    PropertiesFromMetaboliteActions.fetchPropertiesFromMetabolitesFailure,
    MetaboliteEnrichmentsActions.fetchEnrichmentFromMetabolitesFailure,
    MetaboliteEnrichmentsActions.filterEnrichmentFromMetabolitesFailure,
    PathwayEnrichmentsActions.fetchPathwaysFromAnalytesFailure,
    PathwayEnrichmentsActions.fetchClusterFromEnrichmentFailure,
    PathwayEnrichmentsActions.fetchEnrichmentFromPathwaysFailure,
    PathwayEnrichmentsActions.filterEnrichmentFromPathwaysFailure,
    (state, { error }) => {
      // console.log(error);
      return {
        ...state,
        loading: false,
        error,
      };
    },
  ),
);

export function reducer(state: State | undefined, action: Action) {
  return rampReducer(state, action);
}
