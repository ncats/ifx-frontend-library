/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type AgentHasAffiliationConnectionAggregateInput = {
  AND?: Array<AgentHasAffiliationConnectionAggregateInput> | null | undefined;
  NOT?: AgentHasAffiliationConnectionAggregateInput | null | undefined;
  OR?: Array<AgentHasAffiliationConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: AgentHasAffiliationNodeAggregationWhereInput | null | undefined;
};

export type AgentHasAffiliationConnectionFilters = {
  /** Filter Agents by aggregating results on related AgentHasAffiliationConnections */
  aggregate?: AgentHasAffiliationConnectionAggregateInput | null | undefined;
  /** Return Agents where all of the related AgentHasAffiliationConnections match this filter */
  all?: AgentHasAffiliationConnectionWhere | null | undefined;
  /** Return Agents where none of the related AgentHasAffiliationConnections match this filter */
  none?: AgentHasAffiliationConnectionWhere | null | undefined;
  /** Return Agents where one of the related AgentHasAffiliationConnections match this filter */
  single?: AgentHasAffiliationConnectionWhere | null | undefined;
  /** Return Agents where some of the related AgentHasAffiliationConnections match this filter */
  some?: AgentHasAffiliationConnectionWhere | null | undefined;
};

export type AgentHasAffiliationConnectionWhere = {
  AND?: Array<AgentHasAffiliationConnectionWhere> | null | undefined;
  NOT?: AgentHasAffiliationConnectionWhere | null | undefined;
  OR?: Array<AgentHasAffiliationConnectionWhere> | null | undefined;
  node?: OrganizationWhere | null | undefined;
};

export type AgentHasAffiliationNodeAggregationWhereInput = {
  AND?: Array<AgentHasAffiliationNodeAggregationWhereInput> | null | undefined;
  NOT?: AgentHasAffiliationNodeAggregationWhereInput | null | undefined;
  OR?: Array<AgentHasAffiliationNodeAggregationWhereInput> | null | undefined;
  _idx_key?: StringScalarAggregationFilters | null | undefined;
  name?: StringScalarAggregationFilters | null | undefined;
};

export type AgentRelationshipFilters = {
  /** Filter type where all of the related Agents match this filter */
  all?: AgentWhere | null | undefined;
  /** Filter type where none of the related Agents match this filter */
  none?: AgentWhere | null | undefined;
  /** Filter type where one of the related Agents match this filter */
  single?: AgentWhere | null | undefined;
  /** Filter type where some of the related Agents match this filter */
  some?: AgentWhere | null | undefined;
};

export type AgentWhere = {
  AND?: Array<AgentWhere> | null | undefined;
  NOT?: AgentWhere | null | undefined;
  OR?: Array<AgentWhere> | null | undefined;
  _idx_key?: StringScalarFilters | null | undefined;
  contactEmail?: StringListFilters | null | undefined;
  firstName?: StringScalarFilters | null | undefined;
  fullName?: StringScalarFilters | null | undefined;
  hasAffiliation?: OrganizationRelationshipFilters | null | undefined;
  hasAffiliationConnection?: AgentHasAffiliationConnectionFilters | null | undefined;
  lastName?: StringScalarFilters | null | undefined;
  orc_id?: StringScalarFilters | null | undefined;
  pi_id?: StringScalarFilters | null | undefined;
};

export type AnnotationRelationshipFilters = {
  /** Filter type where all of the related Annotations match this filter */
  all?: AnnotationWhere | null | undefined;
  /** Filter type where none of the related Annotations match this filter */
  none?: AnnotationWhere | null | undefined;
  /** Filter type where one of the related Annotations match this filter */
  single?: AnnotationWhere | null | undefined;
  /** Filter type where some of the related Annotations match this filter */
  some?: AnnotationWhere | null | undefined;
};

export type AnnotationWhere = {
  AND?: Array<AnnotationWhere> | null | undefined;
  NOT?: AnnotationWhere | null | undefined;
  OR?: Array<AnnotationWhere> | null | undefined;
  semanticTypeNames?: StringListFilters | null | undefined;
  semanticTypes?: StringListFilters | null | undefined;
  semanticTypesNames?: StringListFilters | null | undefined;
  umlsConcept?: StringScalarFilters | null | undefined;
  umlsCui?: StringScalarFilters | null | undefined;
};

export type ArticleHasAuthorConnectionAggregateInput = {
  AND?: Array<ArticleHasAuthorConnectionAggregateInput> | null | undefined;
  NOT?: ArticleHasAuthorConnectionAggregateInput | null | undefined;
  OR?: Array<ArticleHasAuthorConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ArticleHasAuthorNodeAggregationWhereInput | null | undefined;
};

export type ArticleHasAuthorConnectionFilters = {
  /** Filter Articles by aggregating results on related ArticleHasAuthorConnections */
  aggregate?: ArticleHasAuthorConnectionAggregateInput | null | undefined;
  /** Return Articles where all of the related ArticleHasAuthorConnections match this filter */
  all?: ArticleHasAuthorConnectionWhere | null | undefined;
  /** Return Articles where none of the related ArticleHasAuthorConnections match this filter */
  none?: ArticleHasAuthorConnectionWhere | null | undefined;
  /** Return Articles where one of the related ArticleHasAuthorConnections match this filter */
  single?: ArticleHasAuthorConnectionWhere | null | undefined;
  /** Return Articles where some of the related ArticleHasAuthorConnections match this filter */
  some?: ArticleHasAuthorConnectionWhere | null | undefined;
};

export type ArticleHasAuthorConnectionWhere = {
  AND?: Array<ArticleHasAuthorConnectionWhere> | null | undefined;
  NOT?: ArticleHasAuthorConnectionWhere | null | undefined;
  OR?: Array<ArticleHasAuthorConnectionWhere> | null | undefined;
  node?: AgentWhere | null | undefined;
};

export type ArticleHasAuthorNodeAggregationWhereInput = {
  AND?: Array<ArticleHasAuthorNodeAggregationWhereInput> | null | undefined;
  NOT?: ArticleHasAuthorNodeAggregationWhereInput | null | undefined;
  OR?: Array<ArticleHasAuthorNodeAggregationWhereInput> | null | undefined;
  _idx_key?: StringScalarAggregationFilters | null | undefined;
  firstName?: StringScalarAggregationFilters | null | undefined;
  fullName?: StringScalarAggregationFilters | null | undefined;
  lastName?: StringScalarAggregationFilters | null | undefined;
  orc_id?: StringScalarAggregationFilters | null | undefined;
  pi_id?: StringScalarAggregationFilters | null | undefined;
};

export type ArticleHasEpidemiologicalAnnotationConnectionAggregateInput = {
  AND?: Array<ArticleHasEpidemiologicalAnnotationConnectionAggregateInput> | null | undefined;
  NOT?: ArticleHasEpidemiologicalAnnotationConnectionAggregateInput | null | undefined;
  OR?: Array<ArticleHasEpidemiologicalAnnotationConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ArticleHasEpidemiologicalAnnotationNodeAggregationWhereInput | null | undefined;
};

export type ArticleHasEpidemiologicalAnnotationConnectionFilters = {
  /** Filter Articles by aggregating results on related ArticleHasEpidemiologicalAnnotationConnections */
  aggregate?: ArticleHasEpidemiologicalAnnotationConnectionAggregateInput | null | undefined;
  /** Return Articles where all of the related ArticleHasEpidemiologicalAnnotationConnections match this filter */
  all?: ArticleHasEpidemiologicalAnnotationConnectionWhere | null | undefined;
  /** Return Articles where none of the related ArticleHasEpidemiologicalAnnotationConnections match this filter */
  none?: ArticleHasEpidemiologicalAnnotationConnectionWhere | null | undefined;
  /** Return Articles where one of the related ArticleHasEpidemiologicalAnnotationConnections match this filter */
  single?: ArticleHasEpidemiologicalAnnotationConnectionWhere | null | undefined;
  /** Return Articles where some of the related ArticleHasEpidemiologicalAnnotationConnections match this filter */
  some?: ArticleHasEpidemiologicalAnnotationConnectionWhere | null | undefined;
};

export type ArticleHasEpidemiologicalAnnotationConnectionWhere = {
  AND?: Array<ArticleHasEpidemiologicalAnnotationConnectionWhere> | null | undefined;
  NOT?: ArticleHasEpidemiologicalAnnotationConnectionWhere | null | undefined;
  OR?: Array<ArticleHasEpidemiologicalAnnotationConnectionWhere> | null | undefined;
  node?: EpidemiologyAnnotationWhere | null | undefined;
};

export type ArticleHasEpidemiologicalAnnotationNodeAggregationWhereInput = {
  AND?: Array<ArticleHasEpidemiologicalAnnotationNodeAggregationWhereInput> | null | undefined;
  NOT?: ArticleHasEpidemiologicalAnnotationNodeAggregationWhereInput | null | undefined;
  OR?: Array<ArticleHasEpidemiologicalAnnotationNodeAggregationWhereInput> | null | undefined;
  _composite_key?: StringScalarAggregationFilters | null | undefined;
  dateCreatedByRDAS?: StringScalarAggregationFilters | null | undefined;
  lastUpdatedByRDAS?: StringScalarAggregationFilters | null | undefined;
};

export type ArticleHasJournalConnectionAggregateInput = {
  AND?: Array<ArticleHasJournalConnectionAggregateInput> | null | undefined;
  NOT?: ArticleHasJournalConnectionAggregateInput | null | undefined;
  OR?: Array<ArticleHasJournalConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ArticleHasJournalNodeAggregationWhereInput | null | undefined;
};

export type ArticleHasJournalConnectionFilters = {
  /** Filter Articles by aggregating results on related ArticleHasJournalConnections */
  aggregate?: ArticleHasJournalConnectionAggregateInput | null | undefined;
  /** Return Articles where all of the related ArticleHasJournalConnections match this filter */
  all?: ArticleHasJournalConnectionWhere | null | undefined;
  /** Return Articles where none of the related ArticleHasJournalConnections match this filter */
  none?: ArticleHasJournalConnectionWhere | null | undefined;
  /** Return Articles where one of the related ArticleHasJournalConnections match this filter */
  single?: ArticleHasJournalConnectionWhere | null | undefined;
  /** Return Articles where some of the related ArticleHasJournalConnections match this filter */
  some?: ArticleHasJournalConnectionWhere | null | undefined;
};

export type ArticleHasJournalConnectionWhere = {
  AND?: Array<ArticleHasJournalConnectionWhere> | null | undefined;
  NOT?: ArticleHasJournalConnectionWhere | null | undefined;
  OR?: Array<ArticleHasJournalConnectionWhere> | null | undefined;
  node?: JournalWhere | null | undefined;
};

export type ArticleHasJournalNodeAggregationWhereInput = {
  AND?: Array<ArticleHasJournalNodeAggregationWhereInput> | null | undefined;
  NOT?: ArticleHasJournalNodeAggregationWhereInput | null | undefined;
  OR?: Array<ArticleHasJournalNodeAggregationWhereInput> | null | undefined;
  essn?: StringScalarAggregationFilters | null | undefined;
  issn?: StringScalarAggregationFilters | null | undefined;
  nlmid?: StringScalarAggregationFilters | null | undefined;
  title?: StringScalarAggregationFilters | null | undefined;
};

export type ArticleHasKeywordConnectionAggregateInput = {
  AND?: Array<ArticleHasKeywordConnectionAggregateInput> | null | undefined;
  NOT?: ArticleHasKeywordConnectionAggregateInput | null | undefined;
  OR?: Array<ArticleHasKeywordConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ArticleHasKeywordNodeAggregationWhereInput | null | undefined;
};

export type ArticleHasKeywordConnectionFilters = {
  /** Filter Articles by aggregating results on related ArticleHasKeywordConnections */
  aggregate?: ArticleHasKeywordConnectionAggregateInput | null | undefined;
  /** Return Articles where all of the related ArticleHasKeywordConnections match this filter */
  all?: ArticleHasKeywordConnectionWhere | null | undefined;
  /** Return Articles where none of the related ArticleHasKeywordConnections match this filter */
  none?: ArticleHasKeywordConnectionWhere | null | undefined;
  /** Return Articles where one of the related ArticleHasKeywordConnections match this filter */
  single?: ArticleHasKeywordConnectionWhere | null | undefined;
  /** Return Articles where some of the related ArticleHasKeywordConnections match this filter */
  some?: ArticleHasKeywordConnectionWhere | null | undefined;
};

export type ArticleHasKeywordConnectionWhere = {
  AND?: Array<ArticleHasKeywordConnectionWhere> | null | undefined;
  NOT?: ArticleHasKeywordConnectionWhere | null | undefined;
  OR?: Array<ArticleHasKeywordConnectionWhere> | null | undefined;
  node?: KeywordWhere | null | undefined;
};

export type ArticleHasKeywordNodeAggregationWhereInput = {
  AND?: Array<ArticleHasKeywordNodeAggregationWhereInput> | null | undefined;
  NOT?: ArticleHasKeywordNodeAggregationWhereInput | null | undefined;
  OR?: Array<ArticleHasKeywordNodeAggregationWhereInput> | null | undefined;
  keyword?: StringScalarAggregationFilters | null | undefined;
};

export type ArticleHasMentionInConnectionAggregateInput = {
  AND?: Array<ArticleHasMentionInConnectionAggregateInput> | null | undefined;
  NOT?: ArticleHasMentionInConnectionAggregateInput | null | undefined;
  OR?: Array<ArticleHasMentionInConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ArticleHasMentionInNodeAggregationWhereInput | null | undefined;
};

export type ArticleHasMentionInConnectionFilters = {
  /** Filter Articles by aggregating results on related ArticleHasMentionInConnections */
  aggregate?: ArticleHasMentionInConnectionAggregateInput | null | undefined;
  /** Return Articles where all of the related ArticleHasMentionInConnections match this filter */
  all?: ArticleHasMentionInConnectionWhere | null | undefined;
  /** Return Articles where none of the related ArticleHasMentionInConnections match this filter */
  none?: ArticleHasMentionInConnectionWhere | null | undefined;
  /** Return Articles where one of the related ArticleHasMentionInConnections match this filter */
  single?: ArticleHasMentionInConnectionWhere | null | undefined;
  /** Return Articles where some of the related ArticleHasMentionInConnections match this filter */
  some?: ArticleHasMentionInConnectionWhere | null | undefined;
};

export type ArticleHasMentionInConnectionWhere = {
  AND?: Array<ArticleHasMentionInConnectionWhere> | null | undefined;
  NOT?: ArticleHasMentionInConnectionWhere | null | undefined;
  OR?: Array<ArticleHasMentionInConnectionWhere> | null | undefined;
  node?: DiseaseWhere | null | undefined;
};

export type ArticleHasMentionInNodeAggregationWhereInput = {
  AND?: Array<ArticleHasMentionInNodeAggregationWhereInput> | null | undefined;
  NOT?: ArticleHasMentionInNodeAggregationWhereInput | null | undefined;
  OR?: Array<ArticleHasMentionInNodeAggregationWhereInput> | null | undefined;
  countArticles?: IntScalarAggregationFilters | null | undefined;
  countCoreProjects?: IntScalarAggregationFilters | null | undefined;
  countEpiArticles?: IntScalarAggregationFilters | null | undefined;
  countGenes?: IntScalarAggregationFilters | null | undefined;
  countNhsArticles?: IntScalarAggregationFilters | null | undefined;
  countPhenotypes?: IntScalarAggregationFilters | null | undefined;
  countProjects?: IntScalarAggregationFilters | null | undefined;
  countTrials?: IntScalarAggregationFilters | null | undefined;
  diseaseType?: StringScalarAggregationFilters | null | undefined;
  gardId?: StringScalarAggregationFilters | null | undefined;
  gardName?: StringScalarAggregationFilters | null | undefined;
  medGen?: StringScalarAggregationFilters | null | undefined;
  mondo?: StringScalarAggregationFilters | null | undefined;
  omim?: StringScalarAggregationFilters | null | undefined;
  omimps?: StringScalarAggregationFilters | null | undefined;
  orphanet?: StringScalarAggregationFilters | null | undefined;
  umls?: StringScalarAggregationFilters | null | undefined;
};

export type ArticleHasMeshTermConnectionAggregateInput = {
  AND?: Array<ArticleHasMeshTermConnectionAggregateInput> | null | undefined;
  NOT?: ArticleHasMeshTermConnectionAggregateInput | null | undefined;
  OR?: Array<ArticleHasMeshTermConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ArticleHasMeshTermNodeAggregationWhereInput | null | undefined;
};

export type ArticleHasMeshTermConnectionFilters = {
  /** Filter Articles by aggregating results on related ArticleHasMeshTermConnections */
  aggregate?: ArticleHasMeshTermConnectionAggregateInput | null | undefined;
  /** Return Articles where all of the related ArticleHasMeshTermConnections match this filter */
  all?: ArticleHasMeshTermConnectionWhere | null | undefined;
  /** Return Articles where none of the related ArticleHasMeshTermConnections match this filter */
  none?: ArticleHasMeshTermConnectionWhere | null | undefined;
  /** Return Articles where one of the related ArticleHasMeshTermConnections match this filter */
  single?: ArticleHasMeshTermConnectionWhere | null | undefined;
  /** Return Articles where some of the related ArticleHasMeshTermConnections match this filter */
  some?: ArticleHasMeshTermConnectionWhere | null | undefined;
};

export type ArticleHasMeshTermConnectionWhere = {
  AND?: Array<ArticleHasMeshTermConnectionWhere> | null | undefined;
  NOT?: ArticleHasMeshTermConnectionWhere | null | undefined;
  OR?: Array<ArticleHasMeshTermConnectionWhere> | null | undefined;
  node?: MeshTermWhere | null | undefined;
};

export type ArticleHasMeshTermNodeAggregationWhereInput = {
  AND?: Array<ArticleHasMeshTermNodeAggregationWhereInput> | null | undefined;
  NOT?: ArticleHasMeshTermNodeAggregationWhereInput | null | undefined;
  OR?: Array<ArticleHasMeshTermNodeAggregationWhereInput> | null | undefined;
  meshTerm?: StringScalarAggregationFilters | null | undefined;
};

export type ArticleHasOmimReferenceConnectionAggregateInput = {
  AND?: Array<ArticleHasOmimReferenceConnectionAggregateInput> | null | undefined;
  NOT?: ArticleHasOmimReferenceConnectionAggregateInput | null | undefined;
  OR?: Array<ArticleHasOmimReferenceConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ArticleHasOmimReferenceNodeAggregationWhereInput | null | undefined;
};

export type ArticleHasOmimReferenceConnectionFilters = {
  /** Filter Articles by aggregating results on related ArticleHasOMIMReferenceConnections */
  aggregate?: ArticleHasOmimReferenceConnectionAggregateInput | null | undefined;
  /** Return Articles where all of the related ArticleHasOMIMReferenceConnections match this filter */
  all?: ArticleHasOmimReferenceConnectionWhere | null | undefined;
  /** Return Articles where none of the related ArticleHasOMIMReferenceConnections match this filter */
  none?: ArticleHasOmimReferenceConnectionWhere | null | undefined;
  /** Return Articles where one of the related ArticleHasOMIMReferenceConnections match this filter */
  single?: ArticleHasOmimReferenceConnectionWhere | null | undefined;
  /** Return Articles where some of the related ArticleHasOMIMReferenceConnections match this filter */
  some?: ArticleHasOmimReferenceConnectionWhere | null | undefined;
};

export type ArticleHasOmimReferenceConnectionWhere = {
  AND?: Array<ArticleHasOmimReferenceConnectionWhere> | null | undefined;
  NOT?: ArticleHasOmimReferenceConnectionWhere | null | undefined;
  OR?: Array<ArticleHasOmimReferenceConnectionWhere> | null | undefined;
  node?: OmimRefWhere | null | undefined;
};

export type ArticleHasOmimReferenceNodeAggregationWhereInput = {
  AND?: Array<ArticleHasOmimReferenceNodeAggregationWhereInput> | null | undefined;
  NOT?: ArticleHasOmimReferenceNodeAggregationWhereInput | null | undefined;
  OR?: Array<ArticleHasOmimReferenceNodeAggregationWhereInput> | null | undefined;
  _composite_key?: StringScalarAggregationFilters | null | undefined;
  dateCreatedByRDAS?: StringScalarAggregationFilters | null | undefined;
  lastUpdatedByRDAS?: StringScalarAggregationFilters | null | undefined;
  omimId?: StringScalarAggregationFilters | null | undefined;
  omimName?: StringScalarAggregationFilters | null | undefined;
  omimSections?: StringScalarAggregationFilters | null | undefined;
};

export type ArticleHasPubtatorAnnotationConnectionAggregateInput = {
  AND?: Array<ArticleHasPubtatorAnnotationConnectionAggregateInput> | null | undefined;
  NOT?: ArticleHasPubtatorAnnotationConnectionAggregateInput | null | undefined;
  OR?: Array<ArticleHasPubtatorAnnotationConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ArticleHasPubtatorAnnotationNodeAggregationWhereInput | null | undefined;
};

export type ArticleHasPubtatorAnnotationConnectionFilters = {
  /** Filter Articles by aggregating results on related ArticleHasPubtatorAnnotationConnections */
  aggregate?: ArticleHasPubtatorAnnotationConnectionAggregateInput | null | undefined;
  /** Return Articles where all of the related ArticleHasPubtatorAnnotationConnections match this filter */
  all?: ArticleHasPubtatorAnnotationConnectionWhere | null | undefined;
  /** Return Articles where none of the related ArticleHasPubtatorAnnotationConnections match this filter */
  none?: ArticleHasPubtatorAnnotationConnectionWhere | null | undefined;
  /** Return Articles where one of the related ArticleHasPubtatorAnnotationConnections match this filter */
  single?: ArticleHasPubtatorAnnotationConnectionWhere | null | undefined;
  /** Return Articles where some of the related ArticleHasPubtatorAnnotationConnections match this filter */
  some?: ArticleHasPubtatorAnnotationConnectionWhere | null | undefined;
};

export type ArticleHasPubtatorAnnotationConnectionWhere = {
  AND?: Array<ArticleHasPubtatorAnnotationConnectionWhere> | null | undefined;
  NOT?: ArticleHasPubtatorAnnotationConnectionWhere | null | undefined;
  OR?: Array<ArticleHasPubtatorAnnotationConnectionWhere> | null | undefined;
  node?: PubtatorAnnotationWhere | null | undefined;
};

export type ArticleHasPubtatorAnnotationNodeAggregationWhereInput = {
  AND?: Array<ArticleHasPubtatorAnnotationNodeAggregationWhereInput> | null | undefined;
  NOT?: ArticleHasPubtatorAnnotationNodeAggregationWhereInput | null | undefined;
  OR?: Array<ArticleHasPubtatorAnnotationNodeAggregationWhereInput> | null | undefined;
  _composite_key?: StringScalarAggregationFilters | null | undefined;
  annotationIdentifier?: StringScalarAggregationFilters | null | undefined;
  annotationType?: StringScalarAggregationFilters | null | undefined;
  dateCreatedByRDAS?: StringScalarAggregationFilters | null | undefined;
  lastUpdatedByRDAS?: StringScalarAggregationFilters | null | undefined;
};

export type ArticleHasSubstanceConnectionAggregateInput = {
  AND?: Array<ArticleHasSubstanceConnectionAggregateInput> | null | undefined;
  NOT?: ArticleHasSubstanceConnectionAggregateInput | null | undefined;
  OR?: Array<ArticleHasSubstanceConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ArticleHasSubstanceNodeAggregationWhereInput | null | undefined;
};

export type ArticleHasSubstanceConnectionFilters = {
  /** Filter Articles by aggregating results on related ArticleHasSubstanceConnections */
  aggregate?: ArticleHasSubstanceConnectionAggregateInput | null | undefined;
  /** Return Articles where all of the related ArticleHasSubstanceConnections match this filter */
  all?: ArticleHasSubstanceConnectionWhere | null | undefined;
  /** Return Articles where none of the related ArticleHasSubstanceConnections match this filter */
  none?: ArticleHasSubstanceConnectionWhere | null | undefined;
  /** Return Articles where one of the related ArticleHasSubstanceConnections match this filter */
  single?: ArticleHasSubstanceConnectionWhere | null | undefined;
  /** Return Articles where some of the related ArticleHasSubstanceConnections match this filter */
  some?: ArticleHasSubstanceConnectionWhere | null | undefined;
};

