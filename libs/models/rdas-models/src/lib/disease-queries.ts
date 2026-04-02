import { Params } from '@angular/router';
import { TypedDocumentNode } from '@apollo/client';
import { gql } from 'apollo-angular';
import { DIRECTION, RdasQueryFactory, RdasQueryParams } from './rdas-utils';

export const DISEASEFIELDS = gql`
  fragment diseaseFields on Disease {
    classificationLevel
    disorderType
    gardId
    gardName
    icd10cm
    mesh
    omim
    orphanet
    synonyms
    umls
    doid
    ncit
    sctid
    mondo
    medGen
    omimps
    diseaseType
  }
`;

export const DISEASELISTFIELDS = gql`
  fragment diseaseListFields on Disease {
    gardName
    gardId
    classificationLevel
    disorderType
    synonyms
    countArticles
    countTrials
    countProjects
    countGenes
    countPhenotypes
  }
`;

export const DISEASEQUERY = gql`
  query Diseases($limit: Int, $sort: [DiseaseSort!]) {
    diseases(limit: $limit, sort: $sort) {
      gardName
      gardId
      classificationLevel
      disorderType
      synonyms
      countArticles
      countTrials
      countProjects
      countGenes
      countPhenotypes
    }
  }
`;

export const DISEASETYPEAHEAD = gql`
  query Diseases($searchString: String, $limit: Int) {
    diseaseSearch(searchString: $searchString, limit: $limit) {
      ...diseaseListFields
    }
  }
  ${DISEASELISTFIELDS}
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

export class DiseaseWhereParams extends RdasQueryParams {
  where?: {
    gardId?: {
      in?: string[];
      eq?: string;
    };
    gardName?: {
      contains?: string;
      eq?: string;
    };
    hasPhenotype?: PhenotypeParameter;
    hasAssociatedGene?: GeneParameter;
    searchString?: string; //TODO: this is for typeahead search and a different query - try to integrate with main disease queries
    limit?: number; //TODO: this is for typeahead search and a different query - try to integrate with main disease queries
  };
}

export class DiseaseQueryFactory implements RdasQueryFactory {
  query!: TypedDocumentNode<unknown, unknown>;
  params: DiseaseWhereParams = {
    limit: 10,
    offset: 0,
    sort: [{ countArticles: DIRECTION.DESC }],
  };

  getQuery(params: Params) {
    this.query = this._buildQuery(params);
    this._buildParams(params);
    return { query: this.query, params: this.params };
  }

  _buildQuery(params: Params) {
    return gql`
      query DiseaseQuery(
        $limit: Int
        $offset: Int
        $sort: [DiseaseSort!]
        $where: DiseaseWhere
      ) {
        diseases(limit: $limit, offset: $offset, sort: $sort, where: $where) {
          ...diseaseListFields
        }
        total: diseasesConnection(where: $where) {
          count: totalCount
        }
      }
      ${DISEASELISTFIELDS}
    `;
  }

  //todo: should there be text search for q instead of contains? =-- change query
  _buildParams(params: Params) {
    this.params['limit'] = params['pageSize']
      ? +(params['pageSize'] as number)
      : 10;
    this.params['offset'] = params['pageIndex']
      ? +((params['pageIndex'] - 1) * +this.params['limit'])
      : 0;
    if (params['sort']) {
      this.params['sort'] = [
        {
          [params['sort']]: params['direction']
            ? (params['direction'] as DIRECTION)
            : DIRECTION.DESC,
        },
      ];
    }
    if (params['gardIds']) {
      this.params.where = { gardId: { in: params['gardIds'] } };
    }

    if (params['genes']) {
      if (this.params.where) {
        this.params.where.hasAssociatedGene = {
          some: { geneSymbol: { in: params['genes'].split('&') } },
        };
      } else {
        this.params.where = {
          hasAssociatedGene: {
            some: { geneSymbol: { in: params['genes'].split('&') } },
          },
        };
      }
    }

    if (params['phenotypes']) {
      if (this.params.where) {
        this.params.where.hasPhenotype = {
          some: { hpoTerm: { in: params['phenotypes'].split('&') } },
        };
      } else {
        this.params.where = {
          hasPhenotype: {
            some: { hpoTerm: { in: params['phenotypes'].split('&') } },
          },
        };
      }
    }

    if (params['q']) {
      this.params.where = { gardName: { contains: params['q'] } };
    }
  }
}
