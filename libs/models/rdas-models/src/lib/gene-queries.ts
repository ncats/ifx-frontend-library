import { gql } from 'apollo-angular';
import { TypedDocumentNode } from '@apollo/client';
import { Params } from '@angular/router';
import { GeneSort, GeneWhere, SortDirection } from './generated-types';

export const GENEFILTERSQUERY = gql`
  query GeneFilters(
    $offset: Int
    $limit: Int
    $sort: [GeneSort!]
    $allGenesWhere: GeneWhere
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
  }
`;

export class GeneQueryFactory {
  query!: TypedDocumentNode<unknown, unknown>;
  params!: {
    limit?: number;
    offset?: number;
    sort?: GeneSort[];
    allGenesWhere?: GeneWhere;
    searchedGenesWhere?: GeneWhere;
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
    this.params = {
      limit: 50,
      sort: [{ countDiseases: 'DESC' as SortDirection }],
    };
    Object.entries(params).forEach((key) => {
      switch (key[0]) {
        case 'skip': {
          this.params.offset = key[1];
          break;
        }
        case 'limit': {
          this.params.limit = key[1];
          break;
        }
        case 'term': {
          const term = key[1];
          if (!this.params.allGenesWhere) {
            this.params.allGenesWhere = {};
          }
          if (!this.params.allGenesWhere.AND) {
            this.params.allGenesWhere.AND = [];
          }
          this.params.allGenesWhere.AND.push({
            geneSymbol: { contains: term.toUpperCase() },
          });
          break;
        }
      }
    });
  }
}