export type ArticleHasSubstanceConnectionWhere = {
  AND?: Array<ArticleHasSubstanceConnectionWhere> | null | undefined;
  NOT?: ArticleHasSubstanceConnectionWhere | null | undefined;
  OR?: Array<ArticleHasSubstanceConnectionWhere> | null | undefined;
  node?: SubstanceWhere | null | undefined;
};

export type ArticleHasSubstanceNodeAggregationWhereInput = {
  AND?: Array<ArticleHasSubstanceNodeAggregationWhereInput> | null | undefined;
  NOT?: ArticleHasSubstanceNodeAggregationWhereInput | null | undefined;
  OR?: Array<ArticleHasSubstanceNodeAggregationWhereInput> | null | undefined;
  name?: StringScalarAggregationFilters | null | undefined;
  registryNumber?: StringScalarAggregationFilters | null | undefined;
};

export type ArticleRelationshipFilters = {
  /** Filter type where all of the related Articles match this filter */
  all?: ArticleWhere | null | undefined;
  /** Filter type where none of the related Articles match this filter */
  none?: ArticleWhere | null | undefined;
  /** Filter type where one of the related Articles match this filter */
  single?: ArticleWhere | null | undefined;
  /** Filter type where some of the related Articles match this filter */
  some?: ArticleWhere | null | undefined;
};

/** Fields to sort Articles by. The order in which sorts are applied is not guaranteed when specifying many fields in one ArticleSort object. */
export type ArticleSort = {
  abstractText?: SortDirection | null | undefined;
  citationCount?: SortDirection | null | undefined;
  dateCreatedByRDAS?: SortDirection | null | undefined;
  doi?: SortDirection | null | undefined;
  firstPublicationDate?: SortDirection | null | undefined;
  fullTextUrls?: SortDirection | null | undefined;
  hasPDF?: SortDirection | null | undefined;
  inEPMC?: SortDirection | null | undefined;
  inPMC?: SortDirection | null | undefined;
  isEpidemiologicalStudy?: SortDirection | null | undefined;
  isNaturalHistoryStudy?: SortDirection | null | undefined;
  isOpenAccess?: SortDirection | null | undefined;
  issue?: SortDirection | null | undefined;
  lastUpdatedDateByRDAS?: SortDirection | null | undefined;
  pubType?: SortDirection | null | undefined;
  publicationYear?: SortDirection | null | undefined;
  pubmedId?: SortDirection | null | undefined;
  title?: SortDirection | null | undefined;
  volume?: SortDirection | null | undefined;
};

export type ArticleWhere = {
  AND?: Array<ArticleWhere> | null | undefined;
  NOT?: ArticleWhere | null | undefined;
  OR?: Array<ArticleWhere> | null | undefined;
  abstractText?: StringScalarFilters | null | undefined;
  citationCount?: IntScalarFilters | null | undefined;
  dateCreatedByRDAS?: StringScalarFilters | null | undefined;
  doi?: StringScalarFilters | null | undefined;
  firstPublicationDate?: StringScalarFilters | null | undefined;
  fullTextUrls?: StringScalarFilters | null | undefined;
  hasAuthor?: AgentRelationshipFilters | null | undefined;
  hasAuthorConnection?: ArticleHasAuthorConnectionFilters | null | undefined;
  hasEpidemiologicalAnnotation?: EpidemiologyAnnotationRelationshipFilters | null | undefined;
  hasEpidemiologicalAnnotationConnection?: ArticleHasEpidemiologicalAnnotationConnectionFilters | null | undefined;
  hasJournal?: JournalRelationshipFilters | null | undefined;
  hasJournalConnection?: ArticleHasJournalConnectionFilters | null | undefined;
  hasKeyword?: KeywordRelationshipFilters | null | undefined;
  hasKeywordConnection?: ArticleHasKeywordConnectionFilters | null | undefined;
  hasMentionIn?: DiseaseRelationshipFilters | null | undefined;
  hasMentionInConnection?: ArticleHasMentionInConnectionFilters | null | undefined;
  hasMeshTerm?: MeshTermRelationshipFilters | null | undefined;
  hasMeshTermConnection?: ArticleHasMeshTermConnectionFilters | null | undefined;
  hasOMIMReference?: OmimRefRelationshipFilters | null | undefined;
  hasOMIMReferenceConnection?: ArticleHasOmimReferenceConnectionFilters | null | undefined;
  hasPDF?: StringScalarFilters | null | undefined;
  hasPubtatorAnnotation?: PubtatorAnnotationRelationshipFilters | null | undefined;
  hasPubtatorAnnotationConnection?: ArticleHasPubtatorAnnotationConnectionFilters | null | undefined;
  hasSubstance?: SubstanceRelationshipFilters | null | undefined;
  hasSubstanceConnection?: ArticleHasSubstanceConnectionFilters | null | undefined;
  inEPMC?: StringScalarFilters | null | undefined;
  inPMC?: StringScalarFilters | null | undefined;
  isEpidemiologicalStudy?: BooleanScalarFilters | null | undefined;
  isNaturalHistoryStudy?: BooleanScalarFilters | null | undefined;
  isOpenAccess?: StringScalarFilters | null | undefined;
  issue?: StringScalarFilters | null | undefined;
  lastUpdatedDateByRDAS?: StringScalarFilters | null | undefined;
  pubType?: StringScalarFilters | null | undefined;
  publicationYear?: IntScalarFilters | null | undefined;
  pubmedId?: IntScalarFilters | null | undefined;
  title?: StringScalarFilters | null | undefined;
  volume?: StringScalarFilters | null | undefined;
};

export type AssociatedWithGenePropertiesAggregationWhereInput = {
  AND?: Array<AssociatedWithGenePropertiesAggregationWhereInput> | null | undefined;
  NOT?: AssociatedWithGenePropertiesAggregationWhereInput | null | undefined;
  OR?: Array<AssociatedWithGenePropertiesAggregationWhereInput> | null | undefined;
  associationStatus?: StringScalarAggregationFilters | null | undefined;
  associationType?: StringScalarAggregationFilters | null | undefined;
};

export type AssociatedWithGenePropertiesWhere = {
  AND?: Array<AssociatedWithGenePropertiesWhere> | null | undefined;
  NOT?: AssociatedWithGenePropertiesWhere | null | undefined;
  OR?: Array<AssociatedWithGenePropertiesWhere> | null | undefined;
  associationStatus?: StringScalarFilters | null | undefined;
  associationType?: StringScalarFilters | null | undefined;
  reference?: StringListFilters | null | undefined;
};

/** Boolean filters */
export type BooleanScalarFilters = {
  eq?: boolean | null | undefined;
};

export type ClinicalTrialHasAnnotationConnectionAggregateInput = {
  AND?: Array<ClinicalTrialHasAnnotationConnectionAggregateInput> | null | undefined;
  NOT?: ClinicalTrialHasAnnotationConnectionAggregateInput | null | undefined;
  OR?: Array<ClinicalTrialHasAnnotationConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ClinicalTrialHasAnnotationNodeAggregationWhereInput | null | undefined;
};

export type ClinicalTrialHasAnnotationConnectionFilters = {
  /** Filter ClinicalTrials by aggregating results on related ClinicalTrialHasAnnotationConnections */
  aggregate?: ClinicalTrialHasAnnotationConnectionAggregateInput | null | undefined;
  /** Return ClinicalTrials where all of the related ClinicalTrialHasAnnotationConnections match this filter */
  all?: ClinicalTrialHasAnnotationConnectionWhere | null | undefined;
  /** Return ClinicalTrials where none of the related ClinicalTrialHasAnnotationConnections match this filter */
  none?: ClinicalTrialHasAnnotationConnectionWhere | null | undefined;
  /** Return ClinicalTrials where one of the related ClinicalTrialHasAnnotationConnections match this filter */
  single?: ClinicalTrialHasAnnotationConnectionWhere | null | undefined;
  /** Return ClinicalTrials where some of the related ClinicalTrialHasAnnotationConnections match this filter */
  some?: ClinicalTrialHasAnnotationConnectionWhere | null | undefined;
};

export type ClinicalTrialHasAnnotationConnectionWhere = {
  AND?: Array<ClinicalTrialHasAnnotationConnectionWhere> | null | undefined;
  NOT?: ClinicalTrialHasAnnotationConnectionWhere | null | undefined;
  OR?: Array<ClinicalTrialHasAnnotationConnectionWhere> | null | undefined;
  node?: AnnotationWhere | null | undefined;
};

export type ClinicalTrialHasAnnotationNodeAggregationWhereInput = {
  AND?: Array<ClinicalTrialHasAnnotationNodeAggregationWhereInput> | null | undefined;
  NOT?: ClinicalTrialHasAnnotationNodeAggregationWhereInput | null | undefined;
  OR?: Array<ClinicalTrialHasAnnotationNodeAggregationWhereInput> | null | undefined;
  umlsConcept?: StringScalarAggregationFilters | null | undefined;
  umlsCui?: StringScalarAggregationFilters | null | undefined;
};

export type ClinicalTrialHasClinicalTrialConnectionAggregateInput = {
  AND?: Array<ClinicalTrialHasClinicalTrialConnectionAggregateInput> | null | undefined;
  NOT?: ClinicalTrialHasClinicalTrialConnectionAggregateInput | null | undefined;
  OR?: Array<ClinicalTrialHasClinicalTrialConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ClinicalTrialHasClinicalTrialNodeAggregationWhereInput | null | undefined;
};

export type ClinicalTrialHasClinicalTrialConnectionFilters = {
  /** Filter ClinicalTrials by aggregating results on related ClinicalTrialHasClinicalTrialConnections */
  aggregate?: ClinicalTrialHasClinicalTrialConnectionAggregateInput | null | undefined;
  /** Return ClinicalTrials where all of the related ClinicalTrialHasClinicalTrialConnections match this filter */
  all?: ClinicalTrialHasClinicalTrialConnectionWhere | null | undefined;
  /** Return ClinicalTrials where none of the related ClinicalTrialHasClinicalTrialConnections match this filter */
  none?: ClinicalTrialHasClinicalTrialConnectionWhere | null | undefined;
  /** Return ClinicalTrials where one of the related ClinicalTrialHasClinicalTrialConnections match this filter */
  single?: ClinicalTrialHasClinicalTrialConnectionWhere | null | undefined;
  /** Return ClinicalTrials where some of the related ClinicalTrialHasClinicalTrialConnections match this filter */
  some?: ClinicalTrialHasClinicalTrialConnectionWhere | null | undefined;
};

export type ClinicalTrialHasClinicalTrialConnectionWhere = {
  AND?: Array<ClinicalTrialHasClinicalTrialConnectionWhere> | null | undefined;
  NOT?: ClinicalTrialHasClinicalTrialConnectionWhere | null | undefined;
  OR?: Array<ClinicalTrialHasClinicalTrialConnectionWhere> | null | undefined;
  node?: DiseaseWhere | null | undefined;
};

export type ClinicalTrialHasClinicalTrialNodeAggregationWhereInput = {
  AND?: Array<ClinicalTrialHasClinicalTrialNodeAggregationWhereInput> | null | undefined;
  NOT?: ClinicalTrialHasClinicalTrialNodeAggregationWhereInput | null | undefined;
  OR?: Array<ClinicalTrialHasClinicalTrialNodeAggregationWhereInput> | null | undefined;
  countArticles?: IntScalarAggregationFilters | null | undefined;
  countCoreProjects?: IntScalarAggregationFilters | null | undefined;
  countEpiArticles?: IntScalarAggregationFilters | null | undefined;
  countGenes?: IntScalarAggregationFilters | null | undefined;
  countNhsArticles?: IntScalarAggregationFilters | null | undefined;
  countPhenotypes?: IntScalarAggregationFilters | null | undefined;
  countProjects?: IntScalarAggregationFilters | null | undefined;
  countTrials?: IntScalarAggregationFilters | null | undefined;
  diseaseType?: StringScalarAggregationFilters | null | undefined;
  gardId?: StringScalarAggregationFilters | null | undefined;
  gardName?: StringScalarAggregationFilters | null | undefined;
  medGen?: StringScalarAggregationFilters | null | undefined;
  mondo?: StringScalarAggregationFilters | null | undefined;
  omim?: StringScalarAggregationFilters | null | undefined;
  omimps?: StringScalarAggregationFilters | null | undefined;
  orphanet?: StringScalarAggregationFilters | null | undefined;
  umls?: StringScalarAggregationFilters | null | undefined;
};

export type ClinicalTrialHasContactConnectionAggregateInput = {
  AND?: Array<ClinicalTrialHasContactConnectionAggregateInput> | null | undefined;
  NOT?: ClinicalTrialHasContactConnectionAggregateInput | null | undefined;
  OR?: Array<ClinicalTrialHasContactConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ClinicalTrialHasContactNodeAggregationWhereInput | null | undefined;
};

export type ClinicalTrialHasContactConnectionFilters = {
  /** Filter ClinicalTrials by aggregating results on related ClinicalTrialHasContactConnections */
  aggregate?: ClinicalTrialHasContactConnectionAggregateInput | null | undefined;
  /** Return ClinicalTrials where all of the related ClinicalTrialHasContactConnections match this filter */
  all?: ClinicalTrialHasContactConnectionWhere | null | undefined;
  /** Return ClinicalTrials where none of the related ClinicalTrialHasContactConnections match this filter */
  none?: ClinicalTrialHasContactConnectionWhere | null | undefined;
  /** Return ClinicalTrials where one of the related ClinicalTrialHasContactConnections match this filter */
  single?: ClinicalTrialHasContactConnectionWhere | null | undefined;
  /** Return ClinicalTrials where some of the related ClinicalTrialHasContactConnections match this filter */
  some?: ClinicalTrialHasContactConnectionWhere | null | undefined;
};

export type ClinicalTrialHasContactConnectionWhere = {
  AND?: Array<ClinicalTrialHasContactConnectionWhere> | null | undefined;
  NOT?: ClinicalTrialHasContactConnectionWhere | null | undefined;
  OR?: Array<ClinicalTrialHasContactConnectionWhere> | null | undefined;
  node?: AgentWhere | null | undefined;
};

export type ClinicalTrialHasContactNodeAggregationWhereInput = {
  AND?: Array<ClinicalTrialHasContactNodeAggregationWhereInput> | null | undefined;
  NOT?: ClinicalTrialHasContactNodeAggregationWhereInput | null | undefined;
  OR?: Array<ClinicalTrialHasContactNodeAggregationWhereInput> | null | undefined;
  _idx_key?: StringScalarAggregationFilters | null | undefined;
  firstName?: StringScalarAggregationFilters | null | undefined;
  fullName?: StringScalarAggregationFilters | null | undefined;
  lastName?: StringScalarAggregationFilters | null | undefined;
  orc_id?: StringScalarAggregationFilters | null | undefined;
  pi_id?: StringScalarAggregationFilters | null | undefined;
};

export type ClinicalTrialHasIndividualPatientDataConnectionAggregateInput = {
  AND?: Array<ClinicalTrialHasIndividualPatientDataConnectionAggregateInput> | null | undefined;
  NOT?: ClinicalTrialHasIndividualPatientDataConnectionAggregateInput | null | undefined;
  OR?: Array<ClinicalTrialHasIndividualPatientDataConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ClinicalTrialHasIndividualPatientDataNodeAggregationWhereInput | null | undefined;
};

export type ClinicalTrialHasIndividualPatientDataConnectionFilters = {
  /** Filter ClinicalTrials by aggregating results on related ClinicalTrialHasIndividualPatientDataConnections */
  aggregate?: ClinicalTrialHasIndividualPatientDataConnectionAggregateInput | null | undefined;
  /** Return ClinicalTrials where all of the related ClinicalTrialHasIndividualPatientDataConnections match this filter */
  all?: ClinicalTrialHasIndividualPatientDataConnectionWhere | null | undefined;
  /** Return ClinicalTrials where none of the related ClinicalTrialHasIndividualPatientDataConnections match this filter */
  none?: ClinicalTrialHasIndividualPatientDataConnectionWhere | null | undefined;
  /** Return ClinicalTrials where one of the related ClinicalTrialHasIndividualPatientDataConnections match this filter */
  single?: ClinicalTrialHasIndividualPatientDataConnectionWhere | null | undefined;
  /** Return ClinicalTrials where some of the related ClinicalTrialHasIndividualPatientDataConnections match this filter */
  some?: ClinicalTrialHasIndividualPatientDataConnectionWhere | null | undefined;
};

export type ClinicalTrialHasIndividualPatientDataConnectionWhere = {
  AND?: Array<ClinicalTrialHasIndividualPatientDataConnectionWhere> | null | undefined;
  NOT?: ClinicalTrialHasIndividualPatientDataConnectionWhere | null | undefined;
  OR?: Array<ClinicalTrialHasIndividualPatientDataConnectionWhere> | null | undefined;
  node?: IndividualPatientDataWhere | null | undefined;
};

export type ClinicalTrialHasIndividualPatientDataNodeAggregationWhereInput = {
  AND?: Array<ClinicalTrialHasIndividualPatientDataNodeAggregationWhereInput> | null | undefined;
  NOT?: ClinicalTrialHasIndividualPatientDataNodeAggregationWhereInput | null | undefined;
  OR?: Array<ClinicalTrialHasIndividualPatientDataNodeAggregationWhereInput> | null | undefined;
  ipdSharing?: StringScalarAggregationFilters | null | undefined;
  ipdSharingAccessCriteria?: StringScalarAggregationFilters | null | undefined;
  ipdSharingDescription?: StringScalarAggregationFilters | null | undefined;
  ipdSharingInfoType?: StringScalarAggregationFilters | null | undefined;
  ipdSharingTimeFrame?: StringScalarAggregationFilters | null | undefined;
};

export type ClinicalTrialHasInterventionConnectionAggregateInput = {
  AND?: Array<ClinicalTrialHasInterventionConnectionAggregateInput> | null | undefined;
  NOT?: ClinicalTrialHasInterventionConnectionAggregateInput | null | undefined;
  OR?: Array<ClinicalTrialHasInterventionConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ClinicalTrialHasInterventionNodeAggregationWhereInput | null | undefined;
};

export type ClinicalTrialHasInterventionConnectionFilters = {
  /** Filter ClinicalTrials by aggregating results on related ClinicalTrialHasInterventionConnections */
  aggregate?: ClinicalTrialHasInterventionConnectionAggregateInput | null | undefined;
  /** Return ClinicalTrials where all of the related ClinicalTrialHasInterventionConnections match this filter */
  all?: ClinicalTrialHasInterventionConnectionWhere | null | undefined;
  /** Return ClinicalTrials where none of the related ClinicalTrialHasInterventionConnections match this filter */
  none?: ClinicalTrialHasInterventionConnectionWhere | null | undefined;
  /** Return ClinicalTrials where one of the related ClinicalTrialHasInterventionConnections match this filter */
  single?: ClinicalTrialHasInterventionConnectionWhere | null | undefined;
  /** Return ClinicalTrials where some of the related ClinicalTrialHasInterventionConnections match this filter */
  some?: ClinicalTrialHasInterventionConnectionWhere | null | undefined;
};

export type ClinicalTrialHasInterventionConnectionWhere = {
  AND?: Array<ClinicalTrialHasInterventionConnectionWhere> | null | undefined;
  NOT?: ClinicalTrialHasInterventionConnectionWhere | null | undefined;
  OR?: Array<ClinicalTrialHasInterventionConnectionWhere> | null | undefined;
  node?: InterventionWhere | null | undefined;
};

export type ClinicalTrialHasInterventionNodeAggregationWhereInput = {
  AND?: Array<ClinicalTrialHasInterventionNodeAggregationWhereInput> | null | undefined;
  NOT?: ClinicalTrialHasInterventionNodeAggregationWhereInput | null | undefined;
  OR?: Array<ClinicalTrialHasInterventionNodeAggregationWhereInput> | null | undefined;
  _composite_key?: StringScalarAggregationFilters | null | undefined;
  _intervention_name_key?: StringScalarAggregationFilters | null | undefined;
  interventionDescription?: StringScalarAggregationFilters | null | undefined;
  interventionName?: StringScalarAggregationFilters | null | undefined;
  interventionType?: StringScalarAggregationFilters | null | undefined;
};

export type ClinicalTrialHasInvestigatedConditionConnectionAggregateInput = {
  AND?: Array<ClinicalTrialHasInvestigatedConditionConnectionAggregateInput> | null | undefined;
  NOT?: ClinicalTrialHasInvestigatedConditionConnectionAggregateInput | null | undefined;
  OR?: Array<ClinicalTrialHasInvestigatedConditionConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ClinicalTrialHasInvestigatedConditionNodeAggregationWhereInput | null | undefined;
};

export type ClinicalTrialHasInvestigatedConditionConnectionFilters = {
  /** Filter ClinicalTrials by aggregating results on related ClinicalTrialHasInvestigatedConditionConnections */
  aggregate?: ClinicalTrialHasInvestigatedConditionConnectionAggregateInput | null | undefined;
  /** Return ClinicalTrials where all of the related ClinicalTrialHasInvestigatedConditionConnections match this filter */
  all?: ClinicalTrialHasInvestigatedConditionConnectionWhere | null | undefined;
  /** Return ClinicalTrials where none of the related ClinicalTrialHasInvestigatedConditionConnections match this filter */
  none?: ClinicalTrialHasInvestigatedConditionConnectionWhere | null | undefined;
  /** Return ClinicalTrials where one of the related ClinicalTrialHasInvestigatedConditionConnections match this filter */
  single?: ClinicalTrialHasInvestigatedConditionConnectionWhere | null | undefined;
  /** Return ClinicalTrials where some of the related ClinicalTrialHasInvestigatedConditionConnections match this filter */
  some?: ClinicalTrialHasInvestigatedConditionConnectionWhere | null | undefined;
};

export type ClinicalTrialHasInvestigatedConditionConnectionWhere = {
  AND?: Array<ClinicalTrialHasInvestigatedConditionConnectionWhere> | null | undefined;
  NOT?: ClinicalTrialHasInvestigatedConditionConnectionWhere | null | undefined;
  OR?: Array<ClinicalTrialHasInvestigatedConditionConnectionWhere> | null | undefined;
  node?: ConditionWhere | null | undefined;
};

export type ClinicalTrialHasInvestigatedConditionNodeAggregationWhereInput = {
  AND?: Array<ClinicalTrialHasInvestigatedConditionNodeAggregationWhereInput> | null | undefined;
  NOT?: ClinicalTrialHasInvestigatedConditionNodeAggregationWhereInput | null | undefined;
  OR?: Array<ClinicalTrialHasInvestigatedConditionNodeAggregationWhereInput> | null | undefined;
  condition?: StringScalarAggregationFilters | null | undefined;
};

export type ClinicalTrialHasInvestigatorConnectionAggregateInput = {
  AND?: Array<ClinicalTrialHasInvestigatorConnectionAggregateInput> | null | undefined;
  NOT?: ClinicalTrialHasInvestigatorConnectionAggregateInput | null | undefined;
  OR?: Array<ClinicalTrialHasInvestigatorConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ClinicalTrialHasInvestigatorNodeAggregationWhereInput | null | undefined;
};

export type ClinicalTrialHasInvestigatorConnectionFilters = {
  /** Filter ClinicalTrials by aggregating results on related ClinicalTrialHasInvestigatorConnections */
  aggregate?: ClinicalTrialHasInvestigatorConnectionAggregateInput | null | undefined;
  /** Return ClinicalTrials where all of the related ClinicalTrialHasInvestigatorConnections match this filter */
  all?: ClinicalTrialHasInvestigatorConnectionWhere | null | undefined;
  /** Return ClinicalTrials where none of the related ClinicalTrialHasInvestigatorConnections match this filter */
  none?: ClinicalTrialHasInvestigatorConnectionWhere | null | undefined;
  /** Return ClinicalTrials where one of the related ClinicalTrialHasInvestigatorConnections match this filter */
  single?: ClinicalTrialHasInvestigatorConnectionWhere | null | undefined;
  /** Return ClinicalTrials where some of the related ClinicalTrialHasInvestigatorConnections match this filter */
  some?: ClinicalTrialHasInvestigatorConnectionWhere | null | undefined;
};

export type ClinicalTrialHasInvestigatorConnectionWhere = {
  AND?: Array<ClinicalTrialHasInvestigatorConnectionWhere> | null | undefined;
  NOT?: ClinicalTrialHasInvestigatorConnectionWhere | null | undefined;
  OR?: Array<ClinicalTrialHasInvestigatorConnectionWhere> | null | undefined;
  node?: AgentWhere | null | undefined;
};

