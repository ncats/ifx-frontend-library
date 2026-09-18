import { gql } from 'apollo-angular';
import { inject, Injectable } from '@angular/core';
import * as Apollo from 'apollo-angular';
import {
  ArticleListQueryQuery,
  ArticleListQueryQueryVariables,
  ArticleQueryQuery,
  ArticleQueryQueryVariables,
} from './generated-types';
export const ArticleQueryDocument = gql`
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
      where: {NOT: {annotationType: {in: ["Species", "Genus"]}}}
    ) {
      annotationIdentifier
      annotationType
      annotation
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root',
  })
  export class ArticleQueryGQL extends Apollo.Query<
    ArticleQueryQuery,
    ArticleQueryQueryVariables
  > {
    document = ArticleQueryDocument;
    override apollo = inject(Apollo.Apollo);
  }

export const ArticleListQueryDocument = gql`
    query ArticleListQuery($diseaseWhere: DiseaseWhere, $hasMentionInLimit: Int, $hasMentionInOffset: Int, $hasMentionInSort: [ArticleSort!], $articleWhere: ArticleWhere, $hasMentionInConnectionWhere: DiseaseHasMentionInConnectionWhere) {
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
    filteredCount: hasMentionInConnection(where: $hasMentionInConnectionWhere) {
      totalCount: aggregate {
        count {
          nodes
        }
      }
    }
  }
}
    `;

  @Injectable({
    providedIn: 'root',
  })
  export class ArticleListQueryGQL extends Apollo.Query<
    ArticleListQueryQuery,
    ArticleListQueryQueryVariables
  > {
    document = ArticleListQueryDocument;
    override apollo = inject(Apollo.Apollo);
  }
