import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';

import {
  BrowserTestingModule,
  platformBrowserTesting,
} from '@angular/platform-browser/testing';
import { CoreProject } from 'rdas-models';

import { getTestBed } from '@angular/core/testing';

getTestBed().initTestEnvironment(
  BrowserTestingModule,
  platformBrowserTesting(),
);

export const PROJECTMOCK: CoreProject = new CoreProject({
  core_project_num: 'K01OH000018',
  rd_total_cost: '66528',
  fundedByAgents: [
    {
      name: 'National Institute for Occupational Safety and Health',
    },
  ],
  clinicalStudies: [],
  patents: [],
  projects: [
    {
      abstract:
        'A population-based series of silicotic subjects was identified in an epidemiologic study of respiratory disease among residents of Leadville, Colorado, in 1983.  Aims of the proposed study are to compare immunologic findings in silicotic subjects, identified in the epidemiologic study, with those in community controls and in nonsilicotic miners having substantial past silica exposure.  Long-term objectives are to identify immunologic factors which may predispose dust-exposed individuals to silicosis and which may predispose silicotic subjects to mycobacterial infections. Further understanding of the immunology of silicosis may suggest primary and secondary prevention measures which can be confirmed in future prospective studies.  Silicotics and two appropriate comparison subjects matched for age within five years will be interviewed by a local public health nurse; will receive intradermal tests for delayed hypersensitivity to PPD, tetanus toxoid, and candida antigens; and will give a blood specimen for complete blood and differential counts, immunoglobulins, complement, immune complexes, autoantibodies, and separation of mononuclear cells.  Detailed immunologic studies on peripheral blood mononuclear cells include lymphocyte proliferation to three mitogen (phytohemagglutinin, concanavalin A, and pokeweed mitogen) and to three antigens (purified protein derivative, candida, and tetanus toxoid); analysis of T-cell subsets with monoclonal antibodies to helper cells, suppressor cells, and natural killer cell phenotypes; lymphokine production, assayed for interleukin-2 and interferon; and evaluation of natural killer cell activity.  Preliminary data suggest that silicotic subjects, in comparison to their wives, have decreased percentages of helper T-cells and increased percentages of lymphocytes of the natural killer cell phenotype. Immunologic differences found for silicotic subjects in comparison to dust exposed and unexposed controls will be related to profusion of small and large opacities on chest radiographs and to the presence of mycobacterial infection due to M. tuberculosis or atypical mycobacteria.  Silicotics wishing to have bronchoalveolar lavage on all independent study will have constituents of lavage fluid compared to T-cell phenotypes in peripheral blood. ',
      application_id: '3068880',
      application_type: '5',
      phr: null,
      funding_year: '1987',
      subproject_id: null,
      total_cost: '34128',
      terms: [
        'respiratory disorder epidemiology',
        'pneumoconiosis',
        'disease /disorder proneness /risk',
        'immunopathology',
        'dust',
        'bacterial antigens',
        'interleukin 2',
        'lymphokines',
        'helper T lymphocyte',
        'Mycobacterium',
        'Mycobacterium tuberculosis',
        'suppressor T lymphocyte',
        'delayed hypersensitivity',
        'interferons',
        'tetanus toxoid',
        'minings',
        'occupational disease /disorder',
        'immune complex diseases',
      ],
      title: 'SILICOSIS:  IMMUNOLOGICAL ABNORMALITIES',
      annotations: [
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Biologically Active Substance',
          ],
          umls_concept: 'Concanavalin A',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
            'Indicator, Reagent, or Diagnostic Aid',
          ],
          umls_concept: 'purified protein derivative of tuberculin',
        },
        {
          semantic_types_names: ['Disease or Syndrome'],
          umls_concept: 'Respiration Disorders',
        },
        {
          semantic_types_names: ['Disease or Syndrome'],
          umls_concept: 'Mycobacterium Infections',
        },
        {
          semantic_types_names: ['Disease or Syndrome'],
          umls_concept: 'Tetanus',
        },
        {
          semantic_types_names: ['Disease or Syndrome'],
          umls_concept: 'Tuberculosis',
        },
        {
          semantic_types_names: ['Disease or Syndrome'],
          umls_concept: 'Silicosis',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Biologically Active Substance',
          ],
          umls_concept: 'Growth Factor',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Monoclonal Antibodies',
        },
        {
          semantic_types_names: ['Therapeutic or Preventive Procedure'],
          umls_concept: 'Bronchoalveolar Lavage',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
            'Indicator, Reagent, or Diagnostic Aid',
          ],
          umls_concept: 'Phytohemagglutinins',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Immune complex',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Pokeweed Mitogens',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Interferons',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Lymphokines',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Interleukin-2',
        },
        {
          semantic_types_names: ['Bacterium'],
          umls_concept: 'Genus Mycobacterium',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Autoantibodies',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Immunoglobulins',
        },
        {
          semantic_types_names: ['Fungus'],
          umls_concept: 'Candida (fungus)',
        },
      ],
      principalInvestigators: [
        {
          org_name: 'NATIONAL JEWISH HEALTH',
          org_state: 'CO',
          pi_name: '',
        },
        {
          org_name: 'NATIONAL JEWISH HEALTH',
          org_state: 'CO',
          pi_name: 'KREISS, KATHLEEN',
        },
      ],
      researchedDiseases: [
        {
          articleCount: 0,
          name: 'Tetanus',
          gardId: 'GARD:0005144',
          epiCount: 0,
          nonEpiCount: 0,
          projectCount: 0,
          clinicalTrialCount: 0,
          geneCount: 0,
          phenotypeCount: 0,
        },
        {
          articleCount: 0,
          name: 'Tuberculosis',
          gardId: 'GARD:0007827',
          epiCount: 0,
          nonEpiCount: 0,
          projectCount: 0,
          clinicalTrialCount: 0,
          geneCount: 0,
          phenotypeCount: 0,
        },
      ],
    },
    {
      abstract:
        'A population-based series of silicotic subjects was identified in an epidemiologic study of respiratory disease among residents of Leadville, Colorado, in 1983.  Aims of the proposed study are to compare immunologic findings in silicotic subjects, identified in the epidemiologic study, with those in community controls and in nonsilicotic miners having substantial past silica exposure.  Long-term objectives are to identify immunologic factors which may predispose dust-exposed individuals to silicosis and which may predispose silicotic subjects to mycobacterial infections. Further understanding of the immunology of silicosis may suggest primary and secondary prevention measures which can be confirmed in future prospective studies.  Silicotics and two appropriate comparison subjects matched for age within five years will be interviewed by a local public health nurse; will receive intradermal tests for delayed hypersensitivity to PPD, tetanus toxoid, and candida antigens; and will give a blood specimen for complete blood and differential counts, immunoglobulins, complement, immune complexes, autoantibodies, and separation of mononuclear cells.  Detailed immunologic studies on peripheral blood mononuclear cells include lymphocyte proliferation to three mitogen (phytohemagglutinin, concanavalin A, and pokeweed mitogen) and to three antigens (purified protein derivative, candida, and tetanus toxoid); analysis of T-cell subsets with monoclonal antibodies to helper cells, suppressor cells, and natural killer cell phenotypes; lymphokine production, assayed for interleukin-2 and interferon; and evaluation of natural killer cell activity.  Preliminary data suggest that silicotic subjects, in comparison to their wives, have decreased percentages of helper T-cells and increased percentages of lymphocytes of the natural killer cell phenotype. Immunologic differences found for silicotic subjects in comparison to dust exposed and unexposed controls will be related to profusion of small and large opacities on chest radiographs and to the presence of mycobacterial infection due to M. tuberculosis or atypical mycobacteria.  Silicotics wishing to have bronchoalveolar lavage on all independent study will have constituents of lavage fluid compared to T-cell phenotypes in peripheral blood. ',
      application_id: '3068879',
      application_type: '5',
      phr: null,
      funding_year: '1985',
      subproject_id: null,
      total_cost: '32400',
      terms: [
        'respiratory disorder epidemiology',
        'pneumoconiosis',
        'disease /disorder proneness /risk',
        'immunopathology',
        'dust',
        'bacterial antigens',
        'interleukin 2',
        'lymphokines',
        'helper T lymphocyte',
        'Mycobacterium',
        'Mycobacterium tuberculosis',
        'suppressor T lymphocyte',
        'delayed hypersensitivity',
        'interferons',
        'tetanus toxoid',
        'minings',
        'occupational disease /disorder',
        'immune complex diseases',
      ],
      title: 'SILICOSIS:  IMMUNOLOGICAL ABNORMALITIES',
      annotations: [
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Interferons',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
            'Indicator, Reagent, or Diagnostic Aid',
          ],
          umls_concept: 'Phytohemagglutinins',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Lymphokines',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Monoclonal Antibodies',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Immune complex',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Interleukin-2',
        },
        {
          semantic_types_names: ['Bacterium'],
          umls_concept: 'Genus Mycobacterium',
        },
        {
          semantic_types_names: ['Therapeutic or Preventive Procedure'],
          umls_concept: 'Bronchoalveolar Lavage',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Biologically Active Substance',
          ],
          umls_concept: 'Concanavalin A',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Pokeweed Mitogens',
        },
        {
          semantic_types_names: ['Disease or Syndrome'],
          umls_concept: 'Respiration Disorders',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Biologically Active Substance',
          ],
          umls_concept: 'Growth Factor',
        },
        {
          semantic_types_names: ['Disease or Syndrome'],
          umls_concept: 'Mycobacterium Infections',
        },
        {
          semantic_types_names: ['Disease or Syndrome'],
          umls_concept: 'Tetanus',
        },
        {
          semantic_types_names: ['Disease or Syndrome'],
          umls_concept: 'Tuberculosis',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
            'Indicator, Reagent, or Diagnostic Aid',
          ],
          umls_concept: 'purified protein derivative of tuberculin',
        },
        {
          semantic_types_names: ['Fungus'],
          umls_concept: 'Candida (fungus)',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Immunoglobulins',
        },
        {
          semantic_types_names: [
            'Amino Acid, Peptide, or Protein',
            'Immunologic Factor',
          ],
          umls_concept: 'Autoantibodies',
        },
        {
          semantic_types_names: ['Disease or Syndrome'],
          umls_concept: 'Silicosis',
        },
      ],
      principalInvestigators: [
        {
          org_name: 'NATIONAL JEWISH HEALTH',
          org_state: 'CO',
          pi_name: '',
        },
        {
          org_name: 'NATIONAL JEWISH HEALTH',
          org_state: 'CO',
          pi_name: 'KREISS, KATHLEEN',
        },
      ],
      researchedDiseases: [
        {
          articleCount: 0,
          name: 'Tetanus',
          gardId: 'GARD:0005144',
          epiCount: 0,
          nonEpiCount: 0,
          projectCount: 0,
          clinicalTrialCount: 0,
          geneCount: 0,
          phenotypeCount: 0,
        },
        {
          articleCount: 0,
          name: 'Tuberculosis',
          gardId: 'GARD:0007827',
          epiCount: 0,
          nonEpiCount: 0,
          projectCount: 0,
          clinicalTrialCount: 0,
          geneCount: 0,
          phenotypeCount: 0,
        },
      ],
    },
  ],
} as unknown as Partial<CoreProject>);