export type ClinicalTrialHasInvestigatorNodeAggregationWhereInput = {
  AND?: Array<ClinicalTrialHasInvestigatorNodeAggregationWhereInput> | null | undefined;
  NOT?: ClinicalTrialHasInvestigatorNodeAggregationWhereInput | null | undefined;
  OR?: Array<ClinicalTrialHasInvestigatorNodeAggregationWhereInput> | null | undefined;
  _idx_key?: StringScalarAggregationFilters | null | undefined;
  firstName?: StringScalarAggregationFilters | null | undefined;
  fullName?: StringScalarAggregationFilters | null | undefined;
  lastName?: StringScalarAggregationFilters | null | undefined;
  orc_id?: StringScalarAggregationFilters | null | undefined;
  pi_id?: StringScalarAggregationFilters | null | undefined;
};

export type ClinicalTrialHasOrganizationConnectionAggregateInput = {
  AND?: Array<ClinicalTrialHasOrganizationConnectionAggregateInput> | null | undefined;
  NOT?: ClinicalTrialHasOrganizationConnectionAggregateInput | null | undefined;
  OR?: Array<ClinicalTrialHasOrganizationConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ClinicalTrialHasOrganizationNodeAggregationWhereInput | null | undefined;
};

export type ClinicalTrialHasOrganizationConnectionFilters = {
  /** Filter ClinicalTrials by aggregating results on related ClinicalTrialHasOrganizationConnections */
  aggregate?: ClinicalTrialHasOrganizationConnectionAggregateInput | null | undefined;
  /** Return ClinicalTrials where all of the related ClinicalTrialHasOrganizationConnections match this filter */
  all?: ClinicalTrialHasOrganizationConnectionWhere | null | undefined;
  /** Return ClinicalTrials where none of the related ClinicalTrialHasOrganizationConnections match this filter */
  none?: ClinicalTrialHasOrganizationConnectionWhere | null | undefined;
  /** Return ClinicalTrials where one of the related ClinicalTrialHasOrganizationConnections match this filter */
  single?: ClinicalTrialHasOrganizationConnectionWhere | null | undefined;
  /** Return ClinicalTrials where some of the related ClinicalTrialHasOrganizationConnections match this filter */
  some?: ClinicalTrialHasOrganizationConnectionWhere | null | undefined;
};

export type ClinicalTrialHasOrganizationConnectionWhere = {
  AND?: Array<ClinicalTrialHasOrganizationConnectionWhere> | null | undefined;
  NOT?: ClinicalTrialHasOrganizationConnectionWhere | null | undefined;
  OR?: Array<ClinicalTrialHasOrganizationConnectionWhere> | null | undefined;
  node?: OrganizationWhere | null | undefined;
};

export type ClinicalTrialHasOrganizationNodeAggregationWhereInput = {
  AND?: Array<ClinicalTrialHasOrganizationNodeAggregationWhereInput> | null | undefined;
  NOT?: ClinicalTrialHasOrganizationNodeAggregationWhereInput | null | undefined;
  OR?: Array<ClinicalTrialHasOrganizationNodeAggregationWhereInput> | null | undefined;
  _idx_key?: StringScalarAggregationFilters | null | undefined;
  name?: StringScalarAggregationFilters | null | undefined;
};

export type ClinicalTrialHasParticipantInfoConnectionAggregateInput = {
  AND?: Array<ClinicalTrialHasParticipantInfoConnectionAggregateInput> | null | undefined;
  NOT?: ClinicalTrialHasParticipantInfoConnectionAggregateInput | null | undefined;
  OR?: Array<ClinicalTrialHasParticipantInfoConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ClinicalTrialHasParticipantInfoNodeAggregationWhereInput | null | undefined;
};

export type ClinicalTrialHasParticipantInfoConnectionFilters = {
  /** Filter ClinicalTrials by aggregating results on related ClinicalTrialHasParticipantInfoConnections */
  aggregate?: ClinicalTrialHasParticipantInfoConnectionAggregateInput | null | undefined;
  /** Return ClinicalTrials where all of the related ClinicalTrialHasParticipantInfoConnections match this filter */
  all?: ClinicalTrialHasParticipantInfoConnectionWhere | null | undefined;
  /** Return ClinicalTrials where none of the related ClinicalTrialHasParticipantInfoConnections match this filter */
  none?: ClinicalTrialHasParticipantInfoConnectionWhere | null | undefined;
  /** Return ClinicalTrials where one of the related ClinicalTrialHasParticipantInfoConnections match this filter */
  single?: ClinicalTrialHasParticipantInfoConnectionWhere | null | undefined;
  /** Return ClinicalTrials where some of the related ClinicalTrialHasParticipantInfoConnections match this filter */
  some?: ClinicalTrialHasParticipantInfoConnectionWhere | null | undefined;
};

export type ClinicalTrialHasParticipantInfoConnectionWhere = {
  AND?: Array<ClinicalTrialHasParticipantInfoConnectionWhere> | null | undefined;
  NOT?: ClinicalTrialHasParticipantInfoConnectionWhere | null | undefined;
  OR?: Array<ClinicalTrialHasParticipantInfoConnectionWhere> | null | undefined;
  node?: ParticipantWhere | null | undefined;
};

export type ClinicalTrialHasParticipantInfoNodeAggregationWhereInput = {
  AND?: Array<ClinicalTrialHasParticipantInfoNodeAggregationWhereInput> | null | undefined;
  NOT?: ClinicalTrialHasParticipantInfoNodeAggregationWhereInput | null | undefined;
  OR?: Array<ClinicalTrialHasParticipantInfoNodeAggregationWhereInput> | null | undefined;
  eligibilityCriteria?: StringScalarAggregationFilters | null | undefined;
  enrollmentCount?: StringScalarAggregationFilters | null | undefined;
  enrollmentType?: StringScalarAggregationFilters | null | undefined;
  healthyVolunteers?: StringScalarAggregationFilters | null | undefined;
  maximumAge?: StringScalarAggregationFilters | null | undefined;
  minimumAge?: StringScalarAggregationFilters | null | undefined;
};

export type ClinicalTrialHasPrimaryOutcomeConnectionAggregateInput = {
  AND?: Array<ClinicalTrialHasPrimaryOutcomeConnectionAggregateInput> | null | undefined;
  NOT?: ClinicalTrialHasPrimaryOutcomeConnectionAggregateInput | null | undefined;
  OR?: Array<ClinicalTrialHasPrimaryOutcomeConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ClinicalTrialHasPrimaryOutcomeNodeAggregationWhereInput | null | undefined;
};

export type ClinicalTrialHasPrimaryOutcomeConnectionFilters = {
  /** Filter ClinicalTrials by aggregating results on related ClinicalTrialHasPrimaryOutcomeConnections */
  aggregate?: ClinicalTrialHasPrimaryOutcomeConnectionAggregateInput | null | undefined;
  /** Return ClinicalTrials where all of the related ClinicalTrialHasPrimaryOutcomeConnections match this filter */
  all?: ClinicalTrialHasPrimaryOutcomeConnectionWhere | null | undefined;
  /** Return ClinicalTrials where none of the related ClinicalTrialHasPrimaryOutcomeConnections match this filter */
  none?: ClinicalTrialHasPrimaryOutcomeConnectionWhere | null | undefined;
  /** Return ClinicalTrials where one of the related ClinicalTrialHasPrimaryOutcomeConnections match this filter */
  single?: ClinicalTrialHasPrimaryOutcomeConnectionWhere | null | undefined;
  /** Return ClinicalTrials where some of the related ClinicalTrialHasPrimaryOutcomeConnections match this filter */
  some?: ClinicalTrialHasPrimaryOutcomeConnectionWhere | null | undefined;
};

export type ClinicalTrialHasPrimaryOutcomeConnectionWhere = {
  AND?: Array<ClinicalTrialHasPrimaryOutcomeConnectionWhere> | null | undefined;
  NOT?: ClinicalTrialHasPrimaryOutcomeConnectionWhere | null | undefined;
  OR?: Array<ClinicalTrialHasPrimaryOutcomeConnectionWhere> | null | undefined;
  node?: PrimaryOutcomeWhere | null | undefined;
};

export type ClinicalTrialHasPrimaryOutcomeNodeAggregationWhereInput = {
  AND?: Array<ClinicalTrialHasPrimaryOutcomeNodeAggregationWhereInput> | null | undefined;
  NOT?: ClinicalTrialHasPrimaryOutcomeNodeAggregationWhereInput | null | undefined;
  OR?: Array<ClinicalTrialHasPrimaryOutcomeNodeAggregationWhereInput> | null | undefined;
  primaryOutcomeDescription?: StringScalarAggregationFilters | null | undefined;
  primaryOutcomeMeasure?: StringScalarAggregationFilters | null | undefined;
  primaryOutcomeTimeFrame?: StringScalarAggregationFilters | null | undefined;
};

export type ClinicalTrialHasStudyDesignConnectionAggregateInput = {
  AND?: Array<ClinicalTrialHasStudyDesignConnectionAggregateInput> | null | undefined;
  NOT?: ClinicalTrialHasStudyDesignConnectionAggregateInput | null | undefined;
  OR?: Array<ClinicalTrialHasStudyDesignConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ClinicalTrialHasStudyDesignNodeAggregationWhereInput | null | undefined;
};

export type ClinicalTrialHasStudyDesignConnectionFilters = {
  /** Filter ClinicalTrials by aggregating results on related ClinicalTrialHasStudyDesignConnections */
  aggregate?: ClinicalTrialHasStudyDesignConnectionAggregateInput | null | undefined;
  /** Return ClinicalTrials where all of the related ClinicalTrialHasStudyDesignConnections match this filter */
  all?: ClinicalTrialHasStudyDesignConnectionWhere | null | undefined;
  /** Return ClinicalTrials where none of the related ClinicalTrialHasStudyDesignConnections match this filter */
  none?: ClinicalTrialHasStudyDesignConnectionWhere | null | undefined;
  /** Return ClinicalTrials where one of the related ClinicalTrialHasStudyDesignConnections match this filter */
  single?: ClinicalTrialHasStudyDesignConnectionWhere | null | undefined;
  /** Return ClinicalTrials where some of the related ClinicalTrialHasStudyDesignConnections match this filter */
  some?: ClinicalTrialHasStudyDesignConnectionWhere | null | undefined;
};

export type ClinicalTrialHasStudyDesignConnectionWhere = {
  AND?: Array<ClinicalTrialHasStudyDesignConnectionWhere> | null | undefined;
  NOT?: ClinicalTrialHasStudyDesignConnectionWhere | null | undefined;
  OR?: Array<ClinicalTrialHasStudyDesignConnectionWhere> | null | undefined;
  node?: StudyDesignWhere | null | undefined;
};

export type ClinicalTrialHasStudyDesignNodeAggregationWhereInput = {
  AND?: Array<ClinicalTrialHasStudyDesignNodeAggregationWhereInput> | null | undefined;
  NOT?: ClinicalTrialHasStudyDesignNodeAggregationWhereInput | null | undefined;
  OR?: Array<ClinicalTrialHasStudyDesignNodeAggregationWhereInput> | null | undefined;
  designAllocation?: StringScalarAggregationFilters | null | undefined;
  designInterventionModel?: StringScalarAggregationFilters | null | undefined;
  designInterventionModelDescription?: StringScalarAggregationFilters | null | undefined;
  designMasking?: StringScalarAggregationFilters | null | undefined;
  designObservationalModel?: StringScalarAggregationFilters | null | undefined;
  designPrimaryPurpose?: StringScalarAggregationFilters | null | undefined;
  designTimePerspective?: StringScalarAggregationFilters | null | undefined;
  detailedDescription?: StringScalarAggregationFilters | null | undefined;
  hasExpandedAccess?: StringScalarAggregationFilters | null | undefined;
  studyType?: StringScalarAggregationFilters | null | undefined;
};

export type ClinicalTrialHasTrialLocationConnectionAggregateInput = {
  AND?: Array<ClinicalTrialHasTrialLocationConnectionAggregateInput> | null | undefined;
  NOT?: ClinicalTrialHasTrialLocationConnectionAggregateInput | null | undefined;
  OR?: Array<ClinicalTrialHasTrialLocationConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ClinicalTrialHasTrialLocationNodeAggregationWhereInput | null | undefined;
};

export type ClinicalTrialHasTrialLocationConnectionFilters = {
  /** Filter ClinicalTrials by aggregating results on related ClinicalTrialHasTrialLocationConnections */
  aggregate?: ClinicalTrialHasTrialLocationConnectionAggregateInput | null | undefined;
  /** Return ClinicalTrials where all of the related ClinicalTrialHasTrialLocationConnections match this filter */
  all?: ClinicalTrialHasTrialLocationConnectionWhere | null | undefined;
  /** Return ClinicalTrials where none of the related ClinicalTrialHasTrialLocationConnections match this filter */
  none?: ClinicalTrialHasTrialLocationConnectionWhere | null | undefined;
  /** Return ClinicalTrials where one of the related ClinicalTrialHasTrialLocationConnections match this filter */
  single?: ClinicalTrialHasTrialLocationConnectionWhere | null | undefined;
  /** Return ClinicalTrials where some of the related ClinicalTrialHasTrialLocationConnections match this filter */
  some?: ClinicalTrialHasTrialLocationConnectionWhere | null | undefined;
};

export type ClinicalTrialHasTrialLocationConnectionWhere = {
  AND?: Array<ClinicalTrialHasTrialLocationConnectionWhere> | null | undefined;
  NOT?: ClinicalTrialHasTrialLocationConnectionWhere | null | undefined;
  OR?: Array<ClinicalTrialHasTrialLocationConnectionWhere> | null | undefined;
  node?: LocationWhere | null | undefined;
};

export type ClinicalTrialHasTrialLocationNodeAggregationWhereInput = {
  AND?: Array<ClinicalTrialHasTrialLocationNodeAggregationWhereInput> | null | undefined;
  NOT?: ClinicalTrialHasTrialLocationNodeAggregationWhereInput | null | undefined;
  OR?: Array<ClinicalTrialHasTrialLocationNodeAggregationWhereInput> | null | undefined;
  _idx_key?: StringScalarAggregationFilters | null | undefined;
  address?: StringScalarAggregationFilters | null | undefined;
  city?: StringScalarAggregationFilters | null | undefined;
  country?: StringScalarAggregationFilters | null | undefined;
  facility?: StringScalarAggregationFilters | null | undefined;
  state?: StringScalarAggregationFilters | null | undefined;
  zip?: StringScalarAggregationFilters | null | undefined;
};

export type ClinicalTrialRelationshipFilters = {
  /** Filter type where all of the related ClinicalTrials match this filter */
  all?: ClinicalTrialWhere | null | undefined;
  /** Filter type where none of the related ClinicalTrials match this filter */
  none?: ClinicalTrialWhere | null | undefined;
  /** Filter type where one of the related ClinicalTrials match this filter */
  single?: ClinicalTrialWhere | null | undefined;
  /** Filter type where some of the related ClinicalTrials match this filter */
  some?: ClinicalTrialWhere | null | undefined;
};

/** Fields to sort ClinicalTrials by. The order in which sorts are applied is not guaranteed when specifying many fields in one ClinicalTrialSort object. */
export type ClinicalTrialSort = {
  briefSummary?: SortDirection | null | undefined;
  briefTitle?: SortDirection | null | undefined;
  completionDate?: SortDirection | null | undefined;
  completionDateType?: SortDirection | null | undefined;
  dateCreatedRDAS?: SortDirection | null | undefined;
  lastKnownStatus?: SortDirection | null | undefined;
  lastUpdatePostDate?: SortDirection | null | undefined;
  lastUpdatePostDateType?: SortDirection | null | undefined;
  lastUpdateSubmitDate?: SortDirection | null | undefined;
  lastUpdatedRDAS?: SortDirection | null | undefined;
  nctId?: SortDirection | null | undefined;
  officialTitle?: SortDirection | null | undefined;
  overallStatus?: SortDirection | null | undefined;
  patientRegistry?: SortDirection | null | undefined;
  phase?: SortDirection | null | undefined;
  primaryCompletionDate?: SortDirection | null | undefined;
  primaryCompletionDateType?: SortDirection | null | undefined;
  resultsFirstPostDate?: SortDirection | null | undefined;
  resultsFirstPostDateType?: SortDirection | null | undefined;
  resultsFirstPostedQCCommentsDate?: SortDirection | null | undefined;
  startDate?: SortDirection | null | undefined;
  startDateType?: SortDirection | null | undefined;
  studyType?: SortDirection | null | undefined;
};

export type ClinicalTrialWhere = {
  AND?: Array<ClinicalTrialWhere> | null | undefined;
  NOT?: ClinicalTrialWhere | null | undefined;
  OR?: Array<ClinicalTrialWhere> | null | undefined;
  briefSummary?: StringScalarFilters | null | undefined;
  briefTitle?: StringScalarFilters | null | undefined;
  completionDate?: StringScalarFilters | null | undefined;
  completionDateType?: StringScalarFilters | null | undefined;
  dateCreatedRDAS?: StringScalarFilters | null | undefined;
  hasAnnotation?: AnnotationRelationshipFilters | null | undefined;
  hasAnnotationConnection?: ClinicalTrialHasAnnotationConnectionFilters | null | undefined;
  hasClinicalTrial?: DiseaseRelationshipFilters | null | undefined;
  hasClinicalTrialConnection?: ClinicalTrialHasClinicalTrialConnectionFilters | null | undefined;
  hasContact?: AgentRelationshipFilters | null | undefined;
  hasContactConnection?: ClinicalTrialHasContactConnectionFilters | null | undefined;
  hasIndividualPatientData?: IndividualPatientDataRelationshipFilters | null | undefined;
  hasIndividualPatientDataConnection?: ClinicalTrialHasIndividualPatientDataConnectionFilters | null | undefined;
  hasIntervention?: InterventionRelationshipFilters | null | undefined;
  hasInterventionConnection?: ClinicalTrialHasInterventionConnectionFilters | null | undefined;
  hasInvestigatedCondition?: ConditionRelationshipFilters | null | undefined;
  hasInvestigatedConditionConnection?: ClinicalTrialHasInvestigatedConditionConnectionFilters | null | undefined;
  hasInvestigator?: AgentRelationshipFilters | null | undefined;
  hasInvestigatorConnection?: ClinicalTrialHasInvestigatorConnectionFilters | null | undefined;
  hasOrganization?: OrganizationRelationshipFilters | null | undefined;
  hasOrganizationConnection?: ClinicalTrialHasOrganizationConnectionFilters | null | undefined;
  hasParticipantInfo?: ParticipantRelationshipFilters | null | undefined;
  hasParticipantInfoConnection?: ClinicalTrialHasParticipantInfoConnectionFilters | null | undefined;
  hasPrimaryOutcome?: PrimaryOutcomeRelationshipFilters | null | undefined;
  hasPrimaryOutcomeConnection?: ClinicalTrialHasPrimaryOutcomeConnectionFilters | null | undefined;
  hasStudyDesign?: StudyDesignRelationshipFilters | null | undefined;
  hasStudyDesignConnection?: ClinicalTrialHasStudyDesignConnectionFilters | null | undefined;
  hasTrialLocation?: LocationRelationshipFilters | null | undefined;
  hasTrialLocationConnection?: ClinicalTrialHasTrialLocationConnectionFilters | null | undefined;
  lastKnownStatus?: StringScalarFilters | null | undefined;
  lastUpdatePostDate?: StringScalarFilters | null | undefined;
  lastUpdatePostDateType?: StringScalarFilters | null | undefined;
  lastUpdateSubmitDate?: StringScalarFilters | null | undefined;
  lastUpdatedRDAS?: StringScalarFilters | null | undefined;
  nctId?: StringScalarFilters | null | undefined;
  officialTitle?: StringScalarFilters | null | undefined;
  overallStatus?: StringScalarFilters | null | undefined;
  patientRegistry?: StringScalarFilters | null | undefined;
  phase?: StringScalarFilters | null | undefined;
  primaryCompletionDate?: StringScalarFilters | null | undefined;
  primaryCompletionDateType?: StringScalarFilters | null | undefined;
  resultsFirstPostDate?: StringScalarFilters | null | undefined;
  resultsFirstPostDateType?: StringScalarFilters | null | undefined;
  resultsFirstPostedQCCommentsDate?: StringScalarFilters | null | undefined;
  startDate?: StringScalarFilters | null | undefined;
  startDateType?: StringScalarFilters | null | undefined;
  studyType?: StringScalarFilters | null | undefined;
};

export type ConditionHasClinicalTrialConnectionAggregateInput = {
  AND?: Array<ConditionHasClinicalTrialConnectionAggregateInput> | null | undefined;
  NOT?: ConditionHasClinicalTrialConnectionAggregateInput | null | undefined;
  OR?: Array<ConditionHasClinicalTrialConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ConditionHasClinicalTrialNodeAggregationWhereInput | null | undefined;
};

export type ConditionHasClinicalTrialConnectionFilters = {
  /** Filter Conditions by aggregating results on related ConditionHasClinicalTrialConnections */
  aggregate?: ConditionHasClinicalTrialConnectionAggregateInput | null | undefined;
  /** Return Conditions where all of the related ConditionHasClinicalTrialConnections match this filter */
  all?: ConditionHasClinicalTrialConnectionWhere | null | undefined;
  /** Return Conditions where none of the related ConditionHasClinicalTrialConnections match this filter */
  none?: ConditionHasClinicalTrialConnectionWhere | null | undefined;
  /** Return Conditions where one of the related ConditionHasClinicalTrialConnections match this filter */
  single?: ConditionHasClinicalTrialConnectionWhere | null | undefined;
  /** Return Conditions where some of the related ConditionHasClinicalTrialConnections match this filter */
  some?: ConditionHasClinicalTrialConnectionWhere | null | undefined;
};

export type ConditionHasClinicalTrialConnectionWhere = {
  AND?: Array<ConditionHasClinicalTrialConnectionWhere> | null | undefined;
  NOT?: ConditionHasClinicalTrialConnectionWhere | null | undefined;
  OR?: Array<ConditionHasClinicalTrialConnectionWhere> | null | undefined;
  node?: ClinicalTrialWhere | null | undefined;
};

export type ConditionHasClinicalTrialNodeAggregationWhereInput = {
  AND?: Array<ConditionHasClinicalTrialNodeAggregationWhereInput> | null | undefined;
  NOT?: ConditionHasClinicalTrialNodeAggregationWhereInput | null | undefined;
  OR?: Array<ConditionHasClinicalTrialNodeAggregationWhereInput> | null | undefined;
  briefSummary?: StringScalarAggregationFilters | null | undefined;
  briefTitle?: StringScalarAggregationFilters | null | undefined;
  completionDate?: StringScalarAggregationFilters | null | undefined;
  completionDateType?: StringScalarAggregationFilters | null | undefined;
  dateCreatedRDAS?: StringScalarAggregationFilters | null | undefined;
  lastKnownStatus?: StringScalarAggregationFilters | null | undefined;
  lastUpdatePostDate?: StringScalarAggregationFilters | null | undefined;
  lastUpdatePostDateType?: StringScalarAggregationFilters | null | undefined;
  lastUpdateSubmitDate?: StringScalarAggregationFilters | null | undefined;
  lastUpdatedRDAS?: StringScalarAggregationFilters | null | undefined;
  nctId?: StringScalarAggregationFilters | null | undefined;
  officialTitle?: StringScalarAggregationFilters | null | undefined;
  overallStatus?: StringScalarAggregationFilters | null | undefined;
  patientRegistry?: StringScalarAggregationFilters | null | undefined;
  phase?: StringScalarAggregationFilters | null | undefined;
  primaryCompletionDate?: StringScalarAggregationFilters | null | undefined;
  primaryCompletionDateType?: StringScalarAggregationFilters | null | undefined;
  resultsFirstPostDate?: StringScalarAggregationFilters | null | undefined;
  resultsFirstPostDateType?: StringScalarAggregationFilters | null | undefined;
  resultsFirstPostedQCCommentsDate?: StringScalarAggregationFilters | null | undefined;
  startDate?: StringScalarAggregationFilters | null | undefined;
  startDateType?: StringScalarAggregationFilters | null | undefined;
  studyType?: StringScalarAggregationFilters | null | undefined;
};

