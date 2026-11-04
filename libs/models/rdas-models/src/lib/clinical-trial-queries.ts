import { gql } from 'apollo-angular';

import { TypedDocumentNode } from '@apollo/client';
import { Params } from '@angular/router';
import {
  ClinicalTrialSort,
  ClinicalTrialWhere,
  DiseaseHasClinicalTrialConnectionWhere,
  DiseaseWhere,
  SortDirection,
} from './generated-types';

const CLINICALTRIALQUERY = gql`
  query ClinicalTrialQuery($clinicalTrialWhere: ClinicalTrialWhere) {
    clinicalTrials(where: $clinicalTrialWhere) {
      briefTitle
      briefSummary
      nctId
      phase
      studyType
      overallStatus
      officialTitle
      startDate
      completionDate
      completionDateType
      startDateType
      lastUpdatePostDate
      studyDesigns: hasStudyDesign {
        designAllocation
        designInterventionModelDescription
        designInterventionModel
        designMasking
        designObservationalModel
        designPrimaryPurpose
        designTimePerspective
        detailedDescription
        hasExpandedAccess
        studyType
      }
      participantInfo: hasParticipantInfo {
        eligibilityCriteria
        enrollmentCount
        enrollmentType
        healthyVolunteers
        maximumAge
        minimumAge
        stdAges
      }
      studyDiseases: hasClinicalTrial {
        gardId
        gardName
      }
      conditions: hasInvestigatedCondition {
        condition
        mappedDiseases: hasMappedCondition {
          gardId
          gardName
        }
      }
      locations: hasTrialLocation {
        address
        city
        country
        facility
        state
        zip
      }
      interventions: hasIntervention {
        interventionType
        interventionName
        interventionDescription
        hasDrug {
          unii
          rxnormName
          rxnormID
        }
      }
    }
  }
`;

const CLINICALTRIALLISTQUERY = gql`
  query ClinicalTrialListQuery(
    $diseaseWhere: DiseaseWhere
    $hasClinicalTrialLimit: Int
    $hasClinicalTrialOffset: Int
    $hasClinicalTrialSort: [ClinicalTrialSort!]
    $clinicalTrialWhere: ClinicalTrialWhere
    $hasClinicalTrialConnectionWhere: DiseaseHasClinicalTrialConnectionWhere
  ) {
    diseases(where: $diseaseWhere) {
      allCount: countTrials
      clinicalTrials: hasClinicalTrial(
        limit: $hasClinicalTrialLimit
        offset: $hasClinicalTrialOffset
        sort: $hasClinicalTrialSort
        where: $clinicalTrialWhere
      ) {
        briefTitle
        nctId
        phase
        studyType
        overallStatus
        officialTitle
        startDate
        completionDate
        completionDateType
        startDateType
      }
      filteredCount: hasClinicalTrialConnection(
        where: $hasClinicalTrialConnectionWhere
      ) {
        totalCount: aggregate {
          count {
            nodes
          }
        }
      }
    }
  }
`;

export class ClinicalTrialQueryFactory {
  query!: TypedDocumentNode<unknown, unknown>;
  params!: {
    diseaseWhere?: DiseaseWhere;
    clinicalTrialWhere?: ClinicalTrialWhere;
    hasClinicalTrialLimit?: number;
    hasClinicalTrialOffset?: number;
    hasClinicalTrialSort?: ClinicalTrialSort[];
    hasClinicalTrialConnectionWhere?: DiseaseHasClinicalTrialConnectionWhere;
  };

  getQuery(params: Params) {
    this.query = this._buildQuery(params);
    this._buildParams(params);
    return { query: this.query, params: this.params };
  }

  _buildQuery(params: Params) {
    if (params['nctId']) {
      return CLINICALTRIALQUERY;
    } else {
      return CLINICALTRIALLISTQUERY;
    }
  }

