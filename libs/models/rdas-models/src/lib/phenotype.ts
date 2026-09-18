import { Reference } from './reference';

export class Phenotype {
  hpoId!: string;
  hpoTerm!: string;

  constructor(obj: Partial<Phenotype> = {}) {
    Object.assign(this, obj);
  }
}

export class PhenotypeAssociation {
  evidence!: { code: string; value: string };
  hpoTermFrequency!: string;
  reference?: Reference[];
  _reference?: string[];
  phenotype!: Phenotype;
  frequencyRank = 0;
  _evidence?: string;

  constructor(obj: {
    phenotype?: Partial<Phenotype>;
    properties?: Partial<PhenotypeAssociation>;
  }) {
    Object.assign(this, obj.properties);

    if (obj.phenotype) {
      this.phenotype = new Phenotype(obj.phenotype);
    }
    if (obj.properties && obj.properties.hpoTermFrequency) {
      this.frequencyRank = FREQUENCYRANK.indexOf(
        obj.properties.hpoTermFrequency,
      );
    }

    if (obj.properties && obj.properties._reference) {
      this.reference = obj.properties._reference.map(
        (ref) => new Reference({ code: ref }),
      );
      delete this._reference;
    }

    if (obj.properties && obj.properties._evidence) {
      if (obj.properties._evidence.length) {
        this.evidence = EVIDENCE.filter(
          (e) => e.code == obj.properties?._evidence,
        )[0];
      }
      delete this._evidence;
    }
  }

  _toString() {
    return `${this.phenotype.hpoTerm}\t ${this.hpoTermFrequency}\t${[Object.values(this.evidence)].join(':')}\t${this.reference
      ?.map((ref) => ref._toString())
      .join('|')}`;
  }
}

const FREQUENCYRANK = [
  'Excluded',
  'Very rare',
  'Occasional',
  'Frequent',
  'Very frequent',
  'Obligate',
];

const EVIDENCE = [
  { code: 'TAS', value: 'Traceable Author Statement' },
  { code: 'IEA', value: 'Inferred from Electronic Annotation' },
  { code: 'PCS', value: 'Published Clinical Study' },
];
