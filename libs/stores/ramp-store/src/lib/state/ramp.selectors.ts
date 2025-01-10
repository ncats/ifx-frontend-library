import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RAMP_STORE_FEATURE_KEY, State, rampAdapter } from './ramp.reducer';

// Lookup the 'Ramp' feature state managed by NgRx
export const getRampState = createFeatureSelector<State>(
  RAMP_STORE_FEATURE_KEY,
);

const { selectAll, selectEntities } = rampAdapter.getSelectors();

export const getRampLoaded = createSelector(
  getRampState,
  (state: State) => state.loading,
);

export const getRampError = createSelector(
  getRampState,
  (state: State) => state.error,
);

export const getAllRampEntity = createSelector(getRampState, (state: State) =>
  selectAll(state),
);

export const getAllRamp = createSelector(getRampState, (state: State) => state);

export const getRampEntities = createSelector(getRampState, (state: State) =>
  selectEntities(state),
);

export const getSelectedId = createSelector(
  getRampState,
  (state: State) => state.selectedId,
);

export const getSourceVersions = createSelector(
  getRampState,
  (state: State) => {
    return state.sourceVersions;
  },
);

export const getSupportedIds = createSelector(
  getRampState,
  (state: State) => state.supportedIds,
);

export const getEntityCounts = createSelector(
  getRampState,
  (state: State) => state.entityCounts,
);

export const getRampApi = createSelector(
  getRampState,
  (state: State) => state.api,
);

export const getMetaboliteIntersects = createSelector(
  getRampState,
  (state: State) => state.metaboliteIntersects,
);
export const getGeneIntersects = createSelector(
  getRampState,
  (state: State) => state.geneIntersects,
);

export const getOntologies = createSelector(
  getRampState,
  (state: State) => state.ontologies,
);

export const getontologiesList = createSelector(
  getRampState,
  (state: State) => state.ontologiesList,
);

export const getAnalytes = createSelector(
  getRampState,
  (state: State) => state.analytes,
);

export const getPathways = createSelector(
  getRampState,
  (state: State) => state.pathways,
);

export const getMetabolites = createSelector(
  getRampState,
  (state: State) => state.metabolitesFromOntologies,
);

export const getReactions = createSelector(
  getRampState,
  (state: State) => state.reactions,
);

export const getReactionClasses = createSelector(
  getRampState,
  (state: State) => state.reactionClasses,
);
export const getCommonReactions = createSelector(
  getRampState,
  (state: State) => state.commonReactions,
);

export const getClasses = createSelector(
  getRampState,
  (state: State) => state.metClasses,
);

export const getProperties = createSelector(
  getRampState,
  (state: State) => state.properties,
);

export const getChemicalEnrichment = createSelector(
  getRampState,
  (state: State) => state.chemicalEnrichments,
);

export const getPathwayEnrichment = createSelector(
  getRampState,
  (state: State) => state.pathwayEnrichments,
);

export const getCombinedFishersDataframe = createSelector(
  getRampState,
  (state: State) => state.combinedFishersDataframe,
);

export const getFilteredFishersDataframe = createSelector(
  getRampState,
  (state: State) => state.filteredFishersDataframe,
);

/*export const getEnrichedChemicalClass = createSelector(
  getRampState,
 // (state: State) => state.chemicalEnrichments,
);*/

export const getClusterPlot = createSelector(
  getRampState,
  (state: State) => state.clusterPlot,
);

export const getBiochemicalPathwaysResults = createSelector(
  getPathways,
  getPathwayEnrichment,
  getClusterPlot,
  (getPathways, getPathwayEnrichment, getClusterPlot) => {
    return {
      pathways: getPathways,
      pathwayEnrichment: getPathwayEnrichment,
      clusterPlot: getClusterPlot,
    };
  },
);

export const getReactionResults = createSelector(
  getReactions,
  getReactionClasses,
  getCommonReactions,
  (getReactions, getReactionClasses, getCommonReactions) => {
    return {
      reactions: getReactions,
      reactionClasses: getReactionClasses,
      commonReactions: getCommonReactions,
    };
  },
);

export const getChemicalPropertyResults = createSelector(
  getProperties,
  getClasses,
  getChemicalEnrichment,
  (getProperties, getClasses, getChemicalEnrichment) => {
    return {
      chemicalProperties: getProperties,
      chemicalClasses: getClasses,
      chemicalEnrichment: getChemicalEnrichment,
    };
  },
);
