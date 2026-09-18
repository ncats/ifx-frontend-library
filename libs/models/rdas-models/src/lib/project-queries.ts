import { gql } from 'apollo-angular';
import { TypedDocumentNode } from '@apollo/client';
import { Params } from '@angular/router';
import {
  ClinicalTrialSort,
  CoreProjectWhere,
  DiseaseWhere,
  ProjectSort,
  SortDirection,
} from './generated-types';

export const COREPROJECTQUERY = gql`
  query CoreProjectQuery(
    $coreProjectWhere: CoreProjectWhere
    $hasSubprojectSort: [ProjectSort!]
  ) {
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

export const COREPROJECTLISTQUERY = gql`
  query CoreProjectListQuery(
    $diseaseWhere: DiseaseWhere
    $hasSubprojectSort: [ProjectSort!]
    $hasMentionInLimit: Int
    $hasMentionInOffset: Int
    $hasSubprojectLimit: Int
  ) {
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
        subProjects: hasSubproject(
          sort: $hasSubprojectSort
          limit: $hasSubprojectLimit
        ) {
          title
          fundingYear
        }
      }
    }
  }
`;

export class ProjectQueryFactory {
  query!: TypedDocumentNode<unknown, unknown>;
  params!: {
    hasSubprojectSort?: ProjectSort[];
    hasMentionInLimit?: number;
    hasMentionInOffset?: number;
    hasSubprojectLimit?: number;
    diseaseWhere?: DiseaseWhere;
    coreProjectWhere?: CoreProjectWhere;
  };

  getQuery(params: Params) {
    this.query = this._buildQuery(params);
    this._buildParams(params);
    return { query: this.query, params: this.params };
  }

  _buildQuery(params: Params) {
    if (params['projectNumber']) {
      this.params = {};
      return COREPROJECTQUERY;
    } else {
      this.params = {};
      this.params.hasMentionInLimit = 10;
      this.params.hasMentionInOffset = 0;
      this.params.hasSubprojectLimit = 1;
      this.params.hasSubprojectSort = [
        { fundingYear: 'DESC' as SortDirection },
      ];
      return COREPROJECTLISTQUERY;
    }
  }

  _buildParams(params: Params) {
    Object.entries(params).forEach((key) => {
      switch (key[0]) {
        case 'pageSize': {
          this.params.hasMentionInLimit = params['pageSize']
            ? +(params['pageSize'] as number)
            : 10;
          break;
        }
        case 'offset': {
          this.params.hasMentionInOffset = +params['offset'];
          break;
        }
        case 'sort': {
          this.params.hasSubprojectSort = [
            {
              [params['sort'] as string]: params['direction']
                ? (params['direction'] as SortDirection)
                : ('DESC' as SortDirection),
            } as ClinicalTrialSort,
          ];
          break;
        }
        case 'projectNumber': {
          this.params.coreProjectWhere = {
            coreProjectNumber: { eq: params['projectNumber'] },
          };
          break;
        }
        case 'gardId': {
          this.params.diseaseWhere = { gardId: { eq: params['gardId'] } };
          break;
        }
      }
    });
  }
}
