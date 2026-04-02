import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  MatTab,
  MatTabContent,
  MatTabGroup,
  MatTabLabel,
} from '@angular/material/tabs';
import {
  DataMap,
  DataProperty,
  QueryResultsData,
  VisualizationMap,
} from 'utils-models';
import { PanelAccordionComponent } from 'panel-accordion';
import { CommonAnalyte, RampResponse, ReactionClass } from 'ramp';
import {
  GraphData,
  GraphLink,
  GraphNode,
  HierarchyNode,
  UpsetData,
  UpsetPlot,
} from 'utils-models';
import { RampCorePageComponent } from 'ramp-core-page';
import { GRAPH_LEGEND, RampGraphLegendComponent } from 'ramp-graph-legend';
import {
  CommonReactionAnalyteActions,
  RampSelectors,
  ReactionClassEnrichmentsActions,
  ReactionClassesFromAnalytesActions,
  ReactionsFromAnalytesActions,
} from 'ramp-store';
import {
  RampSunburstTooltipComponent,
  SUNBURST_TOOLTIP,
} from 'ramp-sunburst-tooltip';
import { SunburstChartService } from 'sunburst-chart';
import { ForceDirectedGraphService } from 'utils-force-directed-graph';

@Component({
  selector: 'lib-reactions-page',
  imports: [
    CommonModule,
    PanelAccordionComponent,
    MatTabGroup,
    MatTab,
    MatTabLabel,
    MatTabContent,
  ],
  providers: [
    {
      provide: SUNBURST_TOOLTIP,
      useValue: RampSunburstTooltipComponent,
    },
    {
      provide: GRAPH_LEGEND,
      useValue: RampGraphLegendComponent,
    },
  ],
  templateUrl: './reactions-page.component.html',
  styleUrl: './reactions-page.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ReactionsPageComponent
  extends RampCorePageComponent
  implements OnInit
{
  sunburstChartService = inject(SunburstChartService);
  forceDirectedGraphService = inject(ForceDirectedGraphService);
  _snackBar = inject(MatSnackBar);

  override dataColumns: DataProperty[] = [
    new DataProperty({
      label: 'Analyte Id',
      field: 'inputAnalyte',
      sortable: true,
    }),
    new DataProperty({
      label: 'Analyte',
      field: 'inputCommonName',
      sortable: true,
    }),
    new DataProperty({
      label: 'Relation',
      field: 'queryRelation',
      sortable: true,
    }),
    new DataProperty({
      label: 'Catalyzed By',
      field: 'rxnPartnerCommonName',
      sortable: true,
    }),
    /* new DataProperty({
      label: 'Catalyst IDs',
      field: 'rxnPartnerIdsString',
    }),*/
    new DataProperty({
      label: 'Source',
      field: 'source',
    }),
  ];
  reactionFromAnalyteColumns: DataProperty[] = [
    new DataProperty({
      label: 'Metabolite Id',
      field: 'metSourceId',
      sortable: true,
    }),
    new DataProperty({
      label: 'Metabolite Name',
      field: 'metName',
      sortable: true,
    }),
    new DataProperty({
      label: 'Reaction Id',
      field: 'reactionId',
      sortable: true,
    }),
    new DataProperty({
      label: 'Metabolite Count',
      field: 'metHitCount',
      sortable: true,
    }),
    new DataProperty({
      label: 'Label',
      field: 'label',
      sortable: true,
    }),
    new DataProperty({
      label: 'Direction',
      field: 'direction',
      sortable: true,
    }),
    new DataProperty({
      label: 'Cofactor',
      field: 'isCofactor',
      sortable: true,
    }),
    new DataProperty({
      label: 'Transport',
      field: 'isTransport',
      sortable: true,
    }),
  ];
  reactionClassColumns: DataProperty[] = [
    new DataProperty({
      label: 'Reaction Class',
      field: 'rxnClass',
      sortable: true,
    }),
    new DataProperty({
      label: 'EC Number',
      field: 'ecNumber',
      sortable: true,
    }),
    new DataProperty({
      label: 'Hierarchy',
      field: 'rxnClassHierarcy',
      sortable: true,
    }),
    new DataProperty({
      label: 'Metabolite Count',
      field: 'metCountAverage',
      sortable: false,
    }),
    new DataProperty({
      label: 'Protein Count',
      field: 'proteinCountAverage',
      sortable: false,
    }),
    new DataProperty({
      label: 'Total Reaction Count',
      field: 'totalReactionAverage',
      sortable: false,
    }),
  ];
  reactionClassEnrichmentColumns: DataProperty[] = [
    new DataProperty({
      label: 'Reaction Class',
      field: 'rxnClass',
      sortable: true,
    }),
    new DataProperty({
      label: 'EC Number',
      field: 'ecNumber',
      sortable: true,
    }),
    new DataProperty({
      label: 'FDR Pval',
      field: 'Pval_FDR',
      sortable: true,
      displayType: 'number',
    }),
    new DataProperty({
      label: 'Holm Pval',
      field: 'Pval_Holm',
      sortable: true,
      displayType: 'number',
    }),
    new DataProperty({
      label: 'Combined Pval',
      field: 'Pval_combined',
      sortable: true,
      displayType: 'number',
    }),
    new DataProperty({
      label: 'Metabolite Pval',
      field: 'Pval_Metab',
      sortable: true,
      displayType: 'number',
    }),
    new DataProperty({
      label: 'Metabolite Odds Ratio',
      field: 'Metab_OR',
      sortable: true,
      displayType: 'number',
    }),
    new DataProperty({
      label: 'Protein Pval',
      field: 'Pval_Prot',
      sortable: true,
      displayType: 'number',
    }),
    new DataProperty({
      label: 'Protein Odds Ratio',
      field: 'Prot_OR',
      sortable: true,
      displayType: 'number',
    }),
  ];

  hoveredNode = signal<ReactionClass | undefined>(undefined);
  textLabel = signal<string | undefined>(undefined);

  nodeShapes = {
    met: 'circle',
    protein: 'rect',
    gene: 'rect',
  };

  edgeColors = {
    hmdb: '#ca1f7c',
    rhea: '#cc5501',
    both: '#0e8080',
  };

  edgeTypes = {
    met2gene: 'Metabolite to Gene',
    gene2met: 'Gene to Metabolite',
    met2protein: 'Metabolite to Protein',
    protein2met: 'Protein to Metabolite',
  };

  reactionClasses = this.store.selectSignal(RampSelectors.getReactionClasses);
  commonReactions = this.store.selectSignal(RampSelectors.getCommonReactions);
  reactionsFromAnalytes = this.store.selectSignal(RampSelectors.getReactions);
  reactionClassEnrichment = this.store.selectSignal(
    RampSelectors.getReactionClassEnrichment,
  );

  override dataMap = computed(() => {
    const returnDataMap: Map<string, DataMap> = new Map<string, DataMap>();
    const field = <string>this.activeTab();
    let ret!: { [p: string]: Map<string, DataMap> };
    switch (field) {
      case 'reactions-from-analytes': {
        const reactionsFromAnalytesData = this.reactionsFromAnalytes()?.data;
        if (reactionsFromAnalytesData) {
          returnDataMap.set('Rhea Reactions from Analytes', {
            data: this.reactionsFromAnalytes()?.dataAsDataProperty,
            fields: this.reactionFromAnalyteColumns,
            dataframe: reactionsFromAnalytesData,
            fileName: 'fetchReactionsFromAnalytes-download.tsv',
            loaded: !!reactionsFromAnalytesData,
          } as DataMap);
        }
        break;
      }
      case 'reaction-classes-from-analytes': {
        const reactionClassesData = this.reactionClasses()?.dataAsDataProperty;
        if (reactionClassesData) {
          returnDataMap.set('Reaction Classes', {
            data: this.reactionClasses()?.dataAsDataProperty,
            fields: this.reactionClassColumns,
            dataframe: this.reactionClasses()?.data,
            fileName: 'fetchreactionClassesFromAnalytes-download.tsv',
            loaded: !!reactionClassesData,
          });
        }
        break;
      }
      case 'common-reaction-analytes': {
        const commonReactionsData = this.commonReactions()?.dataAsDataProperty;
        if (commonReactionsData) {
          returnDataMap.set('Common Reactions', {
            data: this.commonReactions()?.dataAsDataProperty,
            fields: this.dataColumns,
            dataframe: this.commonReactions()?.data,
            fileName: 'fetchcommonReactionsFromAnalytes-download.tsv',
            loaded: !!commonReactionsData,
          });
        }
        break;
      }
      case 'reaction-class-enrichment': {
        const reactionClassEnrichmentData =
          this.reactionClassEnrichment()?.dataAsDataProperty;
        if (reactionClassEnrichmentData) {
          returnDataMap.set('Reaction Class Enrichment', {
            data: this.reactionClassEnrichment()?.dataAsDataProperty,
            fields: this.reactionClassEnrichmentColumns,
            //  dataframe: this.reactionClassEnrichment()?.data,
            fileName: 'reactionClassEnrichment-download.tsv',
            loaded: !!reactionClassEnrichmentData,
          });
        }
        break;
      }
    }
    if (returnDataMap.size) {
      ret = { [field]: returnDataMap };
    }
    return ret;
  });

  override visualizationsMap = computed(() => {
    const visualizationMapComputed = new Map<string, VisualizationMap[]>();
    const field = <string>this.activeTab();
    switch (field) {
      case 'reactions-from-analytes': {
        const reactionsPlot = this.reactionsFromAnalytes()?.plot;
        if (reactionsPlot) {
          visualizationMapComputed.set('Reaction Type Overlap', [
            {
              type: 'upset',
              data: {
                plot: new UpsetPlot(this._mapToUpset(reactionsPlot)),
              } as GraphData,
            },
          ] as VisualizationMap[]);
        }
        break;
      }
      case 'reaction-classes-from-analytes': {
        const reactionClassHierarchyData = this.reactionClasses()?.data.filter(
          (c) => c.reactionCount > 0,
        );
        if (reactionClassHierarchyData) {
          const graphData: GraphData = {
            values: this._mapToHierarchy(reactionClassHierarchyData),
          } as GraphData;
          visualizationMapComputed.set('Reaction Classes', [
            { type: 'sunburst', data: graphData },
            { type: 'tree', data: graphData },
          ]);
        }
        break;
      }
      case 'common-reaction-analytes': {
        const commonReactionGraphData = this.commonReactions()?.data;
        if (commonReactionGraphData) {
          const commonReactionNetwork = {
            graph: this._mapToGraph(commonReactionGraphData),
          } as GraphData;
          visualizationMapComputed.set('Common Analyte Network', [
            { type: 'graph', data: commonReactionNetwork },
          ]);
        }
        break;
      }
    }

    if (visualizationMapComputed.size) {
      const field = <string>this.activeTab();
      return { [field]: visualizationMapComputed };
    } else return undefined;
  });

  override overviewMap = computed(() => {
    const field = <string>this.activeTab();
    let ret!: { [p: string]: QueryResultsData };
    switch (field) {
      case 'reactions-from-analytes': {
        if (this.reactionsFromAnalytes()?.data) {
          ret = {
            [field]: {
              matches: this.reactionsFromAnalytes()?.query?.matches,
              noMatches: this.reactionsFromAnalytes()?.query?.noMatches,
              count: this.reactionsFromAnalytes()?.data.length,
              inputLength: this.inputList.length,
              inputType: 'analytes',
              function: [this.reactionsFromAnalytes()?.query?.functionCall],
            } as QueryResultsData,
          };
        }
        break;
      }
      case 'reaction-classes-from-analytes': {
        if (this.reactionClasses()?.data) {
          ret = {
            [field]: {
              matches: this.reactionClasses()?.query?.matches,
              noMatches: this.reactionClasses()?.query?.noMatches,
              count: this.reactionClasses()?.data.length,
              inputLength: this.inputList.length,
              inputType: 'analytes',
              function: [this.reactionClasses()?.query?.functionCall],
            } as QueryResultsData,
          };
        }
        break;
      }
      case 'common-reaction-analytes': {
        if (this.commonReactions()?.data) {
          ret = {
            [field]: {
              matches: this.commonReactions()?.query?.matches,
              noMatches: this.commonReactions()?.query?.noMatches,
              count: this.commonReactions()?.data.length,
              inputLength: this.inputList.length,
              inputType: 'analytes',
              function: [this.commonReactions()?.query?.functionCall],
            } as QueryResultsData,
          };
        }
        break;
      }
    }
    return ret;
  });

  constructor() {
    super();
  }

  ngOnInit() {
    this.sunburstChartService.customComponent = SUNBURST_TOOLTIP;
    this.forceDirectedGraphService.customComponent = GRAPH_LEGEND;

    this.sunburstChartService.nodeHovered.subscribe((value) => {
      if (value) {
        const term = value.node.term;
        const reactionClasses =
          this.reactionClasses() as RampResponse<ReactionClass>;
        const node = reactionClasses.data.filter(
          (prop) => prop.rxnClass === term,
        )[0];
        this.hoveredNode.set(node);
        this.sunburstChartService.reactionNode.set(node);
      } else {
        //  this.hoveredNode.set(value);
      }
    });

    this.forceDirectedGraphService.nodeClicked.subscribe((res) => {
      const allData = this.commonReactions()?.dataAsDataProperty;
      if (allData && res) {
        const filteredData = allData?.filter(
          (commonAnalye) =>
            commonAnalye['inputAnalyte'].value === res?.id ||
            commonAnalye['rxnPartnerCommonName'].value === res?.id,
        );
        this.forceDirectedGraphService.inputData.set({
          data: filteredData,
          fields: this.dataColumns,
        });
      }
    });
  }

  override fetchData(
    formData: { [key: string]: unknown },
    origin: string,
  ): void {
    this.visualizationsMap();
    this.activeTab.set(origin);
    if (formData['analytes']) {
      this.inputList = this._parseInput(
        formData['analytes'] as string | string[],
      );
    }
    switch (origin) {
      case 'reactions-from-analytes': {
        this.store.dispatch(
          ReactionsFromAnalytesActions.fetchReactionsFromAnalytes({
            analytes: this.inputList,
          }),
        );
        break;
      }
      case 'reaction-classes-from-analytes': {
        this.store.dispatch(
          ReactionClassesFromAnalytesActions.fetchReactionClassesFromAnalytes({
            analytes: this.inputList,
          }),
        );
        break;
      }
      case 'common-reaction-analytes': {
        this.store.dispatch(
          CommonReactionAnalyteActions.fetchCommonReactionAnalytes({
            analytes: this.inputList,
          }),
        );
        break;
      }
      case 'reaction-class-enrichment': {
        this.store.dispatch(
          ReactionClassEnrichmentsActions.fetchReactionClassEnrichment({
            analytes: this.inputList,
          }),
        );
        break;
      }
    }
  }

  private _mapToHierarchy(classes: ReactionClass[]): HierarchyNode[] {
    let hierarchyArr: HierarchyNode[] = [];
    const sortedClasses: Map<number, HierarchyNode[]> = new Map<
      number,
      HierarchyNode[]
    >();

    classes.forEach((reactionClass) => {
      const level = sortedClasses.get(
        reactionClass.classLevel,
      ) as HierarchyNode[];
      const rxnClass = {
        term: reactionClass.rxnClass,
        count: reactionClass.reactionCount,
        color: this._mapColor(reactionClass),
        parent:
          reactionClass.hierarchyArray.length > 1
            ? reactionClass.hierarchyArray[reactionClass.classLevel - 2]
            : undefined,
      } as HierarchyNode;
      if (level) {
        level.push(rxnClass);
        sortedClasses.set(reactionClass.classLevel, level);
      } else {
        sortedClasses.set(reactionClass.classLevel, [rxnClass]);
      }
    });
    if ([...sortedClasses.keys()].length - 1 > 0) {
      [...sortedClasses.keys()].reverse().forEach((key) => {
        if (key - 1 > 0) {
          const bottom = sortedClasses.get(key) as HierarchyNode[];
          const next = sortedClasses.get(key - 1) as HierarchyNode[];
          const nextMap: Map<string, HierarchyNode> = new Map<
            string,
            HierarchyNode
          >();
          next.forEach((node) => {
            nextMap.set(<string>node.term, node as HierarchyNode);
          });
          const retMap = this._mapParent(nextMap, bottom);
          hierarchyArr = [...retMap.values()];
        }
      });
    }
    return hierarchyArr;
  }

  private _mapParent(map: Map<string, HierarchyNode>, nodes: HierarchyNode[]) {
    nodes.forEach((node) => {
      const parent = map.get(node.parent as string) as HierarchyNode;
      if (parent.children) {
        parent.children.push(node);
      } else {
        parent.children = [node];
      }
      map.set(parent.term, parent);
    });
    return map;
  }

  private _mapColor(node: ReactionClass) {
    const index = ((<unknown>node.ecNumber[0]) as number) - 1;
    const colors = [
      ['#6E899CCC'],
      ['#DC587DCC'],
      ['#BC7196CC'],
      ['#479B55CC'],
      ['#FE00CECC'],
      ['#B68E00CC'],
      ['#FC6955CC'],
    ];

    return colors[index][0];
  }

  private _mapToGraph(data: CommonAnalyte[]) {
    const nodeMap: Map<string, GraphNode> = new Map<string, GraphNode>();
    let nodes: GraphNode[] = [];
    const links: GraphLink[] = [];
    data.forEach((analyte) => {
      let sourceNode = nodeMap.get(analyte.inputCommonName);
      let targetNode = nodeMap.get(analyte.rxnPartnerCommonName);
      const types = analyte.queryRelation.split(`2`);
      if (!sourceNode) {
        sourceNode = new GraphNode({
          id: analyte.inputAnalyte,
          label: analyte.inputCommonName,
          color: '#000000',
          extraClass: 'inputNode',
          shape: this.nodeShapes[types[0] as keyof typeof this.nodeShapes],
        });
      } else {
        sourceNode.color = '#000000';
        sourceNode.extraClass = 'inputNode';
        sourceNode.shape =
          this.nodeShapes[types[0] as keyof typeof this.nodeShapes];
      }
      nodeMap.set(analyte.inputCommonName, sourceNode);
      if (!targetNode) {
        targetNode = new GraphNode({
          id: analyte.rxnPartnerCommonName,
          label: analyte.rxnPartnerCommonName,
          color: '#e6f1f9',
          shape: this.nodeShapes[types[1] as keyof typeof this.nodeShapes],
        });

        nodeMap.set(analyte.rxnPartnerCommonName, targetNode);
      }
      links.push(
        new GraphLink({
          source: sourceNode.id,
          target: targetNode.id,
          label: analyte.source,
          id: analyte.source,
          color:
            this.edgeColors[
              analyte.source.toLocaleLowerCase() as keyof typeof this.edgeColors
            ],
          type: this.edgeTypes[
            analyte.queryRelation as keyof typeof this.edgeTypes
          ],
        }),
      );
    });
    nodes = [...nodeMap.values()];
    return { nodes: nodes, links: links };
  }

  private _mapToUpset(
    data: { id: string; sets: string[]; size: number }[],
  ): UpsetData[] {
    const upsetMap = this._ArrayToUpsetMap(data);
    const upsetData = this._mapToUpsetData(upsetMap);
    const distinctUpsetData = this._upsetArrayToDistinctSetData(upsetData);
    return distinctUpsetData;
  }

  private _ArrayToUpsetMap(
    data: { id: string; sets: string[]; size: number }[],
  ) {
    const setsMap: Map<string, string[]> = new Map<string, string[]>();
    data.forEach((level) => {
      level.sets.forEach((set) => {
        const levelSet = setsMap.get(set);
        if (!levelSet) {
          setsMap.set(set, [level.id]);
        } else {
          levelSet.push(level.id);
          setsMap.set(set, [...new Set(levelSet)]);
        }
      });
    });
    return setsMap;
  }

  private _mapToUpsetData(upsetMap: Map<string, string[]>) {
    const retData: { id: string; sets: string[]; size: number }[] = [];

    [...upsetMap.entries()].forEach(([key, value]) => {
      retData.push({ id: key, sets: value, size: value.length });
    });
    return retData.sort((a, b) => b.size - a.size);
  }

  private _upsetArrayToDistinctSetData(
    upsetArray: { id: string; sets: string[]; size: number }[],
  ) {
    const distinctMap: Map<string, string[]> = new Map<string, string[]>();
    upsetArray.forEach((set) => {
      const setString = set.sets.join(', ');
      const levelSet = distinctMap.get(setString);
      if (!levelSet) {
        distinctMap.set(setString, [set.id]);
      } else {
        levelSet.push(set.id);
        distinctMap.set(setString, [...new Set(levelSet)]);
      }
    });

    const retData: UpsetData[] = [];

    [...distinctMap.entries()].forEach(([key, value]) => {
      retData.push(
        new UpsetData({ id: key, sets: key.split(', '), size: value.length }),
      );
    });
    return retData.sort((a, b) => b.size - a.size);
  }
}