export type ConditionHasMappedConditionConnectionAggregateInput = {
  AND?: Array<ConditionHasMappedConditionConnectionAggregateInput> | null | undefined;
  NOT?: ConditionHasMappedConditionConnectionAggregateInput | null | undefined;
  OR?: Array<ConditionHasMappedConditionConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ConditionHasMappedConditionNodeAggregationWhereInput | null | undefined;
};

export type ConditionHasMappedConditionConnectionFilters = {
  /** Filter Conditions by aggregating results on related ConditionHasMappedConditionConnections */
  aggregate?: ConditionHasMappedConditionConnectionAggregateInput | null | undefined;
  /** Return Conditions where all of the related ConditionHasMappedConditionConnections match this filter */
  all?: ConditionHasMappedConditionConnectionWhere | null | undefined;
  /** Return Conditions where none of the related ConditionHasMappedConditionConnections match this filter */
  none?: ConditionHasMappedConditionConnectionWhere | null | undefined;
  /** Return Conditions where one of the related ConditionHasMappedConditionConnections match this filter */
  single?: ConditionHasMappedConditionConnectionWhere | null | undefined;
  /** Return Conditions where some of the related ConditionHasMappedConditionConnections match this filter */
  some?: ConditionHasMappedConditionConnectionWhere | null | undefined;
};

export type ConditionHasMappedConditionConnectionWhere = {
  AND?: Array<ConditionHasMappedConditionConnectionWhere> | null | undefined;
  NOT?: ConditionHasMappedConditionConnectionWhere | null | undefined;
  OR?: Array<ConditionHasMappedConditionConnectionWhere> | null | undefined;
  node?: DiseaseWhere | null | undefined;
};

export type ConditionHasMappedConditionNodeAggregationWhereInput = {
  AND?: Array<ConditionHasMappedConditionNodeAggregationWhereInput> | null | undefined;
  NOT?: ConditionHasMappedConditionNodeAggregationWhereInput | null | undefined;
  OR?: Array<ConditionHasMappedConditionNodeAggregationWhereInput> | null | undefined;
  countArticles?: IntScalarAggregationFilters | null | undefined;
  countCoreProjects?: IntScalarAggregationFilters | null | undefined;
  countEpiArticles?: IntScalarAggregationFilters | null | undefined;
  countGenes?: IntScalarAggregationFilters | null | undefined;
  countNhsArticles?: IntScalarAggregationFilters | null | undefined;
  countPhenotypes?: IntScalarAggregationFilters | null | undefined;
  countProjects?: IntScalarAggregationFilters | null | undefined;
  countTrials?: IntScalarAggregationFilters | null | undefined;
  diseaseType?: StringScalarAggregationFilters | null | undefined;
  gardId?: StringScalarAggregationFilters | null | undefined;
  gardName?: StringScalarAggregationFilters | null | undefined;
  medGen?: StringScalarAggregationFilters | null | undefined;
  mondo?: StringScalarAggregationFilters | null | undefined;
  omim?: StringScalarAggregationFilters | null | undefined;
  omimps?: StringScalarAggregationFilters | null | undefined;
  orphanet?: StringScalarAggregationFilters | null | undefined;
  umls?: StringScalarAggregationFilters | null | undefined;
};

export type ConditionRelationshipFilters = {
  /** Filter type where all of the related Conditions match this filter */
  all?: ConditionWhere | null | undefined;
  /** Filter type where none of the related Conditions match this filter */
  none?: ConditionWhere | null | undefined;
  /** Filter type where one of the related Conditions match this filter */
  single?: ConditionWhere | null | undefined;
  /** Filter type where some of the related Conditions match this filter */
  some?: ConditionWhere | null | undefined;
};

export type ConditionWhere = {
  AND?: Array<ConditionWhere> | null | undefined;
  NOT?: ConditionWhere | null | undefined;
  OR?: Array<ConditionWhere> | null | undefined;
  condition?: StringScalarFilters | null | undefined;
  hasClinicalTrial?: ClinicalTrialRelationshipFilters | null | undefined;
  hasClinicalTrialConnection?: ConditionHasClinicalTrialConnectionFilters | null | undefined;
  hasMappedCondition?: DiseaseRelationshipFilters | null | undefined;
  hasMappedConditionConnection?: ConditionHasMappedConditionConnectionFilters | null | undefined;
};

export type ConnectionAggregationCountFilterInput = {
  edges?: IntScalarFilters | null | undefined;
  nodes?: IntScalarFilters | null | undefined;
};

export type CoreProjectHasCoreProjectConnectionAggregateInput = {
  AND?: Array<CoreProjectHasCoreProjectConnectionAggregateInput> | null | undefined;
  NOT?: CoreProjectHasCoreProjectConnectionAggregateInput | null | undefined;
  OR?: Array<CoreProjectHasCoreProjectConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: CoreProjectHasCoreProjectNodeAggregationWhereInput | null | undefined;
};

export type CoreProjectHasCoreProjectConnectionFilters = {
  /** Filter CoreProjects by aggregating results on related CoreProjectHasCoreProjectConnections */
  aggregate?: CoreProjectHasCoreProjectConnectionAggregateInput | null | undefined;
  /** Return CoreProjects where all of the related CoreProjectHasCoreProjectConnections match this filter */
  all?: CoreProjectHasCoreProjectConnectionWhere | null | undefined;
  /** Return CoreProjects where none of the related CoreProjectHasCoreProjectConnections match this filter */
  none?: CoreProjectHasCoreProjectConnectionWhere | null | undefined;
  /** Return CoreProjects where one of the related CoreProjectHasCoreProjectConnections match this filter */
  single?: CoreProjectHasCoreProjectConnectionWhere | null | undefined;
  /** Return CoreProjects where some of the related CoreProjectHasCoreProjectConnections match this filter */
  some?: CoreProjectHasCoreProjectConnectionWhere | null | undefined;
};

export type CoreProjectHasCoreProjectConnectionWhere = {
  AND?: Array<CoreProjectHasCoreProjectConnectionWhere> | null | undefined;
  NOT?: CoreProjectHasCoreProjectConnectionWhere | null | undefined;
  OR?: Array<CoreProjectHasCoreProjectConnectionWhere> | null | undefined;
  node?: DiseaseWhere | null | undefined;
};

export type CoreProjectHasCoreProjectNodeAggregationWhereInput = {
  AND?: Array<CoreProjectHasCoreProjectNodeAggregationWhereInput> | null | undefined;
  NOT?: CoreProjectHasCoreProjectNodeAggregationWhereInput | null | undefined;
  OR?: Array<CoreProjectHasCoreProjectNodeAggregationWhereInput> | null | undefined;
  countArticles?: IntScalarAggregationFilters | null | undefined;
  countCoreProjects?: IntScalarAggregationFilters | null | undefined;
  countEpiArticles?: IntScalarAggregationFilters | null | undefined;
  countGenes?: IntScalarAggregationFilters | null | undefined;
  countNhsArticles?: IntScalarAggregationFilters | null | undefined;
  countPhenotypes?: IntScalarAggregationFilters | null | undefined;
  countProjects?: IntScalarAggregationFilters | null | undefined;
  countTrials?: IntScalarAggregationFilters | null | undefined;
  diseaseType?: StringScalarAggregationFilters | null | undefined;
  gardId?: StringScalarAggregationFilters | null | undefined;
  gardName?: StringScalarAggregationFilters | null | undefined;
  medGen?: StringScalarAggregationFilters | null | undefined;
  mondo?: StringScalarAggregationFilters | null | undefined;
  omim?: StringScalarAggregationFilters | null | undefined;
  omimps?: StringScalarAggregationFilters | null | undefined;
  orphanet?: StringScalarAggregationFilters | null | undefined;
  umls?: StringScalarAggregationFilters | null | undefined;
};

export type CoreProjectHasFundingOrganizationConnectionAggregateInput = {
  AND?: Array<CoreProjectHasFundingOrganizationConnectionAggregateInput> | null | undefined;
  NOT?: CoreProjectHasFundingOrganizationConnectionAggregateInput | null | undefined;
  OR?: Array<CoreProjectHasFundingOrganizationConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: CoreProjectHasFundingOrganizationNodeAggregationWhereInput | null | undefined;
};

export type CoreProjectHasFundingOrganizationConnectionFilters = {
  /** Filter CoreProjects by aggregating results on related CoreProjectHasFundingOrganizationConnections */
  aggregate?: CoreProjectHasFundingOrganizationConnectionAggregateInput | null | undefined;
  /** Return CoreProjects where all of the related CoreProjectHasFundingOrganizationConnections match this filter */
  all?: CoreProjectHasFundingOrganizationConnectionWhere | null | undefined;
  /** Return CoreProjects where none of the related CoreProjectHasFundingOrganizationConnections match this filter */
  none?: CoreProjectHasFundingOrganizationConnectionWhere | null | undefined;
  /** Return CoreProjects where one of the related CoreProjectHasFundingOrganizationConnections match this filter */
  single?: CoreProjectHasFundingOrganizationConnectionWhere | null | undefined;
  /** Return CoreProjects where some of the related CoreProjectHasFundingOrganizationConnections match this filter */
  some?: CoreProjectHasFundingOrganizationConnectionWhere | null | undefined;
};

export type CoreProjectHasFundingOrganizationConnectionWhere = {
  AND?: Array<CoreProjectHasFundingOrganizationConnectionWhere> | null | undefined;
  NOT?: CoreProjectHasFundingOrganizationConnectionWhere | null | undefined;
  OR?: Array<CoreProjectHasFundingOrganizationConnectionWhere> | null | undefined;
  node?: OrganizationWhere | null | undefined;
};

export type CoreProjectHasFundingOrganizationNodeAggregationWhereInput = {
  AND?: Array<CoreProjectHasFundingOrganizationNodeAggregationWhereInput> | null | undefined;
  NOT?: CoreProjectHasFundingOrganizationNodeAggregationWhereInput | null | undefined;
  OR?: Array<CoreProjectHasFundingOrganizationNodeAggregationWhereInput> | null | undefined;
  _idx_key?: StringScalarAggregationFilters | null | undefined;
  name?: StringScalarAggregationFilters | null | undefined;
};

export type CoreProjectHasPatentConnectionAggregateInput = {
  AND?: Array<CoreProjectHasPatentConnectionAggregateInput> | null | undefined;
  NOT?: CoreProjectHasPatentConnectionAggregateInput | null | undefined;
  OR?: Array<CoreProjectHasPatentConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: CoreProjectHasPatentNodeAggregationWhereInput | null | undefined;
};

export type CoreProjectHasPatentConnectionFilters = {
  /** Filter CoreProjects by aggregating results on related CoreProjectHasPatentConnections */
  aggregate?: CoreProjectHasPatentConnectionAggregateInput | null | undefined;
  /** Return CoreProjects where all of the related CoreProjectHasPatentConnections match this filter */
  all?: CoreProjectHasPatentConnectionWhere | null | undefined;
  /** Return CoreProjects where none of the related CoreProjectHasPatentConnections match this filter */
  none?: CoreProjectHasPatentConnectionWhere | null | undefined;
  /** Return CoreProjects where one of the related CoreProjectHasPatentConnections match this filter */
  single?: CoreProjectHasPatentConnectionWhere | null | undefined;
  /** Return CoreProjects where some of the related CoreProjectHasPatentConnections match this filter */
  some?: CoreProjectHasPatentConnectionWhere | null | undefined;
};

export type CoreProjectHasPatentConnectionWhere = {
  AND?: Array<CoreProjectHasPatentConnectionWhere> | null | undefined;
  NOT?: CoreProjectHasPatentConnectionWhere | null | undefined;
  OR?: Array<CoreProjectHasPatentConnectionWhere> | null | undefined;
  node?: PatentWhere | null | undefined;
};

export type CoreProjectHasPatentNodeAggregationWhereInput = {
  AND?: Array<CoreProjectHasPatentNodeAggregationWhereInput> | null | undefined;
  NOT?: CoreProjectHasPatentNodeAggregationWhereInput | null | undefined;
  OR?: Array<CoreProjectHasPatentNodeAggregationWhereInput> | null | undefined;
  id?: StringScalarAggregationFilters | null | undefined;
};

export type CoreProjectHasPublicationConnectionAggregateInput = {
  AND?: Array<CoreProjectHasPublicationConnectionAggregateInput> | null | undefined;
  NOT?: CoreProjectHasPublicationConnectionAggregateInput | null | undefined;
  OR?: Array<CoreProjectHasPublicationConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: CoreProjectHasPublicationNodeAggregationWhereInput | null | undefined;
};

export type CoreProjectHasPublicationConnectionFilters = {
  /** Filter CoreProjects by aggregating results on related CoreProjectHasPublicationConnections */
  aggregate?: CoreProjectHasPublicationConnectionAggregateInput | null | undefined;
  /** Return CoreProjects where all of the related CoreProjectHasPublicationConnections match this filter */
  all?: CoreProjectHasPublicationConnectionWhere | null | undefined;
  /** Return CoreProjects where none of the related CoreProjectHasPublicationConnections match this filter */
  none?: CoreProjectHasPublicationConnectionWhere | null | undefined;
  /** Return CoreProjects where one of the related CoreProjectHasPublicationConnections match this filter */
  single?: CoreProjectHasPublicationConnectionWhere | null | undefined;
  /** Return CoreProjects where some of the related CoreProjectHasPublicationConnections match this filter */
  some?: CoreProjectHasPublicationConnectionWhere | null | undefined;
};

export type CoreProjectHasPublicationConnectionWhere = {
  AND?: Array<CoreProjectHasPublicationConnectionWhere> | null | undefined;
  NOT?: CoreProjectHasPublicationConnectionWhere | null | undefined;
  OR?: Array<CoreProjectHasPublicationConnectionWhere> | null | undefined;
  node?: ArticleWhere | null | undefined;
};

export type CoreProjectHasPublicationNodeAggregationWhereInput = {
  AND?: Array<CoreProjectHasPublicationNodeAggregationWhereInput> | null | undefined;
  NOT?: CoreProjectHasPublicationNodeAggregationWhereInput | null | undefined;
  OR?: Array<CoreProjectHasPublicationNodeAggregationWhereInput> | null | undefined;
  abstractText?: StringScalarAggregationFilters | null | undefined;
  citationCount?: IntScalarAggregationFilters | null | undefined;
  dateCreatedByRDAS?: StringScalarAggregationFilters | null | undefined;
  doi?: StringScalarAggregationFilters | null | undefined;
  firstPublicationDate?: StringScalarAggregationFilters | null | undefined;
  fullTextUrls?: StringScalarAggregationFilters | null | undefined;
  hasPDF?: StringScalarAggregationFilters | null | undefined;
  inEPMC?: StringScalarAggregationFilters | null | undefined;
  inPMC?: StringScalarAggregationFilters | null | undefined;
  isOpenAccess?: StringScalarAggregationFilters | null | undefined;
  issue?: StringScalarAggregationFilters | null | undefined;
  lastUpdatedDateByRDAS?: StringScalarAggregationFilters | null | undefined;
  pubType?: StringScalarAggregationFilters | null | undefined;
  publicationYear?: IntScalarAggregationFilters | null | undefined;
  pubmedId?: IntScalarAggregationFilters | null | undefined;
  title?: StringScalarAggregationFilters | null | undefined;
  volume?: StringScalarAggregationFilters | null | undefined;
};

export type CoreProjectHasSubprojectConnectionAggregateInput = {
  AND?: Array<CoreProjectHasSubprojectConnectionAggregateInput> | null | undefined;
  NOT?: CoreProjectHasSubprojectConnectionAggregateInput | null | undefined;
  OR?: Array<CoreProjectHasSubprojectConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: CoreProjectHasSubprojectNodeAggregationWhereInput | null | undefined;
};

export type CoreProjectHasSubprojectConnectionFilters = {
  /** Filter CoreProjects by aggregating results on related CoreProjectHasSubprojectConnections */
  aggregate?: CoreProjectHasSubprojectConnectionAggregateInput | null | undefined;
  /** Return CoreProjects where all of the related CoreProjectHasSubprojectConnections match this filter */
  all?: CoreProjectHasSubprojectConnectionWhere | null | undefined;
  /** Return CoreProjects where none of the related CoreProjectHasSubprojectConnections match this filter */
  none?: CoreProjectHasSubprojectConnectionWhere | null | undefined;
  /** Return CoreProjects where one of the related CoreProjectHasSubprojectConnections match this filter */
  single?: CoreProjectHasSubprojectConnectionWhere | null | undefined;
  /** Return CoreProjects where some of the related CoreProjectHasSubprojectConnections match this filter */
  some?: CoreProjectHasSubprojectConnectionWhere | null | undefined;
};

export type CoreProjectHasSubprojectConnectionWhere = {
  AND?: Array<CoreProjectHasSubprojectConnectionWhere> | null | undefined;
  NOT?: CoreProjectHasSubprojectConnectionWhere | null | undefined;
  OR?: Array<CoreProjectHasSubprojectConnectionWhere> | null | undefined;
  node?: ProjectWhere | null | undefined;
};

export type CoreProjectHasSubprojectNodeAggregationWhereInput = {
  AND?: Array<CoreProjectHasSubprojectNodeAggregationWhereInput> | null | undefined;
  NOT?: CoreProjectHasSubprojectNodeAggregationWhereInput | null | undefined;
  OR?: Array<CoreProjectHasSubprojectNodeAggregationWhereInput> | null | undefined;
  abstract?: StringScalarAggregationFilters | null | undefined;
  activity?: StringScalarAggregationFilters | null | undefined;
  applicationId?: IntScalarAggregationFilters | null | undefined;
  applicationType?: StringScalarAggregationFilters | null | undefined;
  cfdaCode?: StringScalarAggregationFilters | null | undefined;
  coreProjectNumber?: StringScalarAggregationFilters | null | undefined;
  dateCreatedRDAS?: StringScalarAggregationFilters | null | undefined;
  foaNumber?: StringScalarAggregationFilters | null | undefined;
  fullProjectNumber?: StringScalarAggregationFilters | null | undefined;
  fundingMechanism?: StringScalarAggregationFilters | null | undefined;
  fundingYear?: IntScalarAggregationFilters | null | undefined;
  phr?: StringScalarAggregationFilters | null | undefined;
  serialNumber?: StringScalarAggregationFilters | null | undefined;
  studySection?: StringScalarAggregationFilters | null | undefined;
  studySectionName?: StringScalarAggregationFilters | null | undefined;
  supportYear?: StringScalarAggregationFilters | null | undefined;
  terms?: StringScalarAggregationFilters | null | undefined;
  title?: StringScalarAggregationFilters | null | undefined;
  totalCost?: StringScalarAggregationFilters | null | undefined;
};

export type CoreProjectRelationshipFilters = {
  /** Filter type where all of the related CoreProjects match this filter */
  all?: CoreProjectWhere | null | undefined;
  /** Filter type where none of the related CoreProjects match this filter */
  none?: CoreProjectWhere | null | undefined;
  /** Filter type where one of the related CoreProjects match this filter */
  single?: CoreProjectWhere | null | undefined;
  /** Filter type where some of the related CoreProjects match this filter */
  some?: CoreProjectWhere | null | undefined;
};

export type CoreProjectWhere = {
  AND?: Array<CoreProjectWhere> | null | undefined;
  NOT?: CoreProjectWhere | null | undefined;
  OR?: Array<CoreProjectWhere> | null | undefined;
  coreProjectNumber?: StringScalarFilters | null | undefined;
  hasCoreProject?: DiseaseRelationshipFilters | null | undefined;
  hasCoreProjectConnection?: CoreProjectHasCoreProjectConnectionFilters | null | undefined;
  hasFundingOrganization?: OrganizationRelationshipFilters | null | undefined;
  hasFundingOrganizationConnection?: CoreProjectHasFundingOrganizationConnectionFilters | null | undefined;
  hasPatent?: PatentRelationshipFilters | null | undefined;
  hasPatentConnection?: CoreProjectHasPatentConnectionFilters | null | undefined;
  hasPublication?: ArticleRelationshipFilters | null | undefined;
  hasPublicationConnection?: CoreProjectHasPublicationConnectionFilters | null | undefined;
  hasSubproject?: ProjectRelationshipFilters | null | undefined;
  hasSubprojectConnection?: CoreProjectHasSubprojectConnectionFilters | null | undefined;
  totalCost?: IntScalarFilters | null | undefined;
};

export type DiseaseDiseaseSubClassOfConnectionAggregateInput = {
  AND?: Array<DiseaseDiseaseSubClassOfConnectionAggregateInput> | null | undefined;
  NOT?: DiseaseDiseaseSubClassOfConnectionAggregateInput | null | undefined;
  OR?: Array<DiseaseDiseaseSubClassOfConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: DiseaseDiseaseSubClassOfNodeAggregationWhereInput | null | undefined;
};

export type DiseaseDiseaseSubClassOfConnectionFilters = {
  /** Filter Diseases by aggregating results on related DiseaseDiseaseSubClassOfConnections */
  aggregate?: DiseaseDiseaseSubClassOfConnectionAggregateInput | null | undefined;
  /** Return Diseases where all of the related DiseaseDiseaseSubClassOfConnections match this filter */
  all?: DiseaseDiseaseSubClassOfConnectionWhere | null | undefined;
  /** Return Diseases where none of the related DiseaseDiseaseSubClassOfConnections match this filter */
  none?: DiseaseDiseaseSubClassOfConnectionWhere | null | undefined;
  /** Return Diseases where one of the related DiseaseDiseaseSubClassOfConnections match this filter */
  single?: DiseaseDiseaseSubClassOfConnectionWhere | null | undefined;
  /** Return Diseases where some of the related DiseaseDiseaseSubClassOfConnections match this filter */
  some?: DiseaseDiseaseSubClassOfConnectionWhere | null | undefined;
};

export type DiseaseDiseaseSubClassOfConnectionWhere = {
  AND?: Array<DiseaseDiseaseSubClassOfConnectionWhere> | null | undefined;
  NOT?: DiseaseDiseaseSubClassOfConnectionWhere | null | undefined;
  OR?: Array<DiseaseDiseaseSubClassOfConnectionWhere> | null | undefined;
  node?: DiseaseWhere | null | undefined;
};

export type DiseaseDiseaseSubClassOfNodeAggregationWhereInput = {
  AND?: Array<DiseaseDiseaseSubClassOfNodeAggregationWhereInput> | null | undefined;
  NOT?: DiseaseDiseaseSubClassOfNodeAggregationWhereInput | null | undefined;
  OR?: Array<DiseaseDiseaseSubClassOfNodeAggregationWhereInput> | null | undefined;
  countArticles?: IntScalarAggregationFilters | null | undefined;
  countCoreProjects?: IntScalarAggregationFilters | null | undefined;
  countEpiArticles?: IntScalarAggregationFilters | null | undefined;
  countGenes?: IntScalarAggregationFilters | null | undefined;
  countNhsArticles?: IntScalarAggregationFilters | null | undefined;
  countPhenotypes?: IntScalarAggregationFilters | null | undefined;
  countProjects?: IntScalarAggregationFilters | null | undefined;
  countTrials?: IntScalarAggregationFilters | null | undefined;
  diseaseType?: StringScalarAggregationFilters | null | undefined;
  gardId?: StringScalarAggregationFilters | null | undefined;
  gardName?: StringScalarAggregationFilters | null | undefined;
  medGen?: StringScalarAggregationFilters | null | undefined;
  mondo?: StringScalarAggregationFilters | null | undefined;
  omim?: StringScalarAggregationFilters | null | undefined;
  omimps?: StringScalarAggregationFilters | null | undefined;
  orphanet?: StringScalarAggregationFilters | null | undefined;
  umls?: StringScalarAggregationFilters | null | undefined;
};

export type DiseaseHasAssociatedGeneConnectionAggregateInput = {
  AND?: Array<DiseaseHasAssociatedGeneConnectionAggregateInput> | null | undefined;
  NOT?: DiseaseHasAssociatedGeneConnectionAggregateInput | null | undefined;
  OR?: Array<DiseaseHasAssociatedGeneConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  edge?: AssociatedWithGenePropertiesAggregationWhereInput | null | undefined;
  node?: DiseaseHasAssociatedGeneNodeAggregationWhereInput | null | undefined;
};

