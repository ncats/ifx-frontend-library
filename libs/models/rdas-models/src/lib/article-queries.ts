import { gql } from 'apollo-angular';
import { TypedDocumentNode } from '@apollo/client';
import { Params } from '@angular/router';
import {
  ArticleSort,
  ArticleWhere,
  DiseaseHasPublicationConnectionWhere,
  DiseaseWhere,
  SortDirection,
} from './generated-types';

export const ARTICLEQUERY = gql`
  query ArticleQuery($articleWhere: ArticleWhere) {
    articles(where: $articleWhere) {
      abstractText
      citationCount
      dateCreatedByRDAS
      doi
      firstPublicationDate
      inEPMC
      inPMC
      isEpidemiologicalStudy
      isNaturalHistoryStudy
      isOpenAccess
      issue
      lastUpdatedDateByRDAS
      publicationYear
      pubmedId
      pubType
      title
      volume
      journals: hasJournal {
        essn
        issn
        nlmid
        title
      }
      diseases: hasPublication {
        gardId
        gardName
      }
      meshTerms: hasMeshTerm {
        meshTerm
      }
      substances: hasSubstance {
        name
        registryNumber
      }
      authors: hasAuthor {
        fullName
        firstName
        contactEmail
        hasAffiliation {
          name
        }
        lastName
        orc_id
        pi_id
      }
      epidemiologies: hasEpidemiologicalAnnotation {
        epidemiologyRate
        studyDate
        studyLocation
        sex
        lastUpdatedByRDAS
        ethnicity
        epidemiologyType
      }
      annotations: hasPubtatorAnnotation(
        where: { NOT: { annotationType: { in: ["Species", "Genus"] } } }
      ) {
        annotationIdentifier
        annotationType
        annotation
      }
    }
  }
`;

export const ARTICLELISTQUERY = gql`
  query ArticleListQuery(
    $diseaseWhere: DiseaseWhere
    $hasPublicationLimit: Int
    $hasPublicationInOffset: Int
    $hasPublicationInSort: [ArticleSort!]
    $articleWhere: ArticleWhere
    $hasPublicationConnectionWhere: DiseaseHasPublicationConnectionWhere
  ) {
    diseases(where: $diseaseWhere) {
      allCount: countArticles
      countEpiArticles
      countNhsArticles
      articles: hasPublication(
        limit: $hasPublicationLimit
        offset: $hasPublicationInOffset
        sort: $hasPublicationInSort
        where: $articleWhere
      ) {
        pubmedId
        title
        publicationYear
        doi
        firstPublicationDate
        pubType
        isNaturalHistoryStudy
        isEpidemiologicalStudy
        journals: hasJournal {
          essn
          issn
          nlmid
          title
        }
      }
      filteredCount: hasPublicationConnection(
        where: $hasPublicationConnectionWhere
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

export class ArticleQueryFactory {
  query!: TypedDocumentNode<unknown, unknown>;
  params: {
    hasPublicationLimit?: number;
    hasPublicationOffset?: number;
    hasPublicationSort?: ArticleSort[];
    diseaseWhere?: DiseaseWhere;
    articleWhere?: ArticleWhere;
    hasPublicationConnectionWhere?: DiseaseHasPublicationConnectionWhere;
  } = {};

  getQuery(params: Params) {
    this.query = this._buildQuery(params);
    this._buildParams(params);
    return { query: this.query, params: this.params };
  }

  _buildQuery(params: Params) {
    if (params['pubmedId']) {
      return ARTICLEQUERY;
    } else {
      this.params = {
        hasPublicationLimit: 10,
        hasPublicationOffset: 0,
        hasPublicationSort: [{ publicationYear: 'DESC' }],
      };
      return ARTICLELISTQUERY;
    }
  }

  _buildParams(params: Params) {
    Object.entries(params).forEach((key) => {
      switch (key[0]) {
        case 'pageSize': {
          this.params.hasPublicationOffset = params['pageSize']
            ? +(params['pageSize'] as number)
            : 10;
          break;
        }
        case 'offset': {
          this.params.hasPublicationOffset = +params['offset'];
          break;
        }
        case 'sort': {
          this.params.hasPublicationSort = [
            {
              [params['sort']]: params['direction']
                ? (params['direction'] as SortDirection)
                : ('DESC' as SortDirection),
            },
          ];
          break;
        }
        case 'pubmedId': {
          this.params.articleWhere = { pubmedId: { eq: +params['pubmedId'] } };
          break;
        }
        case 'gardId': {
          this.params.diseaseWhere = { gardId: { eq: params['gardId'] } };
          break;
        }
        case 'isEpi': {
          if (params['isEpi'].length) {
            if (!this.params.articleWhere) {
              this.params.articleWhere = {};
            }
            if (!this.params.hasPublicationConnectionWhere) {
              this.params.hasPublicationConnectionWhere = {};
            }
            if (!this.params.hasPublicationConnectionWhere.node) {
              this.params.hasPublicationConnectionWhere.node = {};
            }
            this.params.articleWhere.isEpidemiologicalStudy = {
              eq: params['isEpi'] === 'true',
            };
            this.params.hasPublicationConnectionWhere.node.isEpidemiologicalStudy =
              { eq: params['isEpi'] === 'true' };
          }
          break;
        }
        case 'isNHS': {
          if (params['isNHS'].length) {
            if (!this.params.articleWhere) {
              this.params.articleWhere = {};
            }
            if (!this.params.hasPublicationConnectionWhere) {
              this.params.hasPublicationConnectionWhere = {};
            }
            if (!this.params.hasPublicationConnectionWhere.node) {
              this.params.hasPublicationConnectionWhere.node = {};
            }

            this.params.articleWhere.isNaturalHistoryStudy = {
              eq: JSON.parse(params['isNHS']),
            };
            this.params.hasPublicationConnectionWhere.node.isNaturalHistoryStudy =
              { eq: JSON.parse(params['isNHS']) };
          }
          break;
        }
        case 'year': {
          let val = params['year'];
          if (typeof val === 'string') {
            val = Number.parseInt(params['year']);
          } else if (typeof params['year'] === 'object') {
            val = params['year'].map((year: string | number) =>
              Number.parseInt(<string>year),
            );
          }
          if (!this.params.articleWhere) {
            this.params.articleWhere = {};
          }
          if (!this.params.hasPublicationConnectionWhere) {
            this.params.hasPublicationConnectionWhere = { node: {} };
          }
          this.params.articleWhere.publicationYear = { in: val };
          this.params.hasPublicationConnectionWhere.node = {
            publicationYear: { in: val },
          };
          break;
        }
      }
    });
  }
}
