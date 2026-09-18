import { gql } from 'apollo-angular';
import { TypedDocumentNode } from '@apollo/client';
import {
  PhenotypeSort,
  PhenotypeWhere,
  SortDirection,
} from './generated-types';
import { Params } from '@angular/router';

export const PHENOTYPEFILTERSQUERY = gql`
  query PhenotypeFilters(
    $offset: Int
    $limit: Int
    $sort: [PhenotypeSort!]
    $allPhenotypesWhere: PhenotypeWhere
  ) {
    allFilters: phenotypes(
      limit: $limit
      offset: $offset
      sort: $sort
      where: $allPhenotypesWhere
    ) {
      term: hpoTerm
      count: countDiseases
    }
  }
`;

export class PhenotypeQueryFactory {
  query!: TypedDocumentNode<unknown, unknown>;
  params!: {
    limit?: number;
    offset?: number;
    sort?: PhenotypeSort[];
    allPhenotypesWhere?: PhenotypeWhere;
  };

  getQuery(params: Params) {
    this.query = this._buildQuery(params);
    this._buildParams(params);
    return { query: this.query, params: this.params };
  }

  _buildQuery(params: Params): TypedDocumentNode<unknown, unknown> {
    return PHENOTYPEFILTERSQUERY;
  }

  _buildParams(params: Params) {
    this.params = {
      limit: 50,
      offset: params['skip'],
      sort: [{ countDiseases: 'DESC' as SortDirection }],
      allPhenotypesWhere: { NOT: { hpoTerm: { in: [] } } },
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
          this.params.allPhenotypesWhere = {
            hpoTerm: { contains: term },
          };
          break;
        }
      }
    });
  }
}