export type DiseaseHasAssociatedGeneConnectionFilters = {
  /** Filter Diseases by aggregating results on related DiseaseHasAssociatedGeneConnections */
  aggregate?: DiseaseHasAssociatedGeneConnectionAggregateInput | null | undefined;
  /** Return Diseases where all of the related DiseaseHasAssociatedGeneConnections match this filter */
  all?: DiseaseHasAssociatedGeneConnectionWhere | null | undefined;
  /** Return Diseases where none of the related DiseaseHasAssociatedGeneConnections match this filter */
  none?: DiseaseHasAssociatedGeneConnectionWhere | null | undefined;
  /** Return Diseases where one of the related DiseaseHasAssociatedGeneConnections match this filter */
  single?: DiseaseHasAssociatedGeneConnectionWhere | null | undefined;
  /** Return Diseases where some of the related DiseaseHasAssociatedGeneConnections match this filter */
  some?: DiseaseHasAssociatedGeneConnectionWhere | null | undefined;
};

export type DiseaseHasAssociatedGeneConnectionWhere = {
  AND?: Array<DiseaseHasAssociatedGeneConnectionWhere> | null | undefined;
  NOT?: DiseaseHasAssociatedGeneConnectionWhere | null | undefined;
  OR?: Array<DiseaseHasAssociatedGeneConnectionWhere> | null | undefined;
  edge?: AssociatedWithGenePropertiesWhere | null | undefined;
  node?: GeneWhere | null | undefined;
};

export type DiseaseHasAssociatedGeneNodeAggregationWhereInput = {
  AND?: Array<DiseaseHasAssociatedGeneNodeAggregationWhereInput> | null | undefined;
  NOT?: DiseaseHasAssociatedGeneNodeAggregationWhereInput | null | undefined;
  OR?: Array<DiseaseHasAssociatedGeneNodeAggregationWhereInput> | null | undefined;
  countDiseases?: IntScalarAggregationFilters | null | undefined;
  geneIdentifier?: StringScalarAggregationFilters | null | undefined;
  geneSymbol?: StringScalarAggregationFilters | null | undefined;
  geneTitle?: StringScalarAggregationFilters | null | undefined;
  geneUrl?: StringScalarAggregationFilters | null | undefined;
  locus?: StringScalarAggregationFilters | null | undefined;
  locusGroup?: StringScalarAggregationFilters | null | undefined;
  medGen?: StringScalarAggregationFilters | null | undefined;
  mondo?: StringScalarAggregationFilters | null | undefined;
  omim?: StringScalarAggregationFilters | null | undefined;
  orphanet?: StringScalarAggregationFilters | null | undefined;
  umls?: StringScalarAggregationFilters | null | undefined;
};

export type DiseaseHasClinicalTrialConnectionAggregateInput = {
  AND?: Array<DiseaseHasClinicalTrialConnectionAggregateInput> | null | undefined;
  NOT?: DiseaseHasClinicalTrialConnectionAggregateInput | null | undefined;
  OR?: Array<DiseaseHasClinicalTrialConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: DiseaseHasClinicalTrialNodeAggregationWhereInput | null | undefined;
};

export type DiseaseHasClinicalTrialConnectionFilters = {
  /** Filter Diseases by aggregating results on related DiseaseHasClinicalTrialConnections */
  aggregate?: DiseaseHasClinicalTrialConnectionAggregateInput | null | undefined;
  /** Return Diseases where all of the related DiseaseHasClinicalTrialConnections match this filter */
  all?: DiseaseHasClinicalTrialConnectionWhere | null | undefined;
  /** Return Diseases where none of the related DiseaseHasClinicalTrialConnections match this filter */
  none?: DiseaseHasClinicalTrialConnectionWhere | null | undefined;
  /** Return Diseases where one of the related DiseaseHasClinicalTrialConnections match this filter */
  single?: DiseaseHasClinicalTrialConnectionWhere | null | undefined;
  /** Return Diseases where some of the related DiseaseHasClinicalTrialConnections match this filter */
  some?: DiseaseHasClinicalTrialConnectionWhere | null | undefined;
};

export type DiseaseHasClinicalTrialConnectionWhere = {
  AND?: Array<DiseaseHasClinicalTrialConnectionWhere> | null | undefined;
  NOT?: DiseaseHasClinicalTrialConnectionWhere | null | undefined;
  OR?: Array<DiseaseHasClinicalTrialConnectionWhere> | null | undefined;
  node?: ClinicalTrialWhere | null | undefined;
};

export type DiseaseHasClinicalTrialNodeAggregationWhereInput = {
  AND?: Array<DiseaseHasClinicalTrialNodeAggregationWhereInput> | null | undefined;
  NOT?: DiseaseHasClinicalTrialNodeAggregationWhereInput | null | undefined;
  OR?: Array<DiseaseHasClinicalTrialNodeAggregationWhereInput> | null | undefined;
  briefSummary?: StringScalarAggregationFilters | null | undefined;
  briefTitle?: StringScalarAggregationFilters | null | undefined;
  completionDate?: StringScalarAggregationFilters | null | undefined;
  completionDateType?: StringScalarAggregationFilters | null | undefined;
  dateCreatedRDAS?: StringScalarAggregationFilters | null | undefined;
  lastKnownStatus?: StringScalarAggregationFilters | null | undefined;
  lastUpdatePostDate?: StringScalarAggregationFilters | null | undefined;
  lastUpdatePostDateType?: StringScalarAggregationFilters | null | undefined;
  lastUpdateSubmitDate?: StringScalarAggregationFilters | null | undefined;
  lastUpdatedRDAS?: StringScalarAggregationFilters | null | undefined;
  nctId?: StringScalarAggregationFilters | null | undefined;
  officialTitle?: StringScalarAggregationFilters | null | undefined;
  overallStatus?: StringScalarAggregationFilters | null | undefined;
  patientRegistry?: StringScalarAggregationFilters | null | undefined;
  phase?: StringScalarAggregationFilters | null | undefined;
  primaryCompletionDate?: StringScalarAggregationFilters | null | undefined;
  primaryCompletionDateType?: StringScalarAggregationFilters | null | undefined;
  resultsFirstPostDate?: StringScalarAggregationFilters | null | undefined;
  resultsFirstPostDateType?: StringScalarAggregationFilters | null | undefined;
  resultsFirstPostedQCCommentsDate?: StringScalarAggregationFilters | null | undefined;
  startDate?: StringScalarAggregationFilters | null | undefined;
  startDateType?: StringScalarAggregationFilters | null | undefined;
  studyType?: StringScalarAggregationFilters | null | undefined;
};

export type DiseaseHasCoreProjectConnectionAggregateInput = {
  AND?: Array<DiseaseHasCoreProjectConnectionAggregateInput> | null | undefined;
  NOT?: DiseaseHasCoreProjectConnectionAggregateInput | null | undefined;
  OR?: Array<DiseaseHasCoreProjectConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: DiseaseHasCoreProjectNodeAggregationWhereInput | null | undefined;
};

export type DiseaseHasCoreProjectConnectionFilters = {
  /** Filter Diseases by aggregating results on related DiseaseHasCoreProjectConnections */
  aggregate?: DiseaseHasCoreProjectConnectionAggregateInput | null | undefined;
  /** Return Diseases where all of the related DiseaseHasCoreProjectConnections match this filter */
  all?: DiseaseHasCoreProjectConnectionWhere | null | undefined;
  /** Return Diseases where none of the related DiseaseHasCoreProjectConnections match this filter */
  none?: DiseaseHasCoreProjectConnectionWhere | null | undefined;
  /** Return Diseases where one of the related DiseaseHasCoreProjectConnections match this filter */
  single?: DiseaseHasCoreProjectConnectionWhere | null | undefined;
  /** Return Diseases where some of the related DiseaseHasCoreProjectConnections match this filter */
  some?: DiseaseHasCoreProjectConnectionWhere | null | undefined;
};

export type DiseaseHasCoreProjectConnectionWhere = {
  AND?: Array<DiseaseHasCoreProjectConnectionWhere> | null | undefined;
  NOT?: DiseaseHasCoreProjectConnectionWhere | null | undefined;
  OR?: Array<DiseaseHasCoreProjectConnectionWhere> | null | undefined;
  node?: CoreProjectWhere | null | undefined;
};

export type DiseaseHasCoreProjectNodeAggregationWhereInput = {
  AND?: Array<DiseaseHasCoreProjectNodeAggregationWhereInput> | null | undefined;
  NOT?: DiseaseHasCoreProjectNodeAggregationWhereInput | null | undefined;
  OR?: Array<DiseaseHasCoreProjectNodeAggregationWhereInput> | null | undefined;
  coreProjectNumber?: StringScalarAggregationFilters | null | undefined;
  totalCost?: IntScalarAggregationFilters | null | undefined;
};

export type DiseaseHasMappedConditionConnectionAggregateInput = {
  AND?: Array<DiseaseHasMappedConditionConnectionAggregateInput> | null | undefined;
  NOT?: DiseaseHasMappedConditionConnectionAggregateInput | null | undefined;
  OR?: Array<DiseaseHasMappedConditionConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: DiseaseHasMappedConditionNodeAggregationWhereInput | null | undefined;
};

export type DiseaseHasMappedConditionConnectionFilters = {
  /** Filter Diseases by aggregating results on related DiseaseHasMappedConditionConnections */
  aggregate?: DiseaseHasMappedConditionConnectionAggregateInput | null | undefined;
  /** Return Diseases where all of the related DiseaseHasMappedConditionConnections match this filter */
  all?: DiseaseHasMappedConditionConnectionWhere | null | undefined;
  /** Return Diseases where none of the related DiseaseHasMappedConditionConnections match this filter */
  none?: DiseaseHasMappedConditionConnectionWhere | null | undefined;
  /** Return Diseases where one of the related DiseaseHasMappedConditionConnections match this filter */
  single?: DiseaseHasMappedConditionConnectionWhere | null | undefined;
  /** Return Diseases where some of the related DiseaseHasMappedConditionConnections match this filter */
  some?: DiseaseHasMappedConditionConnectionWhere | null | undefined;
};

export type DiseaseHasMappedConditionConnectionWhere = {
  AND?: Array<DiseaseHasMappedConditionConnectionWhere> | null | undefined;
  NOT?: DiseaseHasMappedConditionConnectionWhere | null | undefined;
  OR?: Array<DiseaseHasMappedConditionConnectionWhere> | null | undefined;
  node?: ConditionWhere | null | undefined;
};

export type DiseaseHasMappedConditionNodeAggregationWhereInput = {
  AND?: Array<DiseaseHasMappedConditionNodeAggregationWhereInput> | null | undefined;
  NOT?: DiseaseHasMappedConditionNodeAggregationWhereInput | null | undefined;
  OR?: Array<DiseaseHasMappedConditionNodeAggregationWhereInput> | null | undefined;
  condition?: StringScalarAggregationFilters | null | undefined;
};

export type DiseaseHasMentionInConnectionAggregateInput = {
  AND?: Array<DiseaseHasMentionInConnectionAggregateInput> | null | undefined;
  NOT?: DiseaseHasMentionInConnectionAggregateInput | null | undefined;
  OR?: Array<DiseaseHasMentionInConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: DiseaseHasMentionInNodeAggregationWhereInput | null | undefined;
};

export type DiseaseHasMentionInConnectionFilters = {
  /** Filter Diseases by aggregating results on related DiseaseHasMentionInConnections */
  aggregate?: DiseaseHasMentionInConnectionAggregateInput | null | undefined;
  /** Return Diseases where all of the related DiseaseHasMentionInConnections match this filter */
  all?: DiseaseHasMentionInConnectionWhere | null | undefined;
  /** Return Diseases where none of the related DiseaseHasMentionInConnections match this filter */
  none?: DiseaseHasMentionInConnectionWhere | null | undefined;
  /** Return Diseases where one of the related DiseaseHasMentionInConnections match this filter */
  single?: DiseaseHasMentionInConnectionWhere | null | undefined;
  /** Return Diseases where some of the related DiseaseHasMentionInConnections match this filter */
  some?: DiseaseHasMentionInConnectionWhere | null | undefined;
};

export type DiseaseHasMentionInConnectionWhere = {
  AND?: Array<DiseaseHasMentionInConnectionWhere> | null | undefined;
  NOT?: DiseaseHasMentionInConnectionWhere | null | undefined;
  OR?: Array<DiseaseHasMentionInConnectionWhere> | null | undefined;
  node?: ArticleWhere | null | undefined;
};

export type DiseaseHasMentionInNodeAggregationWhereInput = {
  AND?: Array<DiseaseHasMentionInNodeAggregationWhereInput> | null | undefined;
  NOT?: DiseaseHasMentionInNodeAggregationWhereInput | null | undefined;
  OR?: Array<DiseaseHasMentionInNodeAggregationWhereInput> | null | undefined;
  abstractText?: StringScalarAggregationFilters | null | undefined;
  citationCount?: IntScalarAggregationFilters | null | undefined;
  dateCreatedByRDAS?: StringScalarAggregationFilters | null | undefined;
  doi?: StringScalarAggregationFilters | null | undefined;
  firstPublicationDate?: StringScalarAggregationFilters | null | undefined;
  fullTextUrls?: StringScalarAggregationFilters | null | undefined;
  hasPDF?: StringScalarAggregationFilters | null | undefined;
  inEPMC?: StringScalarAggregationFilters | null | undefined;
  inPMC?: StringScalarAggregationFilters | null | undefined;
  isOpenAccess?: StringScalarAggregationFilters | null | undefined;
  issue?: StringScalarAggregationFilters | null | undefined;
  lastUpdatedDateByRDAS?: StringScalarAggregationFilters | null | undefined;
  pubType?: StringScalarAggregationFilters | null | undefined;
  publicationYear?: IntScalarAggregationFilters | null | undefined;
  pubmedId?: IntScalarAggregationFilters | null | undefined;
  title?: StringScalarAggregationFilters | null | undefined;
  volume?: StringScalarAggregationFilters | null | undefined;
};

export type DiseaseHasPhenotypeConnectionAggregateInput = {
  AND?: Array<DiseaseHasPhenotypeConnectionAggregateInput> | null | undefined;
  NOT?: DiseaseHasPhenotypeConnectionAggregateInput | null | undefined;
  OR?: Array<DiseaseHasPhenotypeConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  edge?: HasPhenotypePropertiesAggregationWhereInput | null | undefined;
  node?: DiseaseHasPhenotypeNodeAggregationWhereInput | null | undefined;
};

export type DiseaseHasPhenotypeConnectionFilters = {
  /** Filter Diseases by aggregating results on related DiseaseHasPhenotypeConnections */
  aggregate?: DiseaseHasPhenotypeConnectionAggregateInput | null | undefined;
  /** Return Diseases where all of the related DiseaseHasPhenotypeConnections match this filter */
  all?: DiseaseHasPhenotypeConnectionWhere | null | undefined;
  /** Return Diseases where none of the related DiseaseHasPhenotypeConnections match this filter */
  none?: DiseaseHasPhenotypeConnectionWhere | null | undefined;
  /** Return Diseases where one of the related DiseaseHasPhenotypeConnections match this filter */
  single?: DiseaseHasPhenotypeConnectionWhere | null | undefined;
  /** Return Diseases where some of the related DiseaseHasPhenotypeConnections match this filter */
  some?: DiseaseHasPhenotypeConnectionWhere | null | undefined;
};

export type DiseaseHasPhenotypeConnectionWhere = {
  AND?: Array<DiseaseHasPhenotypeConnectionWhere> | null | undefined;
  NOT?: DiseaseHasPhenotypeConnectionWhere | null | undefined;
  OR?: Array<DiseaseHasPhenotypeConnectionWhere> | null | undefined;
  edge?: HasPhenotypePropertiesWhere | null | undefined;
  node?: PhenotypeWhere | null | undefined;
};

export type DiseaseHasPhenotypeNodeAggregationWhereInput = {
  AND?: Array<DiseaseHasPhenotypeNodeAggregationWhereInput> | null | undefined;
  NOT?: DiseaseHasPhenotypeNodeAggregationWhereInput | null | undefined;
  OR?: Array<DiseaseHasPhenotypeNodeAggregationWhereInput> | null | undefined;
  countDiseases?: IntScalarAggregationFilters | null | undefined;
  hpoId?: StringScalarAggregationFilters | null | undefined;
  hpoTerm?: StringScalarAggregationFilters | null | undefined;
};

export type DiseaseHasResearchedProjectConnectionAggregateInput = {
  AND?: Array<DiseaseHasResearchedProjectConnectionAggregateInput> | null | undefined;
  NOT?: DiseaseHasResearchedProjectConnectionAggregateInput | null | undefined;
  OR?: Array<DiseaseHasResearchedProjectConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: DiseaseHasResearchedProjectNodeAggregationWhereInput | null | undefined;
};

export type DiseaseHasResearchedProjectConnectionFilters = {
  /** Filter Diseases by aggregating results on related DiseaseHasResearchedProjectConnections */
  aggregate?: DiseaseHasResearchedProjectConnectionAggregateInput | null | undefined;
  /** Return Diseases where all of the related DiseaseHasResearchedProjectConnections match this filter */
  all?: DiseaseHasResearchedProjectConnectionWhere | null | undefined;
  /** Return Diseases where none of the related DiseaseHasResearchedProjectConnections match this filter */
  none?: DiseaseHasResearchedProjectConnectionWhere | null | undefined;
  /** Return Diseases where one of the related DiseaseHasResearchedProjectConnections match this filter */
  single?: DiseaseHasResearchedProjectConnectionWhere | null | undefined;
  /** Return Diseases where some of the related DiseaseHasResearchedProjectConnections match this filter */
  some?: DiseaseHasResearchedProjectConnectionWhere | null | undefined;
};

export type DiseaseHasResearchedProjectConnectionWhere = {
  AND?: Array<DiseaseHasResearchedProjectConnectionWhere> | null | undefined;
  NOT?: DiseaseHasResearchedProjectConnectionWhere | null | undefined;
  OR?: Array<DiseaseHasResearchedProjectConnectionWhere> | null | undefined;
  node?: ProjectWhere | null | undefined;
};

export type DiseaseHasResearchedProjectNodeAggregationWhereInput = {
  AND?: Array<DiseaseHasResearchedProjectNodeAggregationWhereInput> | null | undefined;
  NOT?: DiseaseHasResearchedProjectNodeAggregationWhereInput | null | undefined;
  OR?: Array<DiseaseHasResearchedProjectNodeAggregationWhereInput> | null | undefined;
  abstract?: StringScalarAggregationFilters | null | undefined;
  activity?: StringScalarAggregationFilters | null | undefined;
  applicationId?: IntScalarAggregationFilters | null | undefined;
  applicationType?: StringScalarAggregationFilters | null | undefined;
  cfdaCode?: StringScalarAggregationFilters | null | undefined;
  coreProjectNumber?: StringScalarAggregationFilters | null | undefined;
  dateCreatedRDAS?: StringScalarAggregationFilters | null | undefined;
  foaNumber?: StringScalarAggregationFilters | null | undefined;
  fullProjectNumber?: StringScalarAggregationFilters | null | undefined;
  fundingMechanism?: StringScalarAggregationFilters | null | undefined;
  fundingYear?: IntScalarAggregationFilters | null | undefined;
  phr?: StringScalarAggregationFilters | null | undefined;
  serialNumber?: StringScalarAggregationFilters | null | undefined;
  studySection?: StringScalarAggregationFilters | null | undefined;
  studySectionName?: StringScalarAggregationFilters | null | undefined;
  supportYear?: StringScalarAggregationFilters | null | undefined;
  terms?: StringScalarAggregationFilters | null | undefined;
  title?: StringScalarAggregationFilters | null | undefined;
  totalCost?: StringScalarAggregationFilters | null | undefined;
};

export type DiseaseRelationshipFilters = {
  /** Filter type where all of the related Diseases match this filter */
  all?: DiseaseWhere | null | undefined;
  /** Filter type where none of the related Diseases match this filter */
  none?: DiseaseWhere | null | undefined;
  /** Filter type where one of the related Diseases match this filter */
  single?: DiseaseWhere | null | undefined;
  /** Filter type where some of the related Diseases match this filter */
  some?: DiseaseWhere | null | undefined;
};

/** Fields to sort Diseases by. The order in which sorts are applied is not guaranteed when specifying many fields in one DiseaseSort object. */
export type DiseaseSort = {
  countArticles?: SortDirection | null | undefined;
  countCoreProjects?: SortDirection | null | undefined;
  countEpiArticles?: SortDirection | null | undefined;
  countGenes?: SortDirection | null | undefined;
  countNhsArticles?: SortDirection | null | undefined;
  countPhenotypes?: SortDirection | null | undefined;
  countProjects?: SortDirection | null | undefined;
  countTrials?: SortDirection | null | undefined;
  diseaseType?: SortDirection | null | undefined;
  gardId?: SortDirection | null | undefined;
  gardName?: SortDirection | null | undefined;
  medGen?: SortDirection | null | undefined;
  mondo?: SortDirection | null | undefined;
  omim?: SortDirection | null | undefined;
  omimps?: SortDirection | null | undefined;
  orphanet?: SortDirection | null | undefined;
  umls?: SortDirection | null | undefined;
};

export type DiseaseSubClassOfDiseaseConnectionAggregateInput = {
  AND?: Array<DiseaseSubClassOfDiseaseConnectionAggregateInput> | null | undefined;
  NOT?: DiseaseSubClassOfDiseaseConnectionAggregateInput | null | undefined;
  OR?: Array<DiseaseSubClassOfDiseaseConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: DiseaseSubClassOfDiseaseNodeAggregationWhereInput | null | undefined;
};

export type DiseaseSubClassOfDiseaseConnectionFilters = {
  /** Filter Diseases by aggregating results on related DiseaseSubClassOfDiseaseConnections */
  aggregate?: DiseaseSubClassOfDiseaseConnectionAggregateInput | null | undefined;
  /** Return Diseases where all of the related DiseaseSubClassOfDiseaseConnections match this filter */
  all?: DiseaseSubClassOfDiseaseConnectionWhere | null | undefined;
  /** Return Diseases where none of the related DiseaseSubClassOfDiseaseConnections match this filter */
  none?: DiseaseSubClassOfDiseaseConnectionWhere | null | undefined;
  /** Return Diseases where one of the related DiseaseSubClassOfDiseaseConnections match this filter */
  single?: DiseaseSubClassOfDiseaseConnectionWhere | null | undefined;
  /** Return Diseases where some of the related DiseaseSubClassOfDiseaseConnections match this filter */
  some?: DiseaseSubClassOfDiseaseConnectionWhere | null | undefined;
};

export type DiseaseSubClassOfDiseaseConnectionWhere = {
  AND?: Array<DiseaseSubClassOfDiseaseConnectionWhere> | null | undefined;
  NOT?: DiseaseSubClassOfDiseaseConnectionWhere | null | undefined;
  OR?: Array<DiseaseSubClassOfDiseaseConnectionWhere> | null | undefined;
  node?: DiseaseWhere | null | undefined;
};

export type DiseaseSubClassOfDiseaseNodeAggregationWhereInput = {
  AND?: Array<DiseaseSubClassOfDiseaseNodeAggregationWhereInput> | null | undefined;
  NOT?: DiseaseSubClassOfDiseaseNodeAggregationWhereInput | null | undefined;
  OR?: Array<DiseaseSubClassOfDiseaseNodeAggregationWhereInput> | null | undefined;
  countArticles?: IntScalarAggregationFilters | null | undefined;
  countCoreProjects?: IntScalarAggregationFilters | null | undefined;
  countEpiArticles?: IntScalarAggregationFilters | null | undefined;
  countGenes?: IntScalarAggregationFilters | null | undefined;
  countNhsArticles?: IntScalarAggregationFilters | null | undefined;
  countPhenotypes?: IntScalarAggregationFilters | null | undefined;
  countProjects?: IntScalarAggregationFilters | null | undefined;
  countTrials?: IntScalarAggregationFilters | null | undefined;
  diseaseType?: StringScalarAggregationFilters | null | undefined;
  gardId?: StringScalarAggregationFilters | null | undefined;
  gardName?: StringScalarAggregationFilters | null | undefined;
  medGen?: StringScalarAggregationFilters | null | undefined;
  mondo?: StringScalarAggregationFilters | null | undefined;
  omim?: StringScalarAggregationFilters | null | undefined;
  omimps?: StringScalarAggregationFilters | null | undefined;
  orphanet?: StringScalarAggregationFilters | null | undefined;
  umls?: StringScalarAggregationFilters | null | undefined;
};

