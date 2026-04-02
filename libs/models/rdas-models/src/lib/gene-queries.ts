import { gql } from 'apollo-angular';
import { DIRECTION, RdasQueryFactory, RdasQueryParams } from './rdas-utils';
import { TypedDocumentNode } from '@apollo/client';
import { Params } from '@angular/router';

export class GeneWhereParams extends RdasQueryParams {
  allGenesWhere:
    | {
        NOT: {
          geneSymbol: {
            in: string[];
          };
        };
      }
    | undefined;
  filteredGenesWhere?: {
    geneSymbol: {
      in: string[];
    };
  };
  searchedGenesWhere?: {
    geneSymbol: {
      contains: string | null;
    };
  };
}

export const GENEFILTERSQUERY = gql`
  query GeneFilters(
    $offset: Int
    $limit: Int
    $sort: [GeneSort!]
    $allGenesWhere: GeneWhere
    $filteredGenesWhere: GeneWhere
    $searchedGenesWhere: GeneWhere
  ) {
    allFilters: genes(
      where: $allGenesWhere
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      term: geneSymbol
      count: countDiseases
    }
    selectedFilters: genes(
      sort: $sort
      where: $filteredGenesWhere
      limit: $limit
      offset: $offset
    ) {
      term: geneSymbol
      count: countDiseases
    }
    searchFilters: genes(
      sort: $sort
      limit: $limit
      where: $searchedGenesWhere
      offset: $offset
    ) {
      term: geneSymbol
      count: countDiseases
    }
  }
`;

export class GeneQueryFactory implements RdasQueryFactory {
  query!: TypedDocumentNode<unknown, unknown>;
  params: GeneWhereParams = {
    limit: 200,
    offset: 0,
    sort: [{ countDiseases: DIRECTION.DESC }],
    allGenesWhere: {
      NOT: {
        geneSymbol: {
          in: [],
        },
      },
    },
    filteredGenesWhere: {
      geneSymbol: {
        in: [],
      },
    },
    searchedGenesWhere: {
      geneSymbol: {
        contains: null,
      },
    },
  };

  getQuery(params: Params) {
    this.query = this._buildQuery(params);
    this._buildParams(params);
    return { query: this.query, params: this.params };
  }

  _buildQuery(params: Params): TypedDocumentNode<unknown, unknown> {
    return GENEFILTERSQUERY;
  }

  _buildParams(params: Params) {
    console.log(params);
    if (Object.keys(params).length > 0) {
      if (params['genes']) {
        const terms: string[] = params['genes'].split('&');
        this.params.offset = params['skip'];
        this.params.allGenesWhere = { NOT: { geneSymbol: { in: terms } } };
        this.params.filteredGenesWhere = { geneSymbol: { in: terms } };
        this.params.searchedGenesWhere = { geneSymbol: { contains: null } };
      }

      if (params['skip']) {
        console.log(params['skip']);
        this.params.offset = params['skip'];
        console.log(this.params);
      }
      if (params['limit']) {
        this.params.limit = params['limit'];
      }
      if (params['term']) {
        const term = <string>params['term'];
        this.params.searchedGenesWhere = {
          geneSymbol: { contains: term.toUpperCase() },
        };
      }
    }
    console.log(this.params);
  }
}