  _buildParams(params: Params) {
    this.params = {};
    if (!params['nctId']) {
      this.params.hasClinicalTrialLimit = 10;
      this.params.hasClinicalTrialOffset = 0;
    }

    Object.entries(params).forEach((key) => {
      switch (key[0]) {
        case 'pageSize': {
          this.params.hasClinicalTrialLimit = params['pageSize']
            ? +(params['pageSize'] as number)
            : 10;
          break;
        }
        case 'offset': {
          this.params.hasClinicalTrialOffset = +params['offset'];
          break;
        }
        case 'sort': {
          this.params.hasClinicalTrialSort = [
            {
              [params['sort'] as string]: params['direction']
                ? (params['direction'] as SortDirection)
                : ('DESC' as SortDirection),
            } as ClinicalTrialSort,
          ];
          break;
        }
        case 'nctId': {
          if (!this.params.clinicalTrialWhere) {
            this.params.clinicalTrialWhere = {};
          }
          this.params.clinicalTrialWhere.nctId = { eq: params['nctId'] };
          break;
        }
        case 'gardId': {
          this.params.diseaseWhere = { gardId: { eq: params['gardId'] } };
          break;
        }
        case 'phase': {
          if (!this.params.clinicalTrialWhere) {
            this.params.clinicalTrialWhere = {};
          }
          if (!this.params.hasClinicalTrialConnectionWhere) {
            this.params.hasClinicalTrialConnectionWhere = {};
          }
          if (!this.params.hasClinicalTrialConnectionWhere.node) {
            this.params.hasClinicalTrialConnectionWhere.node = {};
          }
          if (params['phase'].length) {
            if (
              this.params.clinicalTrialWhere.overallStatus ||
              this.params.clinicalTrialWhere.studyType
            ) {
              if (!this.params.hasClinicalTrialConnectionWhere.node.AND) {
                this.params.hasClinicalTrialConnectionWhere.node.AND = [];
              }
              if (!this.params.clinicalTrialWhere.AND) {
                this.params.clinicalTrialWhere.AND = [];
              }
              this.params.clinicalTrialWhere.AND.push({
                phase: { in: params['phase'] },
              });

              this.params.hasClinicalTrialConnectionWhere.node.AND.push({
                phase: { in: params['phase'] },
              });
            } else {
              this.params.clinicalTrialWhere.phase = {
                in: params['phase'],
              };
              this.params.hasClinicalTrialConnectionWhere.node = {
                phase: {
                  in: params['phase'],
                },
              };
            }
          }
          break;
        }
        case 'overallStatus': {
          if (!this.params.clinicalTrialWhere) {
            this.params.clinicalTrialWhere = {};
          }
          if (!this.params.hasClinicalTrialConnectionWhere) {
            this.params.hasClinicalTrialConnectionWhere = {};
          }
          if (!this.params.hasClinicalTrialConnectionWhere.node) {
            this.params.hasClinicalTrialConnectionWhere.node = {};
          }
          if (params['overallStatus'].length) {
            if (
              this.params.clinicalTrialWhere.phase ||
              this.params.clinicalTrialWhere.studyType
            ) {
              if (!this.params.hasClinicalTrialConnectionWhere.node.AND) {
                this.params.hasClinicalTrialConnectionWhere.node.AND = [];
              }
              this.params.clinicalTrialWhere.AND?.push({
                overallStatus: { in: params['overallStatus'] },
              });
              this.params.hasClinicalTrialConnectionWhere.node.AND.push({
                overallStatus: { in: params['overallStatus'] },
              });
            } else {
              this.params.clinicalTrialWhere.overallStatus = {
                in: params['overallStatus'],
              };
              this.params.hasClinicalTrialConnectionWhere.node = {
                overallStatus: {
                  in: params['overallStatus'],
                },
              };
            }
          }
          break;
        }
        case 'studyType': {
          if (!this.params.clinicalTrialWhere) {
            this.params.clinicalTrialWhere = {};
          }
          if (!this.params.hasClinicalTrialConnectionWhere) {
            this.params.hasClinicalTrialConnectionWhere = {};
          }
          if (!this.params.hasClinicalTrialConnectionWhere.node) {
            this.params.hasClinicalTrialConnectionWhere.node = {};
          }
          if (params['studyType'].length) {
            if (
              this.params.clinicalTrialWhere.overallStatus ||
              this.params.clinicalTrialWhere.phase
            ) {
              if (!this.params.hasClinicalTrialConnectionWhere.node.AND) {
                this.params.hasClinicalTrialConnectionWhere.node.AND = [];
              }
              this.params.clinicalTrialWhere['AND']?.push({
                studyType: { in: params['studyType'] },
              });
              this.params.hasClinicalTrialConnectionWhere.node.AND.push({
                studyType: { in: params['studyType'] },
              });
            } else {
              this.params.clinicalTrialWhere.studyType = {
                in: params['studyType'],
              };
              this.params.hasClinicalTrialConnectionWhere.node = {
                studyType: {
                  in: params['studyType'],
                },
              };
            }
          }
          break;
        }
      }
    });
  }
}
