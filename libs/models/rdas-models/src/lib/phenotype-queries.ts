import { gql } from 'apollo-angular';
import { RdasQueryParams } from './rdas-utils';

export const PHENOTYPEFILTERPARAMETERS: RdasQueryParams = {
  offset: 0,
  limit: 200,
};

export const PHENOTYPEFILTERS = gql`
  query PhenotypeFilters(
    $offset: Int
    $limit: Int
    $sort: [PhenotypeSort!]
    $where: PhenotypeWhere
  ) {
    phenotypes(limit: $limit, offset: $offset, sort: $sort, where: $where) {
      hpoId
      term: hpoTerm
      count: countDiseases
    }
  }
`;
