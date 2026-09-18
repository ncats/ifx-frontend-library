import { Params } from '@angular/router';
import { TypedDocumentNode } from '@apollo/client';
import { gql } from 'apollo-angular';
import {
  ArticleWhere,
  ClinicalTrialWhere,
  DiseaseSort,
  DiseaseWhere,
  SortDirection,
} from './generated-types';

export const ALLDISEASEFILTERCOUNTSQUERY = gql`
  query FieldCounts {
    fieldCounts(limit: 1) {
      fieldCounts {
        allArticlesByYear {
          count
          term
        }
        allEpiArticlesByYear {
          count
          term
        }
        allNHSArticlesByYear {
          term
          count
        }
        allProjectsByYear {
          count
          term
        }
        allTrialsByPhase {
          count
          term
        }
        allTrialsByStatus {
          count
          term
        }
        allTrialsByType {
          count
          term
        }
      }
    }
  }
`;

export const DISEASEQUERY = gql`
  query DiseaseQuery($where: DiseaseWhere) {
    diseases(where: $where) {
      classificationLevel
      countArticles
      countGenes
      countPhenotypes
      countProjects
      countTrials
      disorderType
      gardId
      gardName
      icd10cm
      mesh
      omim
      orphanet
      synonyms
      doid
      ncit
      sctid
      mondo
      medGen
      omimps
      diseaseType
      _geneAssociations: hasAssociatedGeneConnection {
        edges {
          gene: node {
            geneIdentifier
            geneSymbol
            geneSynonyms
            geneUrl
            omim
            reference
          }
          properties {
            associationStatus
            associationType
            reference
          }
        }
      }
      _phenotypeAssociations: hasPhenotypeConnection {
        edges {
          phenotype: node {
            hpoId
            hpoTerm
          }
          properties {
            _evidence: evidence
            hpoTermFrequency
            reference
          }
        }
      }
    }
  }
`;

export const DISEASESTATICFILTERSQUERY = gql`
  query DiseaseStaticFiltersQuery($where: DiseaseWhere) {
    diseases(where: $where) {
      filterCounts {
        diseaseArticleByYear {
          count
          term
        }
        diseaseArticleByEpi {
          count
          term
        }
        diseaseArticleByNHS {
          count
          term
        }
        diseaseProjectsByYear {
          count
          term
        }
        diseaseTrialsByPhase {
          count
          term
        }
        diseaseTrialsByStatus {
          count
          term
        }
        diseaseTrialsByType {
          count
          term
        }
      }
    }
  }
`;

export const DISEASEDYNAMICFILTERSQUERY = gql`
  query DiseaseDynamicFiltersQuery(
    $where: DiseaseWhere
    $clinicalTrialWhere: ClinicalTrialWhere
    $articleWhere: ArticleWhere
  ) {
    trialCountsByStatus(
      where: $where
      clinicalTrialWhere: $clinicalTrialWhere
    ) {
      count
      term
    }

    trialCountsByPhase(where: $where, clinicalTrialWhere: $clinicalTrialWhere) {
      count
      term
    }
    trialCountsByType(where: $where, clinicalTrialWhere: $clinicalTrialWhere) {
      count
      term
    }

    diseaseArticleByYear(where: $where, articleWhere: $articleWhere) {
      count
      term
    }
  }
`;

export const DISEASELISTQUERY = gql`
  query DiseaseListQuery(
    $limit: Int
    $offset: Int
    $sort: [DiseaseSort!]
    $diseaseWhere: DiseaseWhere
  ) {
    diseases(
      limit: $limit
      offset: $offset
      sort: $sort
      where: $diseaseWhere
    ) {
      gardName
      gardId
      classificationLevel
      disorderType
      synonyms
      countArticles
      countTrials
      countProjects
      countCoreProjects
      countGenes
      countPhenotypes
    }
    total: diseasesConnection(where: $diseaseWhere) {
      count: totalCount
    }
  }
`;

export const DISEASETYPEAHEAD = gql`
  query DiseasesTypeahead($searchString: String, $limit: Int) {
    diseaseSearch(searchString: $searchString, limit: $limit) {
      gardName
      gardId
      classificationLevel
      disorderType
      synonyms
      countArticles
      countTrials
      countProjects
      countCoreProjects
      countGenes
      countPhenotypes
    }
  }
`;

export class PhenotypeParameter {
  some:
    | {
        hpoTerm: {
          in: string[];
        };
      }
    | undefined;
}

export class GeneParameter {
  some:
    | {
        geneSymbol: {
          in: string[];
        };
      }
    | undefined;
}

export class DiseaseQueryFactory {
  query!: TypedDocumentNode<unknown, unknown>;
  params!: {
    limit?: number;
    offset?: number;
    sort?: DiseaseSort[];
    where?: DiseaseWhere;
    clinicalTrialWhere?: ClinicalTrialWhere;
    articleWhere?: ArticleWhere;
  };

