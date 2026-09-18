import { Disease } from './disease';
import { Agent } from './shared-models';

export class Article {
  abstractText!: string;
  citationCount!: number;
  dateCreatedRDAS!: string;
  doi!: string;
  firstPublicationDate!: string;
  hasPDF?: boolean;
  inEPMC?: boolean;
  inPMC?: boolean;
  isEpidemiologicalStudy?: boolean;
  isGeneReview?: boolean;
  isNaturalHistoryStudy?: boolean;
  isOpenAccess?: boolean;
  issue?: number;
  publicationYear?: number;
  pubmedId!: string;
  pubType?: string[];
  title!: string;
  volume!: string;

  journals!: JournalVolume[];
  diseases!: Disease[];
  authors?: Agent[];
  keywords?: { keyword: string }[];
  meshTerms?: MeshTerm[];
  annotations?: PubtatorAnnotation[];
  epidemiologies?: Epidemiology[];
  // sources!: Source[];
  substances?: { name: string }[];

  constructor(obj: Partial<Article> = {}) {
    Object.assign(this, obj);

    if (obj.pubType) {
      this.pubType = JSON.parse((<unknown>obj.pubType) as string);
    }

    if (obj.authors) {
      this.authors = obj.authors.map(
        (author: Partial<Agent> = {}) => new Agent(author),
      );
    }

    if (obj.journals) {
      this.journals = obj.journals.map(
        (journal: Partial<JournalVolume> = {}) => new JournalVolume(journal),
      );
    }

    if (obj.meshTerms) {
      this.meshTerms = obj.meshTerms
        .map((mesh: Partial<MeshTerm> = {}) => new MeshTerm(mesh))
        .sort((a: MeshTerm, b: MeshTerm) =>
          a.meshTerm.localeCompare(b.meshTerm),
        );
    }

    if (obj.annotations) {
      this.annotations = obj.annotations.map(
        (annotation: Partial<PubtatorAnnotation> = {}) =>
          new PubtatorAnnotation(annotation),
      );
    }

    if (obj.diseases) {
      this.diseases = obj.diseases
        .map((disease: Partial<Disease> = {}) => new Disease(disease))
        .sort((a: Disease, b: Disease) => a.gardName.localeCompare(b.gardName));
    }

    /*    if (obj.sources) {
      this.sources = obj.sources.map(
        (source: Partial<Source> = {}) => new Source(source),
      );
    }*/

    if (obj.epidemiologies) {
      this.epidemiologies = obj.epidemiologies.map(
        (epi: Partial<Epidemiology> = {}) => new Epidemiology(epi),
      );
    }
  }
}

export class JournalVolume {
  // dateOfPublication!: string;
  // printPublicationDate!: string;
  ///  volume!: string;
  // _title!: { title: string }[];
  title!: string;

  constructor(obj: Partial<JournalVolume>) {
    Object.assign(this, obj);
    /*
    if (obj._title) {
      this.title = obj._title[0].title;
    }*/
  }
}

export class MeshTerm {
  descriptorName!: string;
  majorTopic_YN?: string;
  abbreviation?: string;
  qualifierName?: string;
  meshTerm!: string;

  _qualifier!: {
    abbreviation?: string;
    qualifierName?: string;
  };

  constructor(obj: Partial<MeshTerm>) {
    Object.assign(this, obj);
    if (obj._qualifier && obj._qualifier.abbreviation) {
      this.abbreviation = obj._qualifier.abbreviation;
    }

    if (obj._qualifier && obj._qualifier.qualifierName) {
      this.qualifierName = obj._qualifier.qualifierName;
    }
  }
}

export class PubtatorAnnotation {
  annotationIdentifier!: string;
  annotationType!: string;
  annotation!: string[];

  constructor(obj: Partial<PubtatorAnnotation>) {
    Object.assign(this, obj);
    /* if (obj.text) {
      if (!Array.isArray(obj.text)) {
        this.text = [obj.text];
      } else {
        this.text = [];
        obj.text.forEach((textVal: string) => {
          const textArr = textVal.split(',');
          this.text.push(...textArr);
        });
      }
    }*/
  }
}

export class Source {
  availability!: string;
  availabilityCode!: string;
  documentStyle!: string;
  site!: string;
  url!: string;

  constructor(obj: Partial<Source>) {
    Object.assign(this, obj);
  }
}

export class Epidemiology {
  epidemiologyRate?: string[];
  epidemiologyType?: string[];
  ethnicity?: string[];
  studyLocation?: string[];
  studyDate?: string[];
  sex?: string[];

  constructor(obj: Partial<Epidemiology>) {
    Object.assign(this, obj);
  }
}
