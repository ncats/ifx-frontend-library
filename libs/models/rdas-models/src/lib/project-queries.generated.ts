import { gql } from 'apollo-angular';
import { inject, Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import {
  CoreProjectListQueryQuery,
  CoreProjectListQueryQueryVariables,
  CoreProjectQueryQuery,
  CoreProjectQueryQueryVariables,
} from './generated-types';

export const CoreProjectQueryDocument = gql`
    query CoreProjectQuery($coreProjectWhere: CoreProjectWhere, $hasSubprojectSort: [ProjectSort!]) {
  coreProjects(where: $coreProjectWhere) {
    coreProjectNumber
    totalCount: hasSubprojectConnection {
      totalCount
    }
    organizations: hasFundingOrganization {
      name
    }
    totalCost
    subProjects: hasSubproject(sort: $hasSubprojectSort) {
      abstract
      title
      activity
      applicationId
      cfdaCode
      foaNumber
      fullProjectNumber
      fundingMechanism
      fundingYear
      _terms: terms
      annotations: hasAnnotation {
        semanticTypeNames
        semanticTypesNames
        semanticTypes
        umlsConcept
        umlsCui
      }
      researchedDiseases: hasResearchedDisease {
        gardId
        gardName
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root',
  })
  export class CoreProjectQueryGQL extends Apollo.Query<
    CoreProjectQueryQuery,
    CoreProjectQueryQueryVariables
  > {
    document = CoreProjectQueryDocument;
    override apollo = inject(Apollo.Apollo);
  }

export const CoreProjectListQueryDocument = gql`
    query CoreProjectListQuery($diseaseWhere: DiseaseWhere, $hasSubprojectSort: [ProjectSort!], $hasMentionInLimit: Int, $hasMentionInOffset: Int, $hasSubprojectLimit: Int) {
  diseases(where: $diseaseWhere) {
    countCoreProjects
    countProjects
    gardId
    gardName
    coreProjects: hasCoreProject(
      limit: $hasMentionInLimit
      offset: $hasMentionInOffset
    ) {
      coreProjectNumber
      _subProjectsCount: hasSubprojectConnection {
        totalCount
      }
      totalCost
      subProjects: hasSubproject(sort: $hasSubprojectSort, limit: $hasSubprojectLimit) {
        title
        fundingYear
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root',
  })
  export class CoreProjectListQueryGQL extends Apollo.Query<
    CoreProjectListQueryQuery,
    CoreProjectListQueryQueryVariables
  > {
    document = CoreProjectListQueryDocument;
    override apollo = inject(Apollo.Apollo);
  }
