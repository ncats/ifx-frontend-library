
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
    providedIn: 'root'
  })
  export class ArticleQueryGQL extends Apollo.Query<ArticleQueryQuery, ArticleQueryQueryVariables> {
    document = ArticleQueryDocument;
    override apollo = inject(Apollo.Apollo);
  }

export const ArticleListQueryDocument = gql`
    query ArticleListQuery($diseaseWhere: DiseaseWhere, $hasPublicationLimit: Int, $hasPublicationInOffset: Int, $hasPublicationInSort: [ArticleSort!], $articleWhere: ArticleWhere, $hasPublicationConnectionWhere: DiseaseHasPublicationConnectionWhere) {
  diseases(where: $diseaseWhere) {
    allCount: countArticles
    countEpiArticles
    countNhsArticles
    gardId
    gardName
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
    filteredCount: hasPublicationConnection(where: $hasPublicationConnectionWhere) {
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
