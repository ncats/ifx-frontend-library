import { Disease } from './disease';
import { Agent, Organization } from './shared-models';
import { ClinicalTrial } from './clinical-trial';
import { Article } from './article';

export class CoreProject {
  coreProjectNumber!: string;
  totalCost!: number | string;
  subProjects?: Project[];
  subProjectsCount?: number;
  _subProjectsCount?: { totalCount: number };
  title?: string;
  organizations?: Organization[];
  patents?: Patent[];
  clinicalTrials?: ClinicalTrial[];
  diseasesStudied?: Disease[];
  publications?: Article[];

  constructor(obj: Partial<CoreProject> = {}) {
    Object.assign(this, obj);

    if (obj.subProjects) {
      this.subProjects = obj.subProjects.map((data) => new Project(data));
      this.title = this.subProjects[0].title;
    }

    if (obj.organizations) {
      this.organizations = obj.organizations.map(
        (data) => new Organization(data),
      );
    }
  }
}

export class Patent {
  title?: string;
  org_name?: string;
  id?: string;

  constructor(obj: Partial<Patent> = {}) {
    Object.assign(this, obj);
  }
}

export class Annotation {
  semanticTypesNames?: string[];
  semanticTypeNames?: string[];
  semanticTypes?: string[];
  umlsConcept?: string;
  umlsCui?: string;
  constructor(obj: Partial<Annotation> = {}) {
    Object.assign(this, obj);
  }
}

/*
export class ClinicalStudy {
  title?: string;
  status?: string;
  gov_id?: string;

  constructor(obj: Partial<ClinicalStudy> = {}) {
    Object.assign(this, obj);
  }
}
*/

export class Project {
  abstract?: string;
  activity?: string;
  applicationId?: string;
  applicationType?: string;
  cfdaCode?: string;
  coreProjectNumber!: string;
  dateCreatedRDAS?: string;
  foaNumber?: string;
  fullProjectNumber?: string;
  fundingMechanism?: string;
  fundingYear?: number;
  phr?: string;
  serialNumber?: string;
  studySection?: string;
  studySectionName?: string;
  supportYear?: string;
  terms?: string[];
  _terms?: string;
  title?: string;
  totalCost?: string;

  // fundedByAgents?: { name: string }[];
  // clinicalStudies?: ClinicalStudy[];
  // patents?: Patent[];
  annotations?: Annotation[];
  principalInvestigators?: Agent[];
  contacts?: Agent[];
  researchedDiseases?: Disease[];

  constructor(obj: Partial<Project> = {}) {
    Object.assign(this, obj);

    if (obj.annotations) {
      this.annotations = obj.annotations.map((data) => new Annotation(data));
    }

    if (obj.researchedDiseases) {
      this.researchedDiseases = obj.researchedDiseases.map(
        (data) => new Disease(data),
      );
    }

    if (obj._terms) {
      this.terms = obj._terms.split(';');
    }
    /*    if (obj.clinicalStudies) {
      this.clinicalStudies = obj.clinicalStudies.map(
        (data) => new ClinicalStudy(data),
      );
    }

    if (obj.patents) {
      this.patents = obj.patents.map((data) => new Patent(data));
    }*/

    if (obj.principalInvestigators) {
      this.principalInvestigators = obj.principalInvestigators.map(
        (data) => new Agent(data),
      );
    }

    if (obj.contacts) {
      this.contacts = obj.contacts.map((data) => new Agent(data));
    }

    if (obj.researchedDiseases) {
      this.researchedDiseases = obj.researchedDiseases.map(
        (data) => new Disease(data),
      );
    }
  }
}