export type DiseaseWhere = {
  AND?: Array<DiseaseWhere> | null | undefined;
  NOT?: DiseaseWhere | null | undefined;
  OR?: Array<DiseaseWhere> | null | undefined;
  classificationLevel?: StringListFilters | null | undefined;
  countArticles?: IntScalarFilters | null | undefined;
  countCoreProjects?: IntScalarFilters | null | undefined;
  countEpiArticles?: IntScalarFilters | null | undefined;
  countGenes?: IntScalarFilters | null | undefined;
  countNhsArticles?: IntScalarFilters | null | undefined;
  countPhenotypes?: IntScalarFilters | null | undefined;
  countProjects?: IntScalarFilters | null | undefined;
  countTrials?: IntScalarFilters | null | undefined;
  diseaseSubClassOf?: DiseaseRelationshipFilters | null | undefined;
  diseaseSubClassOfConnection?: DiseaseDiseaseSubClassOfConnectionFilters | null | undefined;
  diseaseType?: StringScalarFilters | null | undefined;
  disorderType?: StringListFilters | null | undefined;
  doid?: StringListFilters | null | undefined;
  gardId?: StringScalarFilters | null | undefined;
  gardName?: StringScalarFilters | null | undefined;
  hasAssociatedGene?: GeneRelationshipFilters | null | undefined;
  hasAssociatedGeneConnection?: DiseaseHasAssociatedGeneConnectionFilters | null | undefined;
  hasClinicalTrial?: ClinicalTrialRelationshipFilters | null | undefined;
  hasClinicalTrialConnection?: DiseaseHasClinicalTrialConnectionFilters | null | undefined;
  hasCoreProject?: CoreProjectRelationshipFilters | null | undefined;
  hasCoreProjectConnection?: DiseaseHasCoreProjectConnectionFilters | null | undefined;
  hasMappedCondition?: ConditionRelationshipFilters | null | undefined;
  hasMappedConditionConnection?: DiseaseHasMappedConditionConnectionFilters | null | undefined;
  hasMentionIn?: ArticleRelationshipFilters | null | undefined;
  hasMentionInConnection?: DiseaseHasMentionInConnectionFilters | null | undefined;
  hasPhenotype?: PhenotypeRelationshipFilters | null | undefined;
  hasPhenotypeConnection?: DiseaseHasPhenotypeConnectionFilters | null | undefined;
  hasResearchedProject?: ProjectRelationshipFilters | null | undefined;
  hasResearchedProjectConnection?: DiseaseHasResearchedProjectConnectionFilters | null | undefined;
  icd10cm?: StringListFilters | null | undefined;
  medGen?: StringScalarFilters | null | undefined;
  mesh?: StringListFilters | null | undefined;
  mondo?: StringScalarFilters | null | undefined;
  ncit?: StringListFilters | null | undefined;
  omim?: StringScalarFilters | null | undefined;
  omimps?: StringScalarFilters | null | undefined;
  orphanet?: StringScalarFilters | null | undefined;
  sctid?: StringListFilters | null | undefined;
  subClassOfDisease?: DiseaseRelationshipFilters | null | undefined;
  subClassOfDiseaseConnection?: DiseaseSubClassOfDiseaseConnectionFilters | null | undefined;
  synonyms?: StringListFilters | null | undefined;
  umls?: StringScalarFilters | null | undefined;
};

export type DrugRelationshipFilters = {
  /** Filter type where all of the related Drugs match this filter */
  all?: DrugWhere | null | undefined;
  /** Filter type where none of the related Drugs match this filter */
  none?: DrugWhere | null | undefined;
  /** Filter type where one of the related Drugs match this filter */
  single?: DrugWhere | null | undefined;
  /** Filter type where some of the related Drugs match this filter */
  some?: DrugWhere | null | undefined;
};

export type DrugWhere = {
  AND?: Array<DrugWhere> | null | undefined;
  NOT?: DrugWhere | null | undefined;
  OR?: Array<DrugWhere> | null | undefined;
  RxCUI?: StringScalarFilters | null | undefined;
  atc?: StringScalarFilters | null | undefined;
  availableStrength?: StringScalarFilters | null | undefined;
  drugBank?: StringScalarFilters | null | undefined;
  mmslCode?: StringScalarFilters | null | undefined;
  prescribable?: StringScalarFilters | null | undefined;
  quantity?: StringScalarFilters | null | undefined;
  rxNormSynonym?: StringScalarFilters | null | undefined;
  rxnavHumanDrug?: StringScalarFilters | null | undefined;
  rxnormID?: StringScalarFilters | null | undefined;
  rxnormName?: StringScalarFilters | null | undefined;
  rxnormVetDrug?: StringScalarFilters | null | undefined;
  snomedCt?: StringScalarFilters | null | undefined;
  splSetId?: StringScalarFilters | null | undefined;
  strength?: StringScalarFilters | null | undefined;
  tty?: StringScalarFilters | null | undefined;
  unii?: StringScalarFilters | null | undefined;
  usp?: StringScalarFilters | null | undefined;
  vuid?: StringScalarFilters | null | undefined;
};

export type EpidemiologyAnnotationRelationshipFilters = {
  /** Filter type where all of the related EpidemiologyAnnotations match this filter */
  all?: EpidemiologyAnnotationWhere | null | undefined;
  /** Filter type where none of the related EpidemiologyAnnotations match this filter */
  none?: EpidemiologyAnnotationWhere | null | undefined;
  /** Filter type where one of the related EpidemiologyAnnotations match this filter */
  single?: EpidemiologyAnnotationWhere | null | undefined;
  /** Filter type where some of the related EpidemiologyAnnotations match this filter */
  some?: EpidemiologyAnnotationWhere | null | undefined;
};

export type EpidemiologyAnnotationWhere = {
  AND?: Array<EpidemiologyAnnotationWhere> | null | undefined;
  NOT?: EpidemiologyAnnotationWhere | null | undefined;
  OR?: Array<EpidemiologyAnnotationWhere> | null | undefined;
  _composite_key?: StringScalarFilters | null | undefined;
  dateCreatedByRDAS?: StringScalarFilters | null | undefined;
  epidemiologyRate?: StringListFilters | null | undefined;
  epidemiologyType?: StringListFilters | null | undefined;
  ethnicity?: StringListFilters | null | undefined;
  lastUpdatedByRDAS?: StringScalarFilters | null | undefined;
  sex?: StringListFilters | null | undefined;
  studyDate?: StringListFilters | null | undefined;
  studyLocation?: StringListFilters | null | undefined;
};

/** Float filters */
export type FloatScalarFilters = {
  eq?: number | null | undefined;
  gt?: number | null | undefined;
  gte?: number | null | undefined;
  in?: Array<number> | null | undefined;
  lt?: number | null | undefined;
  lte?: number | null | undefined;
};

export type GeneDiseaseHasAssociatedGeneConnectionAggregateInput = {
  AND?: Array<GeneDiseaseHasAssociatedGeneConnectionAggregateInput> | null | undefined;
  NOT?: GeneDiseaseHasAssociatedGeneConnectionAggregateInput | null | undefined;
  OR?: Array<GeneDiseaseHasAssociatedGeneConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  edge?: AssociatedWithGenePropertiesAggregationWhereInput | null | undefined;
  node?: GeneDiseaseHasAssociatedGeneNodeAggregationWhereInput | null | undefined;
};

export type GeneDiseaseHasAssociatedGeneConnectionFilters = {
  /** Filter Genes by aggregating results on related GeneDiseaseHasAssociatedGeneConnections */
  aggregate?: GeneDiseaseHasAssociatedGeneConnectionAggregateInput | null | undefined;
  /** Return Genes where all of the related GeneDiseaseHasAssociatedGeneConnections match this filter */
  all?: GeneDiseaseHasAssociatedGeneConnectionWhere | null | undefined;
  /** Return Genes where none of the related GeneDiseaseHasAssociatedGeneConnections match this filter */
  none?: GeneDiseaseHasAssociatedGeneConnectionWhere | null | undefined;
  /** Return Genes where one of the related GeneDiseaseHasAssociatedGeneConnections match this filter */
  single?: GeneDiseaseHasAssociatedGeneConnectionWhere | null | undefined;
  /** Return Genes where some of the related GeneDiseaseHasAssociatedGeneConnections match this filter */
  some?: GeneDiseaseHasAssociatedGeneConnectionWhere | null | undefined;
};

export type GeneDiseaseHasAssociatedGeneConnectionWhere = {
  AND?: Array<GeneDiseaseHasAssociatedGeneConnectionWhere> | null | undefined;
  NOT?: GeneDiseaseHasAssociatedGeneConnectionWhere | null | undefined;
  OR?: Array<GeneDiseaseHasAssociatedGeneConnectionWhere> | null | undefined;
  edge?: AssociatedWithGenePropertiesWhere | null | undefined;
  node?: DiseaseWhere | null | undefined;
};

export type GeneDiseaseHasAssociatedGeneNodeAggregationWhereInput = {
  AND?: Array<GeneDiseaseHasAssociatedGeneNodeAggregationWhereInput> | null | undefined;
  NOT?: GeneDiseaseHasAssociatedGeneNodeAggregationWhereInput | null | undefined;
  OR?: Array<GeneDiseaseHasAssociatedGeneNodeAggregationWhereInput> | null | undefined;
  countArticles?: IntScalarAggregationFilters | null | undefined;
  countCoreProjects?: IntScalarAggregationFilters | null | undefined;
  countEpiArticles?: IntScalarAggregationFilters | null | undefined;
  countGenes?: IntScalarAggregationFilters | null | undefined;
  countNhsArticles?: IntScalarAggregationFilters | null | undefined;
  countPhenotypes?: IntScalarAggregationFilters | null | undefined;
  countProjects?: IntScalarAggregationFilters | null | undefined;
  countTrials?: IntScalarAggregationFilters | null | undefined;
  diseaseType?: StringScalarAggregationFilters | null | undefined;
  gardId?: StringScalarAggregationFilters | null | undefined;
  gardName?: StringScalarAggregationFilters | null | undefined;
  medGen?: StringScalarAggregationFilters | null | undefined;
  mondo?: StringScalarAggregationFilters | null | undefined;
  omim?: StringScalarAggregationFilters | null | undefined;
  omimps?: StringScalarAggregationFilters | null | undefined;
  orphanet?: StringScalarAggregationFilters | null | undefined;
  umls?: StringScalarAggregationFilters | null | undefined;
};

export type GeneRelationshipFilters = {
  /** Filter type where all of the related Genes match this filter */
  all?: GeneWhere | null | undefined;
  /** Filter type where none of the related Genes match this filter */
  none?: GeneWhere | null | undefined;
  /** Filter type where one of the related Genes match this filter */
  single?: GeneWhere | null | undefined;
  /** Filter type where some of the related Genes match this filter */
  some?: GeneWhere | null | undefined;
};

/** Fields to sort Genes by. The order in which sorts are applied is not guaranteed when specifying many fields in one GeneSort object. */
export type GeneSort = {
  countDiseases?: SortDirection | null | undefined;
  geneIdentifier?: SortDirection | null | undefined;
  geneSymbol?: SortDirection | null | undefined;
  geneTitle?: SortDirection | null | undefined;
  geneUrl?: SortDirection | null | undefined;
  locus?: SortDirection | null | undefined;
  locusGroup?: SortDirection | null | undefined;
  medGen?: SortDirection | null | undefined;
  mondo?: SortDirection | null | undefined;
  omim?: SortDirection | null | undefined;
  orphanet?: SortDirection | null | undefined;
  umls?: SortDirection | null | undefined;
};

export type GeneWhere = {
  AND?: Array<GeneWhere> | null | undefined;
  NOT?: GeneWhere | null | undefined;
  OR?: Array<GeneWhere> | null | undefined;
  countDiseases?: IntScalarFilters | null | undefined;
  diseaseHasAssociatedGene?: DiseaseRelationshipFilters | null | undefined;
  diseaseHasAssociatedGeneConnection?: GeneDiseaseHasAssociatedGeneConnectionFilters | null | undefined;
  geneIdentifier?: StringScalarFilters | null | undefined;
  geneSymbol?: StringScalarFilters | null | undefined;
  geneSynonyms?: StringListFilters | null | undefined;
  geneTitle?: StringScalarFilters | null | undefined;
  geneUrl?: StringScalarFilters | null | undefined;
  locus?: StringScalarFilters | null | undefined;
  locusGroup?: StringScalarFilters | null | undefined;
  medGen?: StringScalarFilters | null | undefined;
  mondo?: StringScalarFilters | null | undefined;
  omim?: StringScalarFilters | null | undefined;
  orphanet?: StringScalarFilters | null | undefined;
  reference?: StringListFilters | null | undefined;
  umls?: StringScalarFilters | null | undefined;
};

export type HasPhenotypePropertiesAggregationWhereInput = {
  AND?: Array<HasPhenotypePropertiesAggregationWhereInput> | null | undefined;
  NOT?: HasPhenotypePropertiesAggregationWhereInput | null | undefined;
  OR?: Array<HasPhenotypePropertiesAggregationWhereInput> | null | undefined;
  evidence?: StringScalarAggregationFilters | null | undefined;
  hpoTermFrequency?: StringScalarAggregationFilters | null | undefined;
};

export type HasPhenotypePropertiesWhere = {
  AND?: Array<HasPhenotypePropertiesWhere> | null | undefined;
  NOT?: HasPhenotypePropertiesWhere | null | undefined;
  OR?: Array<HasPhenotypePropertiesWhere> | null | undefined;
  evidence?: StringScalarFilters | null | undefined;
  hpoTermFrequency?: StringScalarFilters | null | undefined;
  reference?: StringListFilters | null | undefined;
};

export type IndividualPatientDataRelationshipFilters = {
  /** Filter type where all of the related IndividualPatientData match this filter */
  all?: IndividualPatientDataWhere | null | undefined;
  /** Filter type where none of the related IndividualPatientData match this filter */
  none?: IndividualPatientDataWhere | null | undefined;
  /** Filter type where one of the related IndividualPatientData match this filter */
  single?: IndividualPatientDataWhere | null | undefined;
  /** Filter type where some of the related IndividualPatientData match this filter */
  some?: IndividualPatientDataWhere | null | undefined;
};

export type IndividualPatientDataWhere = {
  AND?: Array<IndividualPatientDataWhere> | null | undefined;
  NOT?: IndividualPatientDataWhere | null | undefined;
  OR?: Array<IndividualPatientDataWhere> | null | undefined;
  ipdSharing?: StringScalarFilters | null | undefined;
  ipdSharingAccessCriteria?: StringScalarFilters | null | undefined;
  ipdSharingDescription?: StringScalarFilters | null | undefined;
  ipdSharingInfoType?: StringScalarFilters | null | undefined;
  ipdSharingTimeFrame?: StringScalarFilters | null | undefined;
};

/** Filters for an aggregation of an int field */
export type IntScalarAggregationFilters = {
  average?: FloatScalarFilters | null | undefined;
  max?: IntScalarFilters | null | undefined;
  min?: IntScalarFilters | null | undefined;
  sum?: IntScalarFilters | null | undefined;
};

/** Int filters */
export type IntScalarFilters = {
  eq?: number | null | undefined;
  gt?: number | null | undefined;
  gte?: number | null | undefined;
  in?: Array<number> | null | undefined;
  lt?: number | null | undefined;
  lte?: number | null | undefined;
};

export type InterventionHasDrugConnectionAggregateInput = {
  AND?: Array<InterventionHasDrugConnectionAggregateInput> | null | undefined;
  NOT?: InterventionHasDrugConnectionAggregateInput | null | undefined;
  OR?: Array<InterventionHasDrugConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: InterventionHasDrugNodeAggregationWhereInput | null | undefined;
};

export type InterventionHasDrugConnectionFilters = {
  /** Filter Interventions by aggregating results on related InterventionHasDrugConnections */
  aggregate?: InterventionHasDrugConnectionAggregateInput | null | undefined;
  /** Return Interventions where all of the related InterventionHasDrugConnections match this filter */
  all?: InterventionHasDrugConnectionWhere | null | undefined;
  /** Return Interventions where none of the related InterventionHasDrugConnections match this filter */
  none?: InterventionHasDrugConnectionWhere | null | undefined;
  /** Return Interventions where one of the related InterventionHasDrugConnections match this filter */
  single?: InterventionHasDrugConnectionWhere | null | undefined;
  /** Return Interventions where some of the related InterventionHasDrugConnections match this filter */
  some?: InterventionHasDrugConnectionWhere | null | undefined;
};

export type InterventionHasDrugConnectionWhere = {
  AND?: Array<InterventionHasDrugConnectionWhere> | null | undefined;
  NOT?: InterventionHasDrugConnectionWhere | null | undefined;
  OR?: Array<InterventionHasDrugConnectionWhere> | null | undefined;
  node?: DrugWhere | null | undefined;
};

export type InterventionHasDrugNodeAggregationWhereInput = {
  AND?: Array<InterventionHasDrugNodeAggregationWhereInput> | null | undefined;
  NOT?: InterventionHasDrugNodeAggregationWhereInput | null | undefined;
  OR?: Array<InterventionHasDrugNodeAggregationWhereInput> | null | undefined;
  RxCUI?: StringScalarAggregationFilters | null | undefined;
  atc?: StringScalarAggregationFilters | null | undefined;
  availableStrength?: StringScalarAggregationFilters | null | undefined;
  drugBank?: StringScalarAggregationFilters | null | undefined;
  mmslCode?: StringScalarAggregationFilters | null | undefined;
  prescribable?: StringScalarAggregationFilters | null | undefined;
  quantity?: StringScalarAggregationFilters | null | undefined;
  rxNormSynonym?: StringScalarAggregationFilters | null | undefined;
  rxnavHumanDrug?: StringScalarAggregationFilters | null | undefined;
  rxnormID?: StringScalarAggregationFilters | null | undefined;
  rxnormName?: StringScalarAggregationFilters | null | undefined;
  rxnormVetDrug?: StringScalarAggregationFilters | null | undefined;
  snomedCt?: StringScalarAggregationFilters | null | undefined;
  splSetId?: StringScalarAggregationFilters | null | undefined;
  strength?: StringScalarAggregationFilters | null | undefined;
  tty?: StringScalarAggregationFilters | null | undefined;
  unii?: StringScalarAggregationFilters | null | undefined;
  usp?: StringScalarAggregationFilters | null | undefined;
  vuid?: StringScalarAggregationFilters | null | undefined;
};

export type InterventionRelationshipFilters = {
  /** Filter type where all of the related Interventions match this filter */
  all?: InterventionWhere | null | undefined;
  /** Filter type where none of the related Interventions match this filter */
  none?: InterventionWhere | null | undefined;
  /** Filter type where one of the related Interventions match this filter */
  single?: InterventionWhere | null | undefined;
  /** Filter type where some of the related Interventions match this filter */
  some?: InterventionWhere | null | undefined;
};

export type InterventionWhere = {
  AND?: Array<InterventionWhere> | null | undefined;
  NOT?: InterventionWhere | null | undefined;
  OR?: Array<InterventionWhere> | null | undefined;
  _composite_key?: StringScalarFilters | null | undefined;
  _intervention_name_key?: StringScalarFilters | null | undefined;
  hasDrug?: DrugRelationshipFilters | null | undefined;
  hasDrugConnection?: InterventionHasDrugConnectionFilters | null | undefined;
  interventionDescription?: StringScalarFilters | null | undefined;
  interventionName?: StringScalarFilters | null | undefined;
  interventionType?: StringScalarFilters | null | undefined;
};

export type JournalRelationshipFilters = {
  /** Filter type where all of the related Journals match this filter */
  all?: JournalWhere | null | undefined;
  /** Filter type where none of the related Journals match this filter */
  none?: JournalWhere | null | undefined;
  /** Filter type where one of the related Journals match this filter */
  single?: JournalWhere | null | undefined;
  /** Filter type where some of the related Journals match this filter */
  some?: JournalWhere | null | undefined;
};

export type JournalWhere = {
  AND?: Array<JournalWhere> | null | undefined;
  NOT?: JournalWhere | null | undefined;
  OR?: Array<JournalWhere> | null | undefined;
  essn?: StringScalarFilters | null | undefined;
  issn?: StringScalarFilters | null | undefined;
  nlmid?: StringScalarFilters | null | undefined;
  title?: StringScalarFilters | null | undefined;
};

export type KeywordRelationshipFilters = {
  /** Filter type where all of the related Keywords match this filter */
  all?: KeywordWhere | null | undefined;
  /** Filter type where none of the related Keywords match this filter */
  none?: KeywordWhere | null | undefined;
  /** Filter type where one of the related Keywords match this filter */
  single?: KeywordWhere | null | undefined;
  /** Filter type where some of the related Keywords match this filter */
  some?: KeywordWhere | null | undefined;
};

export type KeywordWhere = {
  AND?: Array<KeywordWhere> | null | undefined;
  NOT?: KeywordWhere | null | undefined;
  OR?: Array<KeywordWhere> | null | undefined;
  keyword?: StringScalarFilters | null | undefined;
};

export type LocationRelationshipFilters = {
  /** Filter type where all of the related Locations match this filter */
  all?: LocationWhere | null | undefined;
  /** Filter type where none of the related Locations match this filter */
  none?: LocationWhere | null | undefined;
  /** Filter type where one of the related Locations match this filter */
  single?: LocationWhere | null | undefined;
  /** Filter type where some of the related Locations match this filter */
  some?: LocationWhere | null | undefined;
};

export type LocationWhere = {
  AND?: Array<LocationWhere> | null | undefined;
  NOT?: LocationWhere | null | undefined;
  OR?: Array<LocationWhere> | null | undefined;
  _idx_key?: StringScalarFilters | null | undefined;
  address?: StringScalarFilters | null | undefined;
  city?: StringScalarFilters | null | undefined;
  country?: StringScalarFilters | null | undefined;
  facility?: StringScalarFilters | null | undefined;
  state?: StringScalarFilters | null | undefined;
  zip?: StringScalarFilters | null | undefined;
};

export type MeshTermHasMeshTermConnectionAggregateInput = {
  AND?: Array<MeshTermHasMeshTermConnectionAggregateInput> | null | undefined;
  NOT?: MeshTermHasMeshTermConnectionAggregateInput | null | undefined;
  OR?: Array<MeshTermHasMeshTermConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: MeshTermHasMeshTermNodeAggregationWhereInput | null | undefined;
};

export type MeshTermHasMeshTermConnectionFilters = {
  /** Filter MeshTerms by aggregating results on related MeshTermHasMeshTermConnections */
  aggregate?: MeshTermHasMeshTermConnectionAggregateInput | null | undefined;
  /** Return MeshTerms where all of the related MeshTermHasMeshTermConnections match this filter */
  all?: MeshTermHasMeshTermConnectionWhere | null | undefined;
  /** Return MeshTerms where none of the related MeshTermHasMeshTermConnections match this filter */
  none?: MeshTermHasMeshTermConnectionWhere | null | undefined;
  /** Return MeshTerms where one of the related MeshTermHasMeshTermConnections match this filter */
  single?: MeshTermHasMeshTermConnectionWhere | null | undefined;
  /** Return MeshTerms where some of the related MeshTermHasMeshTermConnections match this filter */
  some?: MeshTermHasMeshTermConnectionWhere | null | undefined;
};

export type MeshTermHasMeshTermConnectionWhere = {
  AND?: Array<MeshTermHasMeshTermConnectionWhere> | null | undefined;
  NOT?: MeshTermHasMeshTermConnectionWhere | null | undefined;
  OR?: Array<MeshTermHasMeshTermConnectionWhere> | null | undefined;
  node?: ArticleWhere | null | undefined;
};

export type MeshTermHasMeshTermNodeAggregationWhereInput = {
  AND?: Array<MeshTermHasMeshTermNodeAggregationWhereInput> | null | undefined;
  NOT?: MeshTermHasMeshTermNodeAggregationWhereInput | null | undefined;
  OR?: Array<MeshTermHasMeshTermNodeAggregationWhereInput> | null | undefined;
  abstractText?: StringScalarAggregationFilters | null | undefined;
  citationCount?: IntScalarAggregationFilters | null | undefined;
  dateCreatedByRDAS?: StringScalarAggregationFilters | null | undefined;
  doi?: StringScalarAggregationFilters | null | undefined;
  firstPublicationDate?: StringScalarAggregationFilters | null | undefined;
  fullTextUrls?: StringScalarAggregationFilters | null | undefined;
  hasPDF?: StringScalarAggregationFilters | null | undefined;
  inEPMC?: StringScalarAggregationFilters | null | undefined;
  inPMC?: StringScalarAggregationFilters | null | undefined;
  isOpenAccess?: StringScalarAggregationFilters | null | undefined;
  issue?: StringScalarAggregationFilters | null | undefined;
  lastUpdatedDateByRDAS?: StringScalarAggregationFilters | null | undefined;
  pubType?: StringScalarAggregationFilters | null | undefined;
  publicationYear?: IntScalarAggregationFilters | null | undefined;
  pubmedId?: IntScalarAggregationFilters | null | undefined;
  title?: StringScalarAggregationFilters | null | undefined;
  volume?: StringScalarAggregationFilters | null | undefined;
};

