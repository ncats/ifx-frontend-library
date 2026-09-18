import { gql } from 'apollo-angular';
import { TypedDocumentNode } from '@apollo/client';
import { Params } from '@angular/router';
import {
  ArticleSort,
  ArticleWhere,
  DiseaseHasMentionInConnectionWhere,
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
      diseases: hasMentionIn {
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
    $hasMentionInLimit: Int
    $hasMentionInOffset: Int
    $hasMentionInSort: [ArticleSort!]
    $articleWhere: ArticleWhere
    $hasMentionInConnectionWhere: DiseaseHasMentionInConnectionWhere
  ) {
    diseases(where: $diseaseWhere) {
      allCount: countArticles
      countEpiArticles
      countNhsArticles
      articles: hasMentionIn(
        limit: $hasMentionInLimit
        offset: $hasMentionInOffset
        sort: $hasMentionInSort
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
      filteredCount: hasMentionInConnection(
        where: $hasMentionInConnectionWhere
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
    hasMentionInLimit?: number;
    hasMentionInOffset?: number;
    hasMentionInSort?: ArticleSort[];
    diseaseWhere?: DiseaseWhere;
    articleWhere?: ArticleWhere;
    hasMentionInConnectionWhere?: DiseaseHasMentionInConnectionWhere;
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
        hasMentionInLimit: 10,
        hasMentionInOffset: 0,
        hasMentionInSort: [{ publicationYear: 'DESC' }],
      };
      return ARTICLELISTQUERY;
    }
  }

  _buildParams(params: Params) {
    Object.entries(params).forEach((key) => {
      switch (key[0]) {
        case 'pageSize': {
          this.params.hasMentionInOffset = params['pageSize']
            ? +(params['pageSize'] as number)
            : 10;
          break;
        }
        case 'offset': {
          this.params.hasMentionInOffset = +params['offset'];
          break;
        }
        case 'sort': {
          this.params.hasMentionInSort = [
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
            if (!this.params.hasMentionInConnectionWhere) {
              this.params.hasMentionInConnectionWhere = {};
            }
            if (!this.params.hasMentionInConnectionWhere.node) {
              this.params.hasMentionInConnectionWhere.node = {};
            }
            this.params.articleWhere.isEpidemiologicalStudy = {
              eq: params['isEpi'] === 'true',
            };
            this.params.hasMentionInConnectionWhere.node.isEpidemiologicalStudy =
              { eq: params['isEpi'] === 'true' };
          }
          break;
        }
        case 'isNHS': {
          if (params['isNHS'].length) {
            if (!this.params.articleWhere) {
              this.params.articleWhere = {};
            }
            if (!this.params.hasMentionInConnectionWhere) {
              this.params.hasMentionInConnectionWhere = {};
            }
            if (!this.params.hasMentionInConnectionWhere.node) {
              this.params.hasMentionInConnectionWhere.node = {};
            }

            this.params.articleWhere.isNaturalHistoryStudy = {
              eq: JSON.parse(params['isNHS']),
            };
            this.params.hasMentionInConnectionWhere.node.isNaturalHistoryStudy =
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
          if (!this.params.hasMentionInConnectionWhere) {
            this.params.hasMentionInConnectionWhere = { node: {} };
          }
          this.params.articleWhere.publicationYear = { in: val };
          this.params.hasMentionInConnectionWhere.node = {
            publicationYear: { in: val },
          };
          break;
        }
      }
    });
  }
}