  getQuery(params: Params) {
    this.query = this._buildQuery(params);
    this._buildParams(params);
    return { query: this.query, params: this.params };
  }

  getStaticFilterQuery(params: Params) {
    this.query = DISEASESTATICFILTERSQUERY;
    this._buildParams(params);
    return { query: this.query, params: this.params };
  }

  getDynamicFilterQuery(params: Params) {
    this.query = DISEASEDYNAMICFILTERSQUERY;
    this._buildParams(params);
    return { query: this.query, params: this.params };
  }

  _buildQuery(params: Params) {
    if (params['gardId']) {
      return DISEASEQUERY;
    } else {
      return DISEASELISTQUERY;
    }
  }

  //todo: should there be text search for q instead of contains? =-- change query
  _buildParams(params: Params) {
    this.params = {};
    if (!params['gardId']) {
      this.params = {};
      this.params.limit = 10;
      this.params.offset = 0;
      this.params.sort = [{ countArticles: 'DESC' as SortDirection }];
    }
    Object.entries(params).forEach((key) => {
      switch (key[0]) {
        case 'pageSize':
        case 'limit': {
          this.params.limit = params['pageSize']
            ? +(params['pageSize'] as number)
            : 10;
          break;
        }
        case 'pageIndex': {
          this.params.offset = params['pageIndex']
            ? +(
                (params['pageIndex'] - 1) *
                (params['pageSize'] ? (+params['pageSize'] as number) : 10)
              )
            : 0;
          break;
        }
        case 'offset': {
          this.params.offset = params['pageIndex']
            ? +(
                (params['pageIndex'] - 1) *
                (this.params.limit ? +this.params.limit : 10)
              )
            : 0;
          break;
        }
        case 'sort': {
          this.params.sort = [
            {
              [params['sort']]: params['direction']
                ? (params['direction'] as SortDirection)
                : ('DESC' as SortDirection),
            },
          ];
          break;
        }
        case 'gardIds': {
          if (!this.params.where) {
            this.params.where = {};
          }
          this.params.where.gardId = { in: params['gardIds'] };
          break;
        }
        case 'gardId': {
          if (!this.params.where) {
            this.params.where = {};
          }
          this.params.where.gardId = { eq: params['gardId'] };
          break;
        }
        case 'genes': {
          if (!this.params.where) {
            this.params.where = {};
          }
          this.params.where.hasAssociatedGene = {
            some: { geneSymbol: { in: params['genes'].split('&') } },
          };
          break;
        }
        case 'phenotypes': {
          if (!this.params.where) {
            this.params.where = {};
          }
          this.params.where.hasPhenotype = {
            some: { hpoTerm: { in: params['phenotypes'].split('&') } },
          };
          break;
        }
        case 'q': {
          if (!this.params.where) {
            this.params.where = {};
          }
          this.params.where.gardName = { contains: params['q'] };
          break;
        }
        case 'phase': {
          if (!this.params.clinicalTrialWhere) {
            this.params.clinicalTrialWhere = {};
          }
          if (params['phase'].length) {
            this.params.clinicalTrialWhere.phase = {
              in: params['phase'],
            };
          }
          break;
        }
        case 'overallStatus': {
          if (!this.params.clinicalTrialWhere) {
            this.params.clinicalTrialWhere = {};
          }
          if (params['overallStatus'].length) {
            this.params.clinicalTrialWhere.overallStatus = {
              in: params['overallStatus'],
            };
          }
          break;
        }
        case 'studyType': {
          if (!this.params.clinicalTrialWhere) {
            this.params.clinicalTrialWhere = {};
          }
          if (params['studyType'].length) {
            this.params.clinicalTrialWhere.studyType = {
              in: params['studyType'],
            };
          }
          break;
        }
        case 'isEpi': {
          if (!this.params.articleWhere) {
            this.params.articleWhere = {};
          }
          if (params['isEpi'].length) {
            this.params.articleWhere.isEpidemiologicalStudy = {
              eq: JSON.parse(params['isEpi']),
            };
          }
          break;
        }
        case 'isNHS': {
          if (!this.params.articleWhere) {
            this.params.articleWhere = {};
          }
          if (params['isNHS'].length) {
            this.params.articleWhere.isNaturalHistoryStudy = {
              eq: JSON.parse(params['isNHS']),
            };
          }
          break;
        }
        case 'year': {
          if (!this.params.articleWhere) {
            this.params.articleWhere = {};
          }
          if (params['year'].length) {
            let val = params['year'];
            if (typeof val === 'string') {
              val = Number.parseInt(params['year']);
            } else if (typeof params['year'] === 'object') {
              val = params['year'].map((year: string | number) =>
                Number.parseInt(<string>year),
              );
            }
            this.params.articleWhere.publicationYear = {
              in: val,
            };
          }
          break;
        }
      }
    });
  }
}