export type MeshTermRelationshipFilters = {
  /** Filter type where all of the related MeshTerms match this filter */
  all?: MeshTermWhere | null | undefined;
  /** Filter type where none of the related MeshTerms match this filter */
  none?: MeshTermWhere | null | undefined;
  /** Filter type where one of the related MeshTerms match this filter */
  single?: MeshTermWhere | null | undefined;
  /** Filter type where some of the related MeshTerms match this filter */
  some?: MeshTermWhere | null | undefined;
};

export type MeshTermWhere = {
  AND?: Array<MeshTermWhere> | null | undefined;
  NOT?: MeshTermWhere | null | undefined;
  OR?: Array<MeshTermWhere> | null | undefined;
  hasMeshTerm?: ArticleRelationshipFilters | null | undefined;
  hasMeshTermConnection?: MeshTermHasMeshTermConnectionFilters | null | undefined;
  meshTerm?: StringScalarFilters | null | undefined;
};

export type OmimRefRelationshipFilters = {
  /** Filter type where all of the related OMIMRefs match this filter */
  all?: OmimRefWhere | null | undefined;
  /** Filter type where none of the related OMIMRefs match this filter */
  none?: OmimRefWhere | null | undefined;
  /** Filter type where one of the related OMIMRefs match this filter */
  single?: OmimRefWhere | null | undefined;
  /** Filter type where some of the related OMIMRefs match this filter */
  some?: OmimRefWhere | null | undefined;
};

export type OmimRefWhere = {
  AND?: Array<OmimRefWhere> | null | undefined;
  NOT?: OmimRefWhere | null | undefined;
  OR?: Array<OmimRefWhere> | null | undefined;
  _composite_key?: StringScalarFilters | null | undefined;
  dateCreatedByRDAS?: StringScalarFilters | null | undefined;
  lastUpdatedByRDAS?: StringScalarFilters | null | undefined;
  omimId?: StringScalarFilters | null | undefined;
  omimName?: StringScalarFilters | null | undefined;
  omimSections?: StringScalarFilters | null | undefined;
};

export type OrganizationHasLocationConnectionAggregateInput = {
  AND?: Array<OrganizationHasLocationConnectionAggregateInput> | null | undefined;
  NOT?: OrganizationHasLocationConnectionAggregateInput | null | undefined;
  OR?: Array<OrganizationHasLocationConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: OrganizationHasLocationNodeAggregationWhereInput | null | undefined;
};

export type OrganizationHasLocationConnectionFilters = {
  /** Filter Organizations by aggregating results on related OrganizationHasLocationConnections */
  aggregate?: OrganizationHasLocationConnectionAggregateInput | null | undefined;
  /** Return Organizations where all of the related OrganizationHasLocationConnections match this filter */
  all?: OrganizationHasLocationConnectionWhere | null | undefined;
  /** Return Organizations where none of the related OrganizationHasLocationConnections match this filter */
  none?: OrganizationHasLocationConnectionWhere | null | undefined;
  /** Return Organizations where one of the related OrganizationHasLocationConnections match this filter */
  single?: OrganizationHasLocationConnectionWhere | null | undefined;
  /** Return Organizations where some of the related OrganizationHasLocationConnections match this filter */
  some?: OrganizationHasLocationConnectionWhere | null | undefined;
};

export type OrganizationHasLocationConnectionWhere = {
  AND?: Array<OrganizationHasLocationConnectionWhere> | null | undefined;
  NOT?: OrganizationHasLocationConnectionWhere | null | undefined;
  OR?: Array<OrganizationHasLocationConnectionWhere> | null | undefined;
  node?: LocationWhere | null | undefined;
};

export type OrganizationHasLocationNodeAggregationWhereInput = {
  AND?: Array<OrganizationHasLocationNodeAggregationWhereInput> | null | undefined;
  NOT?: OrganizationHasLocationNodeAggregationWhereInput | null | undefined;
  OR?: Array<OrganizationHasLocationNodeAggregationWhereInput> | null | undefined;
  _idx_key?: StringScalarAggregationFilters | null | undefined;
  address?: StringScalarAggregationFilters | null | undefined;
  city?: StringScalarAggregationFilters | null | undefined;
  country?: StringScalarAggregationFilters | null | undefined;
  facility?: StringScalarAggregationFilters | null | undefined;
  state?: StringScalarAggregationFilters | null | undefined;
  zip?: StringScalarAggregationFilters | null | undefined;
};

export type OrganizationRelationshipFilters = {
  /** Filter type where all of the related Organizations match this filter */
  all?: OrganizationWhere | null | undefined;
  /** Filter type where none of the related Organizations match this filter */
  none?: OrganizationWhere | null | undefined;
  /** Filter type where one of the related Organizations match this filter */
  single?: OrganizationWhere | null | undefined;
  /** Filter type where some of the related Organizations match this filter */
  some?: OrganizationWhere | null | undefined;
};

export type OrganizationWhere = {
  AND?: Array<OrganizationWhere> | null | undefined;
  NOT?: OrganizationWhere | null | undefined;
  OR?: Array<OrganizationWhere> | null | undefined;
  _idx_key?: StringScalarFilters | null | undefined;
  hasLocation?: LocationRelationshipFilters | null | undefined;
  hasLocationConnection?: OrganizationHasLocationConnectionFilters | null | undefined;
  name?: StringScalarFilters | null | undefined;
};

export type ParticipantRelationshipFilters = {
  /** Filter type where all of the related Participants match this filter */
  all?: ParticipantWhere | null | undefined;
  /** Filter type where none of the related Participants match this filter */
  none?: ParticipantWhere | null | undefined;
  /** Filter type where one of the related Participants match this filter */
  single?: ParticipantWhere | null | undefined;
  /** Filter type where some of the related Participants match this filter */
  some?: ParticipantWhere | null | undefined;
};

export type ParticipantWhere = {
  AND?: Array<ParticipantWhere> | null | undefined;
  NOT?: ParticipantWhere | null | undefined;
  OR?: Array<ParticipantWhere> | null | undefined;
  eligibilityCriteria?: StringScalarFilters | null | undefined;
  enrollmentCount?: StringScalarFilters | null | undefined;
  enrollmentType?: StringScalarFilters | null | undefined;
  healthyVolunteers?: StringScalarFilters | null | undefined;
  maximumAge?: StringScalarFilters | null | undefined;
  minimumAge?: StringScalarFilters | null | undefined;
  stdAges?: StringListFilters | null | undefined;
};

export type PatentRelationshipFilters = {
  /** Filter type where all of the related Patents match this filter */
  all?: PatentWhere | null | undefined;
  /** Filter type where none of the related Patents match this filter */
  none?: PatentWhere | null | undefined;
  /** Filter type where one of the related Patents match this filter */
  single?: PatentWhere | null | undefined;
  /** Filter type where some of the related Patents match this filter */
  some?: PatentWhere | null | undefined;
};

export type PatentWhere = {
  AND?: Array<PatentWhere> | null | undefined;
  NOT?: PatentWhere | null | undefined;
  OR?: Array<PatentWhere> | null | undefined;
  id?: StringScalarFilters | null | undefined;
};

export type PhenotypeDiseaseHasPhenotypeConnectionAggregateInput = {
  AND?: Array<PhenotypeDiseaseHasPhenotypeConnectionAggregateInput> | null | undefined;
  NOT?: PhenotypeDiseaseHasPhenotypeConnectionAggregateInput | null | undefined;
  OR?: Array<PhenotypeDiseaseHasPhenotypeConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  edge?: HasPhenotypePropertiesAggregationWhereInput | null | undefined;
  node?: PhenotypeDiseaseHasPhenotypeNodeAggregationWhereInput | null | undefined;
};

export type PhenotypeDiseaseHasPhenotypeConnectionFilters = {
  /** Filter Phenotypes by aggregating results on related PhenotypeDiseaseHasPhenotypeConnections */
  aggregate?: PhenotypeDiseaseHasPhenotypeConnectionAggregateInput | null | undefined;
  /** Return Phenotypes where all of the related PhenotypeDiseaseHasPhenotypeConnections match this filter */
  all?: PhenotypeDiseaseHasPhenotypeConnectionWhere | null | undefined;
  /** Return Phenotypes where none of the related PhenotypeDiseaseHasPhenotypeConnections match this filter */
  none?: PhenotypeDiseaseHasPhenotypeConnectionWhere | null | undefined;
  /** Return Phenotypes where one of the related PhenotypeDiseaseHasPhenotypeConnections match this filter */
  single?: PhenotypeDiseaseHasPhenotypeConnectionWhere | null | undefined;
  /** Return Phenotypes where some of the related PhenotypeDiseaseHasPhenotypeConnections match this filter */
  some?: PhenotypeDiseaseHasPhenotypeConnectionWhere | null | undefined;
};

export type PhenotypeDiseaseHasPhenotypeConnectionWhere = {
  AND?: Array<PhenotypeDiseaseHasPhenotypeConnectionWhere> | null | undefined;
  NOT?: PhenotypeDiseaseHasPhenotypeConnectionWhere | null | undefined;
  OR?: Array<PhenotypeDiseaseHasPhenotypeConnectionWhere> | null | undefined;
  edge?: HasPhenotypePropertiesWhere | null | undefined;
  node?: DiseaseWhere | null | undefined;
};

export type PhenotypeDiseaseHasPhenotypeNodeAggregationWhereInput = {
  AND?: Array<PhenotypeDiseaseHasPhenotypeNodeAggregationWhereInput> | null | undefined;
  NOT?: PhenotypeDiseaseHasPhenotypeNodeAggregationWhereInput | null | undefined;
  OR?: Array<PhenotypeDiseaseHasPhenotypeNodeAggregationWhereInput> | null | undefined;
  countArticles?: IntScalarAggregationFilters | null | undefined;
  countCoreProjects?: IntScalarAggregationFilters | null | undefined;
  countEpiArticles?: IntScalarAggregationFilters | null | undefined;
  countGenes?: IntScalarAggregationFilters | null | undefined;
  countNhsArticles?: IntScalarAggregationFilters | null | undefined;
  countPhenotypes?: IntScalarAggregationFilters | null | undefined;
  countProjects?: IntScalarAggregationFilters | null | undefined;
  countTrials?: IntScalarAggregationFilters | null | undefined;
  diseaseType?: StringScalarAggregationFilters | null | undefined;
  gardId?: StringScalarAggregationFilters | null | undefined;
  gardName?: StringScalarAggregationFilters | null | undefined;
  medGen?: StringScalarAggregationFilters | null | undefined;
  mondo?: StringScalarAggregationFilters | null | undefined;
  omim?: StringScalarAggregationFilters | null | undefined;
  omimps?: StringScalarAggregationFilters | null | undefined;
  orphanet?: StringScalarAggregationFilters | null | undefined;
  umls?: StringScalarAggregationFilters | null | undefined;
};

export type PhenotypeRelationshipFilters = {
  /** Filter type where all of the related Phenotypes match this filter */
  all?: PhenotypeWhere | null | undefined;
  /** Filter type where none of the related Phenotypes match this filter */
  none?: PhenotypeWhere | null | undefined;
  /** Filter type where one of the related Phenotypes match this filter */
  single?: PhenotypeWhere | null | undefined;
  /** Filter type where some of the related Phenotypes match this filter */
  some?: PhenotypeWhere | null | undefined;
};

/** Fields to sort Phenotypes by. The order in which sorts are applied is not guaranteed when specifying many fields in one PhenotypeSort object. */
export type PhenotypeSort = {
  countDiseases?: SortDirection | null | undefined;
  hpoId?: SortDirection | null | undefined;
  hpoTerm?: SortDirection | null | undefined;
};

export type PhenotypeWhere = {
  AND?: Array<PhenotypeWhere> | null | undefined;
  NOT?: PhenotypeWhere | null | undefined;
  OR?: Array<PhenotypeWhere> | null | undefined;
  countDiseases?: IntScalarFilters | null | undefined;
  diseaseHasPhenotype?: DiseaseRelationshipFilters | null | undefined;
  diseaseHasPhenotypeConnection?: PhenotypeDiseaseHasPhenotypeConnectionFilters | null | undefined;
  hpoId?: StringScalarFilters | null | undefined;
  hpoTerm?: StringScalarFilters | null | undefined;
};

export type PrimaryOutcomeRelationshipFilters = {
  /** Filter type where all of the related PrimaryOutcomes match this filter */
  all?: PrimaryOutcomeWhere | null | undefined;
  /** Filter type where none of the related PrimaryOutcomes match this filter */
  none?: PrimaryOutcomeWhere | null | undefined;
  /** Filter type where one of the related PrimaryOutcomes match this filter */
  single?: PrimaryOutcomeWhere | null | undefined;
  /** Filter type where some of the related PrimaryOutcomes match this filter */
  some?: PrimaryOutcomeWhere | null | undefined;
};

export type PrimaryOutcomeWhere = {
  AND?: Array<PrimaryOutcomeWhere> | null | undefined;
  NOT?: PrimaryOutcomeWhere | null | undefined;
  OR?: Array<PrimaryOutcomeWhere> | null | undefined;
  primaryOutcomeDescription?: StringScalarFilters | null | undefined;
  primaryOutcomeMeasure?: StringScalarFilters | null | undefined;
  primaryOutcomeTimeFrame?: StringScalarFilters | null | undefined;
};

export type ProjectHasAnnotationConnectionAggregateInput = {
  AND?: Array<ProjectHasAnnotationConnectionAggregateInput> | null | undefined;
  NOT?: ProjectHasAnnotationConnectionAggregateInput | null | undefined;
  OR?: Array<ProjectHasAnnotationConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ProjectHasAnnotationNodeAggregationWhereInput | null | undefined;
};

export type ProjectHasAnnotationConnectionFilters = {
  /** Filter Projects by aggregating results on related ProjectHasAnnotationConnections */
  aggregate?: ProjectHasAnnotationConnectionAggregateInput | null | undefined;
  /** Return Projects where all of the related ProjectHasAnnotationConnections match this filter */
  all?: ProjectHasAnnotationConnectionWhere | null | undefined;
  /** Return Projects where none of the related ProjectHasAnnotationConnections match this filter */
  none?: ProjectHasAnnotationConnectionWhere | null | undefined;
  /** Return Projects where one of the related ProjectHasAnnotationConnections match this filter */
  single?: ProjectHasAnnotationConnectionWhere | null | undefined;
  /** Return Projects where some of the related ProjectHasAnnotationConnections match this filter */
  some?: ProjectHasAnnotationConnectionWhere | null | undefined;
};

export type ProjectHasAnnotationConnectionWhere = {
  AND?: Array<ProjectHasAnnotationConnectionWhere> | null | undefined;
  NOT?: ProjectHasAnnotationConnectionWhere | null | undefined;
  OR?: Array<ProjectHasAnnotationConnectionWhere> | null | undefined;
  node?: AnnotationWhere | null | undefined;
};

export type ProjectHasAnnotationNodeAggregationWhereInput = {
  AND?: Array<ProjectHasAnnotationNodeAggregationWhereInput> | null | undefined;
  NOT?: ProjectHasAnnotationNodeAggregationWhereInput | null | undefined;
  OR?: Array<ProjectHasAnnotationNodeAggregationWhereInput> | null | undefined;
  umlsConcept?: StringScalarAggregationFilters | null | undefined;
  umlsCui?: StringScalarAggregationFilters | null | undefined;
};

export type ProjectHasContactConnectionAggregateInput = {
  AND?: Array<ProjectHasContactConnectionAggregateInput> | null | undefined;
  NOT?: ProjectHasContactConnectionAggregateInput | null | undefined;
  OR?: Array<ProjectHasContactConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ProjectHasContactNodeAggregationWhereInput | null | undefined;
};

export type ProjectHasContactConnectionFilters = {
  /** Filter Projects by aggregating results on related ProjectHasContactConnections */
  aggregate?: ProjectHasContactConnectionAggregateInput | null | undefined;
  /** Return Projects where all of the related ProjectHasContactConnections match this filter */
  all?: ProjectHasContactConnectionWhere | null | undefined;
  /** Return Projects where none of the related ProjectHasContactConnections match this filter */
  none?: ProjectHasContactConnectionWhere | null | undefined;
  /** Return Projects where one of the related ProjectHasContactConnections match this filter */
  single?: ProjectHasContactConnectionWhere | null | undefined;
  /** Return Projects where some of the related ProjectHasContactConnections match this filter */
  some?: ProjectHasContactConnectionWhere | null | undefined;
};

export type ProjectHasContactConnectionWhere = {
  AND?: Array<ProjectHasContactConnectionWhere> | null | undefined;
  NOT?: ProjectHasContactConnectionWhere | null | undefined;
  OR?: Array<ProjectHasContactConnectionWhere> | null | undefined;
  node?: AgentWhere | null | undefined;
};

export type ProjectHasContactNodeAggregationWhereInput = {
  AND?: Array<ProjectHasContactNodeAggregationWhereInput> | null | undefined;
  NOT?: ProjectHasContactNodeAggregationWhereInput | null | undefined;
  OR?: Array<ProjectHasContactNodeAggregationWhereInput> | null | undefined;
  _idx_key?: StringScalarAggregationFilters | null | undefined;
  firstName?: StringScalarAggregationFilters | null | undefined;
  fullName?: StringScalarAggregationFilters | null | undefined;
  lastName?: StringScalarAggregationFilters | null | undefined;
  orc_id?: StringScalarAggregationFilters | null | undefined;
  pi_id?: StringScalarAggregationFilters | null | undefined;
};

export type ProjectHasCoreProjectConnectionAggregateInput = {
  AND?: Array<ProjectHasCoreProjectConnectionAggregateInput> | null | undefined;
  NOT?: ProjectHasCoreProjectConnectionAggregateInput | null | undefined;
  OR?: Array<ProjectHasCoreProjectConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ProjectHasCoreProjectNodeAggregationWhereInput | null | undefined;
};

export type ProjectHasCoreProjectConnectionFilters = {
  /** Filter Projects by aggregating results on related ProjectHasCoreProjectConnections */
  aggregate?: ProjectHasCoreProjectConnectionAggregateInput | null | undefined;
  /** Return Projects where all of the related ProjectHasCoreProjectConnections match this filter */
  all?: ProjectHasCoreProjectConnectionWhere | null | undefined;
  /** Return Projects where none of the related ProjectHasCoreProjectConnections match this filter */
  none?: ProjectHasCoreProjectConnectionWhere | null | undefined;
  /** Return Projects where one of the related ProjectHasCoreProjectConnections match this filter */
  single?: ProjectHasCoreProjectConnectionWhere | null | undefined;
  /** Return Projects where some of the related ProjectHasCoreProjectConnections match this filter */
  some?: ProjectHasCoreProjectConnectionWhere | null | undefined;
};

export type ProjectHasCoreProjectConnectionWhere = {
  AND?: Array<ProjectHasCoreProjectConnectionWhere> | null | undefined;
  NOT?: ProjectHasCoreProjectConnectionWhere | null | undefined;
  OR?: Array<ProjectHasCoreProjectConnectionWhere> | null | undefined;
  node?: CoreProjectWhere | null | undefined;
};

export type ProjectHasCoreProjectNodeAggregationWhereInput = {
  AND?: Array<ProjectHasCoreProjectNodeAggregationWhereInput> | null | undefined;
  NOT?: ProjectHasCoreProjectNodeAggregationWhereInput | null | undefined;
  OR?: Array<ProjectHasCoreProjectNodeAggregationWhereInput> | null | undefined;
  coreProjectNumber?: StringScalarAggregationFilters | null | undefined;
  totalCost?: IntScalarAggregationFilters | null | undefined;
};

export type ProjectHasInvestigatorConnectionAggregateInput = {
  AND?: Array<ProjectHasInvestigatorConnectionAggregateInput> | null | undefined;
  NOT?: ProjectHasInvestigatorConnectionAggregateInput | null | undefined;
  OR?: Array<ProjectHasInvestigatorConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ProjectHasInvestigatorNodeAggregationWhereInput | null | undefined;
};

export type ProjectHasInvestigatorConnectionFilters = {
  /** Filter Projects by aggregating results on related ProjectHasInvestigatorConnections */
  aggregate?: ProjectHasInvestigatorConnectionAggregateInput | null | undefined;
  /** Return Projects where all of the related ProjectHasInvestigatorConnections match this filter */
  all?: ProjectHasInvestigatorConnectionWhere | null | undefined;
  /** Return Projects where none of the related ProjectHasInvestigatorConnections match this filter */
  none?: ProjectHasInvestigatorConnectionWhere | null | undefined;
  /** Return Projects where one of the related ProjectHasInvestigatorConnections match this filter */
  single?: ProjectHasInvestigatorConnectionWhere | null | undefined;
  /** Return Projects where some of the related ProjectHasInvestigatorConnections match this filter */
  some?: ProjectHasInvestigatorConnectionWhere | null | undefined;
};

export type ProjectHasInvestigatorConnectionWhere = {
  AND?: Array<ProjectHasInvestigatorConnectionWhere> | null | undefined;
  NOT?: ProjectHasInvestigatorConnectionWhere | null | undefined;
  OR?: Array<ProjectHasInvestigatorConnectionWhere> | null | undefined;
  node?: AgentWhere | null | undefined;
};

export type ProjectHasInvestigatorNodeAggregationWhereInput = {
  AND?: Array<ProjectHasInvestigatorNodeAggregationWhereInput> | null | undefined;
  NOT?: ProjectHasInvestigatorNodeAggregationWhereInput | null | undefined;
  OR?: Array<ProjectHasInvestigatorNodeAggregationWhereInput> | null | undefined;
  _idx_key?: StringScalarAggregationFilters | null | undefined;
  firstName?: StringScalarAggregationFilters | null | undefined;
  fullName?: StringScalarAggregationFilters | null | undefined;
  lastName?: StringScalarAggregationFilters | null | undefined;
  orc_id?: StringScalarAggregationFilters | null | undefined;
  pi_id?: StringScalarAggregationFilters | null | undefined;
};

export type ProjectHasResearchedDiseaseConnectionAggregateInput = {
  AND?: Array<ProjectHasResearchedDiseaseConnectionAggregateInput> | null | undefined;
  NOT?: ProjectHasResearchedDiseaseConnectionAggregateInput | null | undefined;
  OR?: Array<ProjectHasResearchedDiseaseConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: ProjectHasResearchedDiseaseNodeAggregationWhereInput | null | undefined;
};

export type ProjectHasResearchedDiseaseConnectionFilters = {
  /** Filter Projects by aggregating results on related ProjectHasResearchedDiseaseConnections */
  aggregate?: ProjectHasResearchedDiseaseConnectionAggregateInput | null | undefined;
  /** Return Projects where all of the related ProjectHasResearchedDiseaseConnections match this filter */
  all?: ProjectHasResearchedDiseaseConnectionWhere | null | undefined;
  /** Return Projects where none of the related ProjectHasResearchedDiseaseConnections match this filter */
  none?: ProjectHasResearchedDiseaseConnectionWhere | null | undefined;
  /** Return Projects where one of the related ProjectHasResearchedDiseaseConnections match this filter */
  single?: ProjectHasResearchedDiseaseConnectionWhere | null | undefined;
  /** Return Projects where some of the related ProjectHasResearchedDiseaseConnections match this filter */
  some?: ProjectHasResearchedDiseaseConnectionWhere | null | undefined;
};

export type ProjectHasResearchedDiseaseConnectionWhere = {
  AND?: Array<ProjectHasResearchedDiseaseConnectionWhere> | null | undefined;
  NOT?: ProjectHasResearchedDiseaseConnectionWhere | null | undefined;
  OR?: Array<ProjectHasResearchedDiseaseConnectionWhere> | null | undefined;
  node?: DiseaseWhere | null | undefined;
};

