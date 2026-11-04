import { Reference } from './reference';

export class Gene {
  ensembl?: string;
  geneSymbol!: string;
  geneIdentifier!: string;
  geneSynonyms?: string;
  geneTitle!: string;
  locus!: string;
  omim?: string;
  swissprot?: string;
  reactome?: string;

  constructor(obj: Partial<Gene> = {}) {
    Object.assign(this, obj);
  }
}

export class GeneAssociation {
  associationStatus!: string;
  associationType!: string;
  references?: Reference[];
  onset?: string;
  gene!: Gene;
  _references?: string[];

  constructor(obj: {
    gene?: Partial<Gene>;
    properties?: Partial<GeneAssociation>;
  }) {
    Object.assign(this, obj.properties);

    if (obj.gene) {
      this.gene = new Gene(obj.gene);
    }

    if (obj.properties && obj.properties._references) {
      this.references = obj.properties._references
        .filter((ref) => ref.length)
        .map((ref) => new Reference({ code: ref }));
      delete this._references;
    }
  }

  _toString() {
    return `${this.gene.geneSymbol}\t ${this.associationStatus}\t${
      this.associationType
    }\t${this.references?.map((ref) => ref._toString()).join('|')}`;
  }
}
