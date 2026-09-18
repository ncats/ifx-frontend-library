import { gql } from 'apollo-angular';
import { inject, Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import { GeneFiltersQuery, GeneFiltersQueryVariables } from './generated-types';

export const GeneFiltersDocument = gql`
    query GeneFilters($offset: Int, $limit: Int, $sort: [GeneSort!], $allGenesWhere: GeneWhere) {
  filters: genes(
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

  @Injectable({
    providedIn: 'root',
  })
  export class GeneFiltersGQL extends Apollo.Query<
    GeneFiltersQuery,
    GeneFiltersQueryVariables
  > {
    document = GeneFiltersDocument;
    override apollo = inject(Apollo.Apollo);
  }
