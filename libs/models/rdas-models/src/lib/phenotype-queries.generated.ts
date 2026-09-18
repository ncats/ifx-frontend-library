import { gql } from 'apollo-angular';
import { inject, Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import {
  PhenotypeFiltersQuery,
  PhenotypeFiltersQueryVariables,
} from './generated-types';

export const PhenotypeFiltersDocument = gql`
    query PhenotypeFilters($offset: Int, $limit: Int, $sort: [PhenotypeSort!], $allPhenotypesWhere: PhenotypeWhere) {
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

  @Injectable({
    providedIn: 'root',
  })
  export class PhenotypeFiltersGQL extends Apollo.Query<
    PhenotypeFiltersQuery,
    PhenotypeFiltersQueryVariables
  > {
    document = PhenotypeFiltersDocument;
    override apollo = inject(Apollo.Apollo);
  }
