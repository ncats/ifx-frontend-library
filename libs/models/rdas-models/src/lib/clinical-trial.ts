import { Disease } from './disease';
import { Location } from './shared-models';

export class ClinicalTrial {
  acronym?: string;
  briefSummary?: string;
  briefTitle?: string;
  completionDate?: string;
  completionDateType?: string;
  lastKnownStatus?: string;
  lastUpdatePostDate?: string;
  lastUpdatePostDateType?: string;
  lastUpdateSubmitDate?: string;
  nctId!: string;
  NCTIdAlias?: string[];
  officialTitle?: string;
  overallStatus?: string;
  phase?: string;
  primaryCompletionDate?: string;
  primaryCompletionDateType?: string;
  resultsFirstPostDate?: string;
  resultsFirstPostDateType?: string;
  resultsFirstPostedQCCommentsDate?: string;
  resultsFirstPostedQCCommentsDateType?: string;
  secondaryId?: string[];
  secondaryIdDomain?: string[];
  secondaryIdLink?: string[];
  secondaryIdType?: string[];
  seeAlsoLinkLabel?: string[];
  seeAlsoLinkURL?: string[];
  startDate?: string;
  startDateType?: string;
  studyFirstPostDate?: string;
  studyFirstPostDateType?: string;
  studyType?: string;
  conditions?: Condition[];
  interventions?: Intervention[];
  locations?: Location[];
  participantInfo?: ParticipantInfo[];
  references?: Reference[];
  studyDesigns?: StudyDesign[];
  studyDiseases?: Disease[];

  constructor(obj: Partial<ClinicalTrial> = {}) {
    Object.assign(this, obj);
    if (obj.conditions) {
      this.conditions = obj.conditions.map((data) => new Condition(data));
    }

    if (obj.interventions) {
      this.interventions = obj.interventions.map(
        (data) => new Intervention(data),
      );
    }

    if (obj.locations) {
      this.locations = obj.locations.map((data) => new Location(data));
    }

    if (obj.participantInfo) {
      this.participantInfo = obj.participantInfo.map(
        (data) => new ParticipantInfo(data),
      );
    }

    if (obj.references) {
      this.references = obj.references.map((data) => new Reference(data));
    }

    if (obj.studyDesigns) {
      this.studyDesigns = obj.studyDesigns.map((data) => new StudyDesign(data));
    }

    if (obj.studyDiseases) {
      this.studyDiseases = obj.studyDiseases.map((data) => new Disease(data));
    }
  }
}

export class Intervention {
  interventionName?: string;
  interventionType?: string;
  interventionDescription?: string;

  constructor(obj: Partial<Intervention> = {}) {
    Object.assign(this, obj);
  }
}

export class ParticipantInfo {
  eligibilityCriteria?: string;
  eligibilityCriteriaList?: string[];

  maximumAge?: string;
  healthyVolunteers?: string;
  stdAges?: string;
  minimumAge?: string;
  enrollmentCount?: string;
  nctId?: string;
  enrollmentType?: string;

  constructor(obj: Partial<ParticipantInfo> = {}) {
    Object.assign(this, obj);
    if (obj.eligibilityCriteria) {
      this.eligibilityCriteriaList = obj.eligibilityCriteria.split('\n');
    }
  }
}

export class Condition {
  condition?: string;
  mappedDiseases?: Disease[];
  constructor(obj: Partial<Condition> = {}) {
    Object.assign(this, obj);

    if (obj.mappedDiseases) {
      this.mappedDiseases = obj.mappedDiseases.map(
        (disease) => new Disease(disease),
      );
    }
  }
}

export class Reference {
  citation?: string;
  referencePMID?: string;
  referenceType?: string;
  constructor(obj: Partial<Reference> = {}) {
    Object.assign(this, obj);
  }
}

export class StudyDesign {
  designAllocation?: string;
  designInterventionModel?: string;
  designInterventionModelDescription?: string;
  designMasking?: string;
  designObservationalModel?: string;
  designPrimaryPurpose?: string;
  designTimePerspective?: string;
  detailedDescription?: string;
  primaryOutcomeDescription?: string;
  primaryOutcomeMeasure?: string;
  primaryOutcomeTimeFrame?: string;

  constructor(obj: Partial<StudyDesign> = {}) {
    Object.assign(this, obj);
  }
}
