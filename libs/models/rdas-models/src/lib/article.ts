import { Author } from './author';
import { Disease } from './disease';

export class Article {
  DateCreatedRDAS!: string;
  abstractText!: string;
  affiliation!: string;
  citedByCount!: number;
  doi!: string;
  firstPublicationDate!: string;
  isEpi?: boolean;
  pubType?: string[];
  pubmed_id!: string;
  title!: string;
  authorsWrote?: Author[];
  diseases!: Disease[];
  journals!: JournalVolume[];
  keywords?: { keyword: string }[];
  meshTerms?: MeshTerm[];
  annotations?: PubtatorAnnotation[];
  epidemiologies?: Epidemiology[];
  sources!: Source[];
  // substances?: { name: string }[];

  constructor(obj: Partial<Article> = {}) {
    Object.assign(this, obj);

    if (obj.authorsWrote) {
      this.authorsWrote = obj.authorsWrote.map(
        (author: Partial<Author> = {}) => new Author(author),
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
          a.descriptorName.localeCompare(b.descriptorName),
        );
    }

    if (obj.annotations) {
      this.annotations = obj.annotations
        .filter(
          (a: Partial<PubtatorAnnotation>) =>
            !(a.infons_type === 'Species' || a.infons_type === 'Genus'),
        )
        .map(
          (annotation: Partial<PubtatorAnnotation> = {}) =>
            new PubtatorAnnotation(annotation),
        );
    }

    if (obj.diseases) {
      this.diseases = obj.diseases
        .map((disease: Partial<Disease> = {}) => new Disease(disease))
        .sort((a: Disease, b: Disease) => a.gardName.localeCompare(b.gardName));
    }

    if (obj.sources) {
      this.sources = obj.sources.map(
        (source: Partial<Source> = {}) => new Source(source),
      );
    }

    if (obj.epidemiologies) {
      this.epidemiologies = obj.epidemiologies.map(
        (epi: Partial<Epidemiology> = {}) => new Epidemiology(epi),
      );
    }
  }
}

export class JournalVolume {
  dateOfPublication!: string;
  printPublicationDate!: string;
  volume!: string;
  _title!: { title: string }[];
  title!: string;

  constructor(obj: Partial<JournalVolume>) {
    Object.assign(this, obj);

    if (obj._title) {
      this.title = obj._title[0].title;
    }
  }
}

export class MeshTerm {
  descriptorName!: string;
  majorTopic_YN?: string;
  abbreviation?: string;
  qualifierName?: string;

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
  infons_identifier!: string;
  infons_type!: string;
  type!: string;
  text!: string[];

  constructor(obj: Partial<PubtatorAnnotation>) {
    Object.assign(this, obj);
    if (obj.text) {
      if (!Array.isArray(obj.text)) {
        this.text = [obj.text];
      } else {
        this.text = [];
        obj.text.forEach((textVal: string) => {
          const textArr = textVal.split(',');
          this.text.push(...textArr);
        });
      }
    }
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
  epidemiology_rate?: string[];
  epidemiology_type?: string[];
  ethnicity?: string[];
  location?: string[];
  sex?: string[];

  constructor(obj: Partial<Epidemiology>) {
    Object.assign(this, obj);
  }
}