export type ProjectHasResearchedDiseaseNodeAggregationWhereInput = {
  AND?: Array<ProjectHasResearchedDiseaseNodeAggregationWhereInput> | null | undefined;
  NOT?: ProjectHasResearchedDiseaseNodeAggregationWhereInput | null | undefined;
  OR?: Array<ProjectHasResearchedDiseaseNodeAggregationWhereInput> | null | undefined;
  countArticles?: IntScalarAggregationFilters | null | undefined;
  countCoreProjects?: IntScalarAggregationFilters | null | undefined;
  countEpiArticles?: IntScalarAggregationFilters | null | undefined;
  countGenes?: IntScalarAggregationFilters | null | undefined;
  countNhsArticles?: IntScalarAggregationFilters | null | undefined;
  countPhenotypes?: IntScalarAggregationFilters | null | undefined;
  countProjects?: IntScalarAggregationFilters | null | undefined;
  countTrials?: IntScalarAggregationFilters | null | undefined;
  diseaseType?: StringScalarAggregationFilters | null | undefined;
  gardId?: StringScalarAggregationFilters | null | undefined;
  gardName?: StringScalarAggregationFilters | null | undefined;
  medGen?: StringScalarAggregationFilters | null | undefined;
  mondo?: StringScalarAggregationFilters | null | undefined;
  omim?: StringScalarAggregationFilters | null | undefined;
  omimps?: StringScalarAggregationFilters | null | undefined;
  orphanet?: StringScalarAggregationFilters | null | undefined;
  umls?: StringScalarAggregationFilters | null | undefined;
};

export type ProjectRelationshipFilters = {
  /** Filter type where all of the related Projects match this filter */
  all?: ProjectWhere | null | undefined;
  /** Filter type where none of the related Projects match this filter */
  none?: ProjectWhere | null | undefined;
  /** Filter type where one of the related Projects match this filter */
  single?: ProjectWhere | null | undefined;
  /** Filter type where some of the related Projects match this filter */
  some?: ProjectWhere | null | undefined;
};

/** Fields to sort Projects by. The order in which sorts are applied is not guaranteed when specifying many fields in one ProjectSort object. */
export type ProjectSort = {
  abstract?: SortDirection | null | undefined;
  activity?: SortDirection | null | undefined;
  applicationId?: SortDirection | null | undefined;
  applicationType?: SortDirection | null | undefined;
  cfdaCode?: SortDirection | null | undefined;
  coreProjectNumber?: SortDirection | null | undefined;
  dateCreatedRDAS?: SortDirection | null | undefined;
  foaNumber?: SortDirection | null | undefined;
  fullProjectNumber?: SortDirection | null | undefined;
  fundingMechanism?: SortDirection | null | undefined;
  fundingYear?: SortDirection | null | undefined;
  phr?: SortDirection | null | undefined;
  serialNumber?: SortDirection | null | undefined;
  studySection?: SortDirection | null | undefined;
  studySectionName?: SortDirection | null | undefined;
  supportYear?: SortDirection | null | undefined;
  terms?: SortDirection | null | undefined;
  title?: SortDirection | null | undefined;
  totalCost?: SortDirection | null | undefined;
};

export type ProjectWhere = {
  AND?: Array<ProjectWhere> | null | undefined;
  NOT?: ProjectWhere | null | undefined;
  OR?: Array<ProjectWhere> | null | undefined;
  abstract?: StringScalarFilters | null | undefined;
  activity?: StringScalarFilters | null | undefined;
  applicationId?: IntScalarFilters | null | undefined;
  applicationType?: StringScalarFilters | null | undefined;
  cfdaCode?: StringScalarFilters | null | undefined;
  coreProjectNumber?: StringScalarFilters | null | undefined;
  dateCreatedRDAS?: StringScalarFilters | null | undefined;
  foaNumber?: StringScalarFilters | null | undefined;
  fullProjectNumber?: StringScalarFilters | null | undefined;
  fundingMechanism?: StringScalarFilters | null | undefined;
  fundingYear?: IntScalarFilters | null | undefined;
  hasAnnotation?: AnnotationRelationshipFilters | null | undefined;
  hasAnnotationConnection?: ProjectHasAnnotationConnectionFilters | null | undefined;
  hasContact?: AgentRelationshipFilters | null | undefined;
  hasContactConnection?: ProjectHasContactConnectionFilters | null | undefined;
  hasCoreProject?: CoreProjectRelationshipFilters | null | undefined;
  hasCoreProjectConnection?: ProjectHasCoreProjectConnectionFilters | null | undefined;
  hasInvestigator?: AgentRelationshipFilters | null | undefined;
  hasInvestigatorConnection?: ProjectHasInvestigatorConnectionFilters | null | undefined;
  hasResearchedDisease?: DiseaseRelationshipFilters | null | undefined;
  hasResearchedDiseaseConnection?: ProjectHasResearchedDiseaseConnectionFilters | null | undefined;
  phr?: StringScalarFilters | null | undefined;
  serialNumber?: StringScalarFilters | null | undefined;
  studySection?: StringScalarFilters | null | undefined;
  studySectionName?: StringScalarFilters | null | undefined;
  supportYear?: StringScalarFilters | null | undefined;
  terms?: StringScalarFilters | null | undefined;
  title?: StringScalarFilters | null | undefined;
  totalCost?: StringScalarFilters | null | undefined;
};

export type PubtatorAnnotationRelationshipFilters = {
  /** Filter type where all of the related PubtatorAnnotations match this filter */
  all?: PubtatorAnnotationWhere | null | undefined;
  /** Filter type where none of the related PubtatorAnnotations match this filter */
  none?: PubtatorAnnotationWhere | null | undefined;
  /** Filter type where one of the related PubtatorAnnotations match this filter */
  single?: PubtatorAnnotationWhere | null | undefined;
  /** Filter type where some of the related PubtatorAnnotations match this filter */
  some?: PubtatorAnnotationWhere | null | undefined;
};

export type PubtatorAnnotationWhere = {
  AND?: Array<PubtatorAnnotationWhere> | null | undefined;
  NOT?: PubtatorAnnotationWhere | null | undefined;
  OR?: Array<PubtatorAnnotationWhere> | null | undefined;
  _composite_key?: StringScalarFilters | null | undefined;
  annotation?: StringListFilters | null | undefined;
  annotationIdentifier?: StringScalarFilters | null | undefined;
  annotationType?: StringScalarFilters | null | undefined;
  dateCreatedByRDAS?: StringScalarFilters | null | undefined;
  lastUpdatedByRDAS?: StringScalarFilters | null | undefined;
};

/** An enum for sorting in either ascending or descending order. */
export type SortDirection =
  /** Sort by field values in ascending order. */
  | 'ASC'
  /** Sort by field values in descending order. */
  | 'DESC';

/** String list filters */
export type StringListFilters = {
  eq?: Array<string> | null | undefined;
  includes?: string | null | undefined;
};

/** Filters for an aggregation of a string field */
export type StringScalarAggregationFilters = {
  averageLength?: FloatScalarFilters | null | undefined;
  longestLength?: IntScalarFilters | null | undefined;
  shortestLength?: IntScalarFilters | null | undefined;
};

/** String filters */
export type StringScalarFilters = {
  contains?: string | null | undefined;
  endsWith?: string | null | undefined;
  eq?: string | null | undefined;
  in?: Array<string> | null | undefined;
  startsWith?: string | null | undefined;
};

export type StudyDesignRelationshipFilters = {
  /** Filter type where all of the related StudyDesigns match this filter */
  all?: StudyDesignWhere | null | undefined;
  /** Filter type where none of the related StudyDesigns match this filter */
  none?: StudyDesignWhere | null | undefined;
  /** Filter type where one of the related StudyDesigns match this filter */
  single?: StudyDesignWhere | null | undefined;
  /** Filter type where some of the related StudyDesigns match this filter */
  some?: StudyDesignWhere | null | undefined;
};

export type StudyDesignWhere = {
  AND?: Array<StudyDesignWhere> | null | undefined;
  NOT?: StudyDesignWhere | null | undefined;
  OR?: Array<StudyDesignWhere> | null | undefined;
  designAllocation?: StringScalarFilters | null | undefined;
  designInterventionModel?: StringScalarFilters | null | undefined;
  designInterventionModelDescription?: StringScalarFilters | null | undefined;
  designMasking?: StringScalarFilters | null | undefined;
  designObservationalModel?: StringScalarFilters | null | undefined;
  designPrimaryPurpose?: StringScalarFilters | null | undefined;
  designTimePerspective?: StringScalarFilters | null | undefined;
  detailedDescription?: StringScalarFilters | null | undefined;
  hasExpandedAccess?: StringScalarFilters | null | undefined;
  studyType?: StringScalarFilters | null | undefined;
};

export type SubstanceHasSubstanceConnectionAggregateInput = {
  AND?: Array<SubstanceHasSubstanceConnectionAggregateInput> | null | undefined;
  NOT?: SubstanceHasSubstanceConnectionAggregateInput | null | undefined;
  OR?: Array<SubstanceHasSubstanceConnectionAggregateInput> | null | undefined;
  count?: ConnectionAggregationCountFilterInput | null | undefined;
  node?: SubstanceHasSubstanceNodeAggregationWhereInput | null | undefined;
};

export type SubstanceHasSubstanceConnectionFilters = {
  /** Filter Substances by aggregating results on related SubstanceHasSubstanceConnections */
  aggregate?: SubstanceHasSubstanceConnectionAggregateInput | null | undefined;
  /** Return Substances where all of the related SubstanceHasSubstanceConnections match this filter */
  all?: SubstanceHasSubstanceConnectionWhere | null | undefined;
  /** Return Substances where none of the related SubstanceHasSubstanceConnections match this filter */
  none?: SubstanceHasSubstanceConnectionWhere | null | undefined;
  /** Return Substances where one of the related SubstanceHasSubstanceConnections match this filter */
  single?: SubstanceHasSubstanceConnectionWhere | null | undefined;
  /** Return Substances where some of the related SubstanceHasSubstanceConnections match this filter */
  some?: SubstanceHasSubstanceConnectionWhere | null | undefined;
};

export type SubstanceHasSubstanceConnectionWhere = {
  AND?: Array<SubstanceHasSubstanceConnectionWhere> | null | undefined;
  NOT?: SubstanceHasSubstanceConnectionWhere | null | undefined;
  OR?: Array<SubstanceHasSubstanceConnectionWhere> | null | undefined;
  node?: DiseaseWhere | null | undefined;
};

export type SubstanceHasSubstanceNodeAggregationWhereInput = {
  AND?: Array<SubstanceHasSubstanceNodeAggregationWhereInput> | null | undefined;
  NOT?: SubstanceHasSubstanceNodeAggregationWhereInput | null | undefined;
  OR?: Array<SubstanceHasSubstanceNodeAggregationWhereInput> | null | undefined;
  countArticles?: IntScalarAggregationFilters | null | undefined;
  countCoreProjects?: IntScalarAggregationFilters | null | undefined;
  countEpiArticles?: IntScalarAggregationFilters | null | undefined;
  countGenes?: IntScalarAggregationFilters | null | undefined;
  countNhsArticles?: IntScalarAggregationFilters | null | undefined;
  countPhenotypes?: IntScalarAggregationFilters | null | undefined;
  countProjects?: IntScalarAggregationFilters | null | undefined;
  countTrials?: IntScalarAggregationFilters | null | undefined;
  diseaseType?: StringScalarAggregationFilters | null | undefined;
  gardId?: StringScalarAggregationFilters | null | undefined;
  gardName?: StringScalarAggregationFilters | null | undefined;
  medGen?: StringScalarAggregationFilters | null | undefined;
  mondo?: StringScalarAggregationFilters | null | undefined;
  omim?: StringScalarAggregationFilters | null | undefined;
  omimps?: StringScalarAggregationFilters | null | undefined;
  orphanet?: StringScalarAggregationFilters | null | undefined;
  umls?: StringScalarAggregationFilters | null | undefined;
};

export type SubstanceRelationshipFilters = {
  /** Filter type where all of the related Substances match this filter */
  all?: SubstanceWhere | null | undefined;
  /** Filter type where none of the related Substances match this filter */
  none?: SubstanceWhere | null | undefined;
  /** Filter type where one of the related Substances match this filter */
  single?: SubstanceWhere | null | undefined;
  /** Filter type where some of the related Substances match this filter */
  some?: SubstanceWhere | null | undefined;
};

export type SubstanceWhere = {
  AND?: Array<SubstanceWhere> | null | undefined;
  NOT?: SubstanceWhere | null | undefined;
  OR?: Array<SubstanceWhere> | null | undefined;
  hasSubstance?: DiseaseRelationshipFilters | null | undefined;
  hasSubstanceConnection?: SubstanceHasSubstanceConnectionFilters | null | undefined;
  name?: StringScalarFilters | null | undefined;
  registryNumber?: StringScalarFilters | null | undefined;
};

export type ArticleQueryQueryVariables = Exact<{
  articleWhere?: ArticleWhere | null | undefined;
}>;


export type ArticleQueryQuery = { articles: Array<{ abstractText: string | null, citationCount: number | null, dateCreatedByRDAS: string | null, doi: string | null, firstPublicationDate: string | null, inEPMC: string | null, inPMC: string | null, isEpidemiologicalStudy: boolean | null, isNaturalHistoryStudy: boolean | null, isOpenAccess: string | null, issue: string | null, lastUpdatedDateByRDAS: string | null, publicationYear: number | null, pubmedId: number | null, pubType: string | null, title: string | null, volume: string | null, journals: Array<{ essn: string | null, issn: string | null, nlmid: string | null, title: string | null }>, diseases: Array<{ gardId: string, gardName: string }>, meshTerms: Array<{ meshTerm: string | null }>, substances: Array<{ name: string | null, registryNumber: string | null }>, authors: Array<{ fullName: string | null, firstName: string | null, contactEmail: Array<string> | null, lastName: string | null, orc_id: string | null, pi_id: string | null, hasAffiliation: Array<{ name: string | null }> }>, epidemiologies: Array<{ epidemiologyRate: Array<string> | null, studyDate: Array<string> | null, studyLocation: Array<string> | null, sex: Array<string> | null, lastUpdatedByRDAS: string | null, ethnicity: Array<string> | null, epidemiologyType: Array<string> | null }>, annotations: Array<{ annotationIdentifier: string | null, annotationType: string | null, annotation: Array<string> | null }> }> };

export type ArticleListQueryQueryVariables = Exact<{
  diseaseWhere?: DiseaseWhere | null | undefined;
  hasMentionInLimit?: number | null | undefined;
  hasMentionInOffset?: number | null | undefined;
  hasMentionInSort?: Array<ArticleSort> | ArticleSort | null | undefined;
  articleWhere?: ArticleWhere | null | undefined;
  hasMentionInConnectionWhere?: DiseaseHasMentionInConnectionWhere | null | undefined;
}>;


export type ArticleListQueryQuery = { diseases: Array<{ countEpiArticles: number | null, countNhsArticles: number | null, allCount: number, articles: Array<{ pubmedId: number | null, title: string | null, publicationYear: number | null, doi: string | null, firstPublicationDate: string | null, pubType: string | null, isNaturalHistoryStudy: boolean | null, isEpidemiologicalStudy: boolean | null, journals: Array<{ essn: string | null, issn: string | null, nlmid: string | null, title: string | null }> }>, filteredCount: { totalCount: { count: { nodes: number } } } }> };

export type ClinicalTrialQueryQueryVariables = Exact<{
  clinicalTrialWhere?: ClinicalTrialWhere | null | undefined;
}>;


export type ClinicalTrialQueryQuery = { clinicalTrials: Array<{ briefTitle: string | null, briefSummary: string | null, nctId: string | null, phase: string | null, studyType: string | null, overallStatus: string | null, officialTitle: string | null, startDate: string | null, completionDate: string | null, completionDateType: string | null, startDateType: string | null, lastUpdatePostDate: string | null, studyDesigns: Array<{ designAllocation: string | null, designInterventionModelDescription: string | null, designInterventionModel: string | null, designMasking: string | null, designObservationalModel: string | null, designPrimaryPurpose: string | null, designTimePerspective: string | null, detailedDescription: string | null, hasExpandedAccess: string | null, studyType: string | null }>, participantInfo: Array<{ eligibilityCriteria: string | null, enrollmentCount: string | null, enrollmentType: string | null, healthyVolunteers: string | null, maximumAge: string | null, minimumAge: string | null, stdAges: Array<string> | null }>, studyDiseases: Array<{ gardId: string, gardName: string }>, conditions: Array<{ condition: string | null, mappedDiseases: Array<{ gardId: string, gardName: string }> }>, locations: Array<{ address: string | null, city: string | null, country: string | null, facility: string | null, state: string | null, zip: string | null }>, interventions: Array<{ interventionType: string | null, interventionName: string | null, interventionDescription: string | null, hasDrug: Array<{ unii: string | null, rxnormName: string | null, rxnormID: string | null }> }> }> };

export type ClinicalTrialListQueryQueryVariables = Exact<{
  diseaseWhere?: DiseaseWhere | null | undefined;
  hasClinicalTrialLimit?: number | null | undefined;
  hasClinicalTrialOffset?: number | null | undefined;
  hasClinicalTrialSort?: Array<ClinicalTrialSort> | ClinicalTrialSort | null | undefined;
  clinicalTrialWhere?: ClinicalTrialWhere | null | undefined;
  hasClinicalTrialConnectionWhere?: DiseaseHasClinicalTrialConnectionWhere | null | undefined;
}>;


export type ClinicalTrialListQueryQuery = { diseases: Array<{ allCount: number, clinicalTrials: Array<{ briefTitle: string | null, nctId: string | null, phase: string | null, studyType: string | null, overallStatus: string | null, officialTitle: string | null, startDate: string | null, completionDate: string | null, completionDateType: string | null, startDateType: string | null }>, filteredCount: { totalCount: { count: { nodes: number } } } }> };

export type FieldCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type FieldCountsQuery = { fieldCounts: Array<{ fieldCounts: { allArticlesByYear: Array<{ count: number | null, term: string | null }> | null, allEpiArticlesByYear: Array<{ count: number | null, term: string | null }> | null, allNHSArticlesByYear: Array<{ term: string | null, count: number | null }> | null, allProjectsByYear: Array<{ count: number | null, term: string | null }> | null, allTrialsByPhase: Array<{ count: number | null, term: string | null }> | null, allTrialsByStatus: Array<{ count: number | null, term: string | null }> | null, allTrialsByType: Array<{ count: number | null, term: string | null }> | null } }> };

export type DiseaseQueryQueryVariables = Exact<{
  where?: DiseaseWhere | null | undefined;
}>;


export type DiseaseQueryQuery = { diseases: Array<{ classificationLevel: Array<string> | null, countArticles: number, countGenes: number, countPhenotypes: number, countProjects: number | null, countTrials: number, disorderType: Array<string> | null, gardId: string, gardName: string, icd10cm: Array<string> | null, mesh: Array<string> | null, omim: string | null, orphanet: string | null, synonyms: Array<string> | null, doid: Array<string> | null, ncit: Array<string> | null, sctid: Array<string> | null, mondo: string | null, medGen: string | null, omimps: string | null, diseaseType: string | null, _geneAssociations: { edges: Array<{ gene: { geneIdentifier: string | null, geneSymbol: string | null, geneSynonyms: Array<string> | null, geneUrl: string | null, omim: string | null, reference: Array<string> | null }, properties: { associationStatus: string | null, associationType: string | null, reference: Array<string> | null } }> }, _phenotypeAssociations: { edges: Array<{ phenotype: { hpoId: string | null, hpoTerm: string | null }, properties: { hpoTermFrequency: string | null, reference: Array<string> | null, _evidence: string | null } }> } }> };

export type DiseaseStaticFiltersQueryQueryVariables = Exact<{
  where?: DiseaseWhere | null | undefined;
}>;


export type DiseaseStaticFiltersQueryQuery = { diseases: Array<{ filterCounts: { diseaseArticleByYear: Array<{ count: number | null, term: string | null }> | null, diseaseArticleByEpi: Array<{ count: number | null, term: string | null }> | null, diseaseArticleByNHS: Array<{ count: number | null, term: string | null }> | null, diseaseProjectsByYear: Array<{ count: number | null, term: string | null }> | null, diseaseTrialsByPhase: Array<{ count: number | null, term: string | null }> | null, diseaseTrialsByStatus: Array<{ count: number | null, term: string | null }> | null, diseaseTrialsByType: Array<{ count: number | null, term: string | null }> | null } | null }> };

export type DiseaseDynamicFiltersQueryQueryVariables = Exact<{
  where?: DiseaseWhere | null | undefined;
  clinicalTrialWhere?: ClinicalTrialWhere | null | undefined;
  articleWhere?: ArticleWhere | null | undefined;
}>;


export type DiseaseDynamicFiltersQueryQuery = { trialCountsByStatus: Array<{ count: number | null, term: string | null } | null> | null, trialCountsByPhase: Array<{ count: number | null, term: string | null } | null> | null, trialCountsByType: Array<{ count: number | null, term: string | null } | null> | null, diseaseArticleByYear: Array<{ count: number | null, term: string | null } | null> | null };

export type DiseaseListQueryQueryVariables = Exact<{
  limit?: number | null | undefined;
  offset?: number | null | undefined;
  sort?: Array<DiseaseSort> | DiseaseSort | null | undefined;
  diseaseWhere?: DiseaseWhere | null | undefined;
}>;


export type DiseaseListQueryQuery = { diseases: Array<{ gardName: string, gardId: string, classificationLevel: Array<string> | null, disorderType: Array<string> | null, synonyms: Array<string> | null, countArticles: number, countTrials: number, countProjects: number | null, countCoreProjects: number | null, countGenes: number, countPhenotypes: number }>, total: { count: number } };

export type DiseasesTypeaheadQueryVariables = Exact<{
  searchString?: string | null | undefined;
  limit?: number | null | undefined;
}>;


export type DiseasesTypeaheadQuery = { diseaseSearch: Array<{ gardName: string, gardId: string, classificationLevel: Array<string> | null, disorderType: Array<string> | null, synonyms: Array<string> | null, countArticles: number, countTrials: number, countProjects: number | null, countCoreProjects: number | null, countGenes: number, countPhenotypes: number } | null> | null };

export type GeneFiltersQueryVariables = Exact<{
  offset?: number | null | undefined;
  limit?: number | null | undefined;
  sort?: Array<GeneSort> | GeneSort | null | undefined;
  allGenesWhere?: GeneWhere | null | undefined;
}>;


export type GeneFiltersQuery = { filters: Array<{ term: string | null, count: number }> };

export type PhenotypeFiltersQueryVariables = Exact<{
  offset?: number | null | undefined;
  limit?: number | null | undefined;
  sort?: Array<PhenotypeSort> | PhenotypeSort | null | undefined;
  allPhenotypesWhere?: PhenotypeWhere | null | undefined;
}>;


export type PhenotypeFiltersQuery = { allFilters: Array<{ term: string | null, count: number }> };

export type CoreProjectQueryQueryVariables = Exact<{
  coreProjectWhere?: CoreProjectWhere | null | undefined;
  hasSubprojectSort?: Array<ProjectSort> | ProjectSort | null | undefined;
}>;


export type CoreProjectQueryQuery = { coreProjects: Array<{ coreProjectNumber: string | null, totalCost: number | null, totalCount: { totalCount: number }, organizations: Array<{ name: string | null }>, subProjects: Array<{ abstract: string | null, title: string | null, activity: string | null, applicationId: number | null, cfdaCode: string | null, foaNumber: string | null, fullProjectNumber: string | null, fundingMechanism: string | null, fundingYear: number | null, _terms: string | null, annotations: Array<{ semanticTypeNames: Array<string> | null, semanticTypesNames: Array<string> | null, semanticTypes: Array<string> | null, umlsConcept: string | null, umlsCui: string | null }>, researchedDiseases: Array<{ gardId: string, gardName: string }> }> }> };

export type CoreProjectListQueryQueryVariables = Exact<{
  diseaseWhere?: DiseaseWhere | null | undefined;
  hasSubprojectSort?: Array<ProjectSort> | ProjectSort | null | undefined;
  hasMentionInLimit?: number | null | undefined;
  hasMentionInOffset?: number | null | undefined;
  hasSubprojectLimit?: number | null | undefined;
}>;


export type CoreProjectListQueryQuery = { diseases: Array<{ countCoreProjects: number | null, countProjects: number | null, gardId: string, gardName: string, coreProjects: Array<{ coreProjectNumber: string | null, totalCost: number | null, _subProjectsCount: { totalCount: number }, subProjects: Array<{ title: string | null, fundingYear: number | null }> }> }> };
