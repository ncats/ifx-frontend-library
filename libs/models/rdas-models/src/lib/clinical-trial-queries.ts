import { gql } from 'apollo-angular';

export const FETCHTRIALDETAILS = gql`
  query ClinicalTrials {
    clinicalTrials {
      briefTitle
    }
  }
`;

export const FETCHTRIALSQUERY = gql`
  query ClinicalTrialsList {
    clinicalTrials {
      briefTitle
    }
  }
`;

/*
export const FETCHTRIALSVARIABLES = {}
export const TRIALDETAILSVARIABLES = {}
export const TRIALSTATUSFILTERS = {}
export const TRIALTYPEFILTERS = {}
export const TRIALPHASEFILTERS = {}
export const ALLTRIALFILTERS = {}
 */
