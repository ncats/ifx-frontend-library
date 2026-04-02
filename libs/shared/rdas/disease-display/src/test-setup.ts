import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';

import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { getTestBed } from '@angular/core/testing';

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
);

export const SUBSCRIPTIONLISTMOCK = {
  subscriptions: [
    {
      gardID: 'GARD:0002491',
      alerts: ['articles', 'grants', 'trials'],
      diseaseName: 'Glioblastoma',
    },
    {
      alerts: ['articles', 'grants', 'trials'],
      gardID: 'GARD:0020774',
      diseaseName: '16p13.11 microdeletion syndrome',
    },
    {
      gardID: 'GARD:0022513',
      diseaseName: 'Rare developmental defect during embryogenesis',
      alerts: ['articles', 'grants', 'trials'],
    },
    {
      gardID: 'GARD:0010525',
      diseaseName: '15q11.2 microdeletion syndrome',
      alerts: ['articles', 'grants', 'trials'],
    },
    {
      gardID: 'GARD:0017423',
      diseaseName: '15q overgrowth syndrome',
      alerts: ['articles', 'grants', 'trials'],
    },
    {
      gardID: 'GARD:0005679',
      alerts: ['articles', 'grants', 'trials'],
      diseaseName: '49, XXXXY syndrome',
    },
    {
      diseaseName: 'Precocious puberty',
      alerts: ['articles', 'grants', 'trials'],
      gardID: 'GARD:0007446',
    },
    {
      gardID: 'GARD:0005659',
      diseaseName: '17-beta hydroxysteroid dehydrogenase 3 deficiency',
      alerts: ['articles', 'grants', 'trials'],
    },
    {
      gardID: 'GARD:0001469',
      diseaseName: '17-alpha-hydroxylase deficiency',
      alerts: ['articles', 'grants', 'trials'],
    },
    {
      alerts: ['articles', 'trials', 'grants'],
      diseaseName: '48,XXYY syndrome',
      gardID: 'GARD:0005677',
    },
    {
      gardID: 'GARD:0011985',
      alerts: ['trials', 'grants', 'articles'],
      diseaseName: '48,XYYY',
    },
    {
      diseaseName: '14q24.1q24.3 microdeletion syndrome',
      alerts: ['articles', 'grants', 'trials'],
      gardID: 'GARD:0021706',
    },
    {
      gardID: 'GARD:0010935',
      alerts: ['trials'],
      diseaseName: '16q24.3 microdeletion syndrome',
    },
    {
      diseaseName: '14q32 duplication syndrome',
      alerts: ['trials'],
      gardID: 'GARD:0017890',
    },
  ],
};

export const DISEASELISTMOCK = {
  diseases: [
    {
      articleCount: 0,
      classificationLevel: 'Subtype of disorder',
      dataSource: 'Orphanet+OMIM',
      dataSourceId: 'OMIM:300062',
      diseaseOntology: ['112027'],
      disorderType: ['Etiological subtype'],
      name: 'Intellectual developmental disorder, x-linked 14',
      gardId: 'GARD:0008557',
      geneticAlliance: ['4664'],
      geneticsHomeReference: null,
      icd10: null,
      icd10cm: null,
      icd11: null,
      mesh: null,
      medra: null,
      omim: ['300062'],
      orphanet: null,
      snomed: null,
      synonyms: [],
      umls: ['C0796220'],
      epiArticles: [],
      nonEpiArticles: [],
      epiCount: 0,
      nonEpiCount: 0,
      projects: [],
      projectCount: 0,
      clinicalTrials: [],
      clinicalTrialCount: 0,
      geneAssociations: [
        {
          associationStatus: 'Unknown',
          associationType: 'The disease phenotype itself was mapped',
          reference: [
            {
              code: 'OMIM:300062',
              url: 'https://www.omim.org/entry/300062',
            },
          ],
          gene: {
            ensembl: null,
            geneSymbol: 'MRX14',
            geneIdentifier: 'GeneID:4378',
            geneSynonyms: ['XLID14'],
            geneTitle: 'Intellectual developmental disorder, X-linked 14',
            locus: 'Xp11.3-q13.3',
            omim: '300062',
            swissprot: null,
            reactome: null,
            __typename: 'Gene',
            iuphar: null,
          },
          __typename: 'AssociatedWithGeneProperties',
        },
      ],
      phenotypeAssociations: [
        {
          evidence: {
            code: 'IEA',
            value: 'Inferred from Electronic Annotation',
          },
          hpoFrequency: null,
          reference: [
            {
              code: 'OMIM:300062',
              url: 'https://www.omim.org/entry/300062',
            },
          ],
          phenotype: {
            hpoId: 'HP:0001999',
            hpoTerm: 'Abnormal facial shape',
            modifier: null,
            online: true,
            onset: null,
            sex: null,
            __typename: 'Phenotype',
          },
          frequencyRank: 0,
          __typename: 'HasPhenotypeProperties',
          status: false,
        },
        {
          evidence: {
            code: 'IEA',
            value: 'Inferred from Electronic Annotation',
          },
          hpoFrequency: null,
          reference: [
            {
              code: 'OMIM:300062',
              url: 'https://www.omim.org/entry/300062',
            },
          ],
          phenotype: {
            hpoId: 'HP:0000053',
            hpoTerm: 'Macroorchidism',
            modifier: null,
            online: true,
            onset: null,
            sex: null,
            __typename: 'Phenotype',
          },
          frequencyRank: 0,
          __typename: 'HasPhenotypeProperties',
          status: false,
        },
        {
          evidence: {
            code: 'IEA',
            value: 'Inferred from Electronic Annotation',
          },
          hpoFrequency: null,
          reference: [
            {
              code: 'OMIM:300062',
              url: 'https://www.omim.org/entry/300062',
            },
          ],
          phenotype: {
            hpoId: 'HP:0001250',
            hpoTerm: 'Seizure',
            modifier: null,
            online: true,
            onset: null,
            sex: null,
            __typename: 'Phenotype',
          },
          frequencyRank: 0,
          __typename: 'HasPhenotypeProperties',
          status: false,
        },
        {
          evidence: {
            code: 'IEA',
            value: 'Inferred from Electronic Annotation',
          },
          hpoFrequency: null,
          reference: [
            {
              code: 'OMIM:300062',
              url: 'https://www.omim.org/entry/300062',
            },
          ],
          phenotype: {
            hpoId: 'HP:0002342',
            hpoTerm: 'Intellectual disability, moderate',
            modifier: null,
            online: true,
            onset: null,
            sex: null,
            __typename: 'Phenotype',
          },
          frequencyRank: 0,
          __typename: 'HasPhenotypeProperties',
          status: false,
        },
        {
          evidence: {
            code: 'IEA',
            value: 'Inferred from Electronic Annotation',
          },
          hpoFrequency: null,
          reference: [
            {
              code: 'OMIM:300062',
              url: 'https://www.omim.org/entry/300062',
            },
          ],
          phenotype: {
            hpoId: 'HP:0002465',
            hpoTerm: 'Poor speech',
            modifier: null,
            online: true,
            onset: null,
            sex: null,
            __typename: 'Phenotype',
          },
          frequencyRank: 0,
          __typename: 'HasPhenotypeProperties',
          status: false,
        },
      ],
      geneCount: 1,
      phenotypeCount: 5,
      associatedWithGeneGenesAggregate: {
        count: 1,
      },
    },
  ],
};
