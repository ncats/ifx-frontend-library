import { RampDataGeneric } from './_utils';

export class Reaction extends RampDataGeneric {
  reactionId!: string;
  label?: string;
  equation?: string;
  isTransport?: boolean;
  hasHumanProtein?: boolean;
  onlyHumanMets?: boolean;

  metHitCount = 0;
  metSourceId!: string;
  metName?: string;
  substrateProductFlag?: number;
  isCofactor?: boolean;
  htmlEquation?: string;
  direction?: string;

  constructor(obj: Partial<Reaction>) {
    super();
    Object.assign(this, obj);
    this.id = this.metSourceId;
  }
}

export class ReactionClass extends RampDataGeneric {
  classLevel!: number;
  ecNumber!: string;
  metCount!: number;
  proteinCount!: number;
  reactionCount!: number;
  rxnClass!: string;
  rxnClassHierarcy!: string;
  hierarchyArray!: string[];
  totalMetsInRxnClass!: number;
  totalProteinsInRxnClass!: number;
  totalRxnsInClass!: number;
  metCountAverage?: string;
  proteinCountAverage?: string;
  totalReactionAverage?: string;
  Metab_OR?: number;
  Prot_OR?: number;
  Pval_FDR?: number;
  Pval_Holm?: number;
  Pval_Metab?: number;
  Pval_Prot?: number;
  Pval_combined?: number;

  constructor(obj: Partial<ReactionClass>) {
    super();
    Object.assign(this, obj);

    this.id = this.ecNumber;

    if (obj['rxnClassHierarcy']) {
      const hierarchy = <string>obj['rxnClassHierarcy'];
      this.hierarchyArray = hierarchy.split(' | ') as string[];
    }
    if (obj['metCount'] && obj['totalMetsInRxnClass']) {
      this.metCountAverage = `${obj['metCount']?.toString()}/${obj[
        'totalMetsInRxnClass'
      ]?.toString()}`;
    }

    if (obj['proteinCount'] && obj['totalProteinsInRxnClass']) {
      this.proteinCountAverage = `${obj['proteinCount']?.toString()}/${obj[
        'totalProteinsInRxnClass'
      ]?.toString()}`;
    }

    if (obj['reactionCount'] && obj['totalRxnsInClass']) {
      this.totalReactionAverage = `${obj['reactionCount']?.toString()}/${obj[
        'totalRxnsInClass'
      ]?.toString()}`;
    }
  }
}

export class CommonAnalyte extends RampDataGeneric {
  inputAnalyte!: string;
  inputCommonName!: string;
  rxnPartnerCommonName!: string;
  rxnPartnerIds!: string[];
  rxnPartnerIdsString!: string;
  queryRelation!: string;
  source!: string;

  constructor(obj: { [key: string]: unknown }) {
    super();

    if (obj['input_analyte']) {
      this.id = <string>obj['input_analyte'];
      this.inputAnalyte = <string>obj['input_analyte'];
    }

    if (obj['query_relation']) {
      this.queryRelation = <string>obj['query_relation'];
    }

    if (obj['Source']) {
      this.source = <string>obj['Source'];
    }

    if (obj['input_common_name']) {
      this.inputCommonName = <string>obj['input_common_name'];
    }

    if (obj['rxn_partner_common_name']) {
      this.rxnPartnerCommonName = <string>obj['rxn_partner_common_name'];
    }

    if (obj['rxn_partner_ids']) {
      this.rxnPartnerIdsString = (<string>obj['rxn_partner_ids']).replace(
        /,/g,
        ', ',
      );
      this.rxnPartnerIds = this.rxnPartnerIdsString.split(',');
    }
  }
}
