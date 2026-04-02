import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTab, MatTabGroup, MatTabLabel } from '@angular/material/tabs';
import {
  DataMap,
  DataProperty,
  QueryResultsData,
  VisualizationMap,
} from 'utils-models';
import { DialogModalComponent } from 'dialog-modal';
import { PanelAccordionComponent } from 'panel-accordion';
import { RampCorePageComponent } from 'ramp-core-page';
import {
  AnalyteFromPathwayActions,
  PathwayEnrichmentsActions,
  RampSelectors,
} from 'ramp-store';

@Component({
  selector: 'lib-biochemical-pathways-page',
  imports: [
    CommonModule,
    PanelAccordionComponent,
    MatTabGroup,
    MatTab,
    MatTabLabel,
  ],
  templateUrl: './biochemical-pathways-page.component.html',
  styleUrl: './biochemical-pathways-page.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BiochemicalPathwaysPageComponent
  extends RampCorePageComponent
  implements OnInit
{
  analyteColumns: DataProperty[] = [
    new DataProperty({
      label: 'Pathway Name',
      field: 'pathwayName',
      sortable: true,
    }),
    new DataProperty({
      label: 'Pathway Type',
      field: 'pathwayType',
      sortable: true,
    }),
    new DataProperty({
      label: 'Analyte Name',
      field: 'analyteName',
      sortable: true,
    }),
    new DataProperty({
      label: 'Source Analyte ID',
      field: 'sourceAnalyteIDs',
      sortable: true,
    }),
    new DataProperty({
      label: 'Analyte Class',
      field: 'geneOrCompound',
      sortable: true,
    }),
    new DataProperty({
      label: 'Pathway ID',
      sortable: true,
      field: 'pathwayId',
    }),
  ];
  pathwayColumns: DataProperty[] = [
    new DataProperty({
      label: 'Input ID',
      field: 'inputId',
      sortable: true,
    }),
    new DataProperty({
      label: 'Pathway',
      field: 'pathwayName',
      sortable: true,
    }),
    new DataProperty({
      label: 'Pathway Source',
      field: 'pathwaySource',
      sortable: true,
    }),
    new DataProperty({
      label: 'Pathway Source ID',
      field: 'pathwayId',
      sortable: true,
    }),
    new DataProperty({
      label: 'Analyte Name',
      field: 'commonName',
      sortable: true,
    }),
  ];
  enrichmentColumns: {
    [key: string]: DataProperty[];
  } = {
    metabolites: [
      new DataProperty({
        label: 'Pathway Name',
        field: 'pathwayName',
        sortable: true,
      }),
      new DataProperty({
        label: 'Pathway Source',
        field: 'pathwaySource',
        sortable: true,
      }),
      new DataProperty({
        label: 'Pathway Id',
        field: 'pathwayId',
        sortable: true,
      }),
      /*      new DataProperty({
        label: 'Metabolite Count',
        field: 'metabCount',
      }),*/
      new DataProperty({
        label: 'Metabolite Count',
        field: 'pathCount',
      }),
      new DataProperty({
        label: 'Metabolites',
        field: 'analytes',
        sortable: true,
      }),
      new DataProperty({
        label: 'Combined Pval',
        field: 'Pval',
        sortable: true,
      }),
      new DataProperty({
        label: 'Combined FDR Pval',
        field: 'Pval_FDR',
        sortable: true,
      }),
      new DataProperty({
        label: 'Combined Holm Pval',
        field: 'Pval_Holm',
        sortable: true,
      }),
      new DataProperty({
        label: 'Cluster Assignment',
        field: 'cluster_assignment',
        sortable: true,
        sorted: 'asc',
      }),
    ],
    genes: [
      new DataProperty({
        label: 'Pathway Name',
        field: 'pathwayName',
        sortable: true,
      }),
      new DataProperty({
        label: 'Pathway Source',
        field: 'pathwaySource',
        sortable: true,
      }),
      new DataProperty({
        label: 'Pathway Id',
        field: 'pathwayId',
        sortable: true,
      }),
      /*     new DataProperty({
        label: 'Gene Count',
        field: 'geneCount',
      }),*/
      new DataProperty({
        label: 'Gene Count',
        field: 'pathCount',
      }),
      new DataProperty({
        label: 'Genes',
        field: 'analytes',
        sortable: true,
      }),
      new DataProperty({
        label: 'Combined Pval',
        field: 'Pval',
        sortable: true,
      }),
      new DataProperty({
        label: 'Combined FDR Pval',
        field: 'Pval_FDR',
        sortable: true,
      }),
      new DataProperty({
        label: 'Combined Holm Pval',
        field: 'Pval_Holm',
        sortable: true,
      }),
      new DataProperty({
        label: 'Cluster Assignment',
        field: 'cluster_assignment',
        sortable: true,
        sorted: 'asc',
      }),
    ],
    both: [
      new DataProperty({
        label: 'Pathway Name',
        field: 'pathwayName',
        sortable: true,
      }),
      new DataProperty({
        label: 'Pathway Source',
        field: 'pathwaySource',
        sortable: true,
      }),
      new DataProperty({
        label: 'Pathway Id',
        field: 'pathwayId',
        sortable: true,
      }),
      new DataProperty({
        label: 'Metabolite Count',
        field: 'metabCount',
      }),
      new DataProperty({
        label: 'Gene Count',
        field: 'geneCount',
      }),
      /* new DataProperty({
        label: 'Path Count',
        field: 'pathCount',
      }),*/
      new DataProperty({
        label: 'Analytes',
        field: 'analytes',
        sortable: true,
      }),
      new DataProperty({
        label: 'Combined Pval',
        field: 'Pval_combined',
        sortable: true,
      }),
      new DataProperty({
        label: 'Combined FDR Pval',
        field: 'Pval_combined_FDR',
        sortable: true,
      }),
      new DataProperty({
        label: 'Combined Holm Pval',
        field: 'Pval_combined_Holm',
        sortable: true,
      }),
      new DataProperty({
        label: 'Cluster Assignment',
        field: 'cluster_assignment',
        sortable: true,
        sorted: 'asc',
      }),
    ],
  };
  computedDataColumns = computed(() => {
    let dataColumnsList = this.enrichmentColumns['both'];
    if (this.filteredDataframe() && this.filteredDataframe()?.analyteType) {
      dataColumnsList =
        this.enrichmentColumns[this.filteredDataframe()!.analyteType![0]];
    }
    return dataColumnsList;
  });

  analytes = this.store.selectSignal(RampSelectors.getAnalytes);
  pathways = this.store.selectSignal(RampSelectors.getPathways);
  enrichedPathways = this.store.selectSignal(
    RampSelectors.getPathwayEnrichment,
  );
  clusterPlotUrl = this.store.selectSignal(RampSelectors.getClusterPlotUrl);
  filteredDataframe = this.store.selectSignal(
    RampSelectors.getFilteredFishersDataframe,
  );

  previousValues!: { [key: string]: unknown };

  override dataMap = computed(() => {
    const returnDataMap: Map<string, DataMap> = new Map<string, DataMap>();
    const field = <string>this.activeTab();
    let ret!: { [p: string]: Map<string, DataMap> };
    switch (field) {
      case 'pathways-from-analytes': {
        const pathwaysData = this.pathways()?.data;
        if (pathwaysData) {
          returnDataMap.set('Pathway Lookups', {
            data: this.pathways()?.dataAsDataProperty,
            fields: this.pathwayColumns,
            dataframe: pathwaysData,
            fileName: 'fetchPathwaysFromAnalytes-download.tsv',
            loaded: !!pathwaysData,
          } as DataMap);
        }
        break;
      }
      case 'analytes-from-pathways': {
        const analytesData = this.analytes()?.data;
        if (analytesData) {
          returnDataMap.set('Analytes', {
            data: this.analytes()?.dataAsDataProperty,
            fields: this.analyteColumns,
            dataframe: analytesData,
            fileName: 'fetchAnalytesFromPathways-download.tsv',
            loaded: !!analytesData,
          } as DataMap);
        }
        break;
      }
      case 'pathway-enrichment': {
        const enrichedPathwaysData =
          this.enrichedPathways()?.dataAsDataProperty;
        if (enrichedPathwaysData) {
          returnDataMap.set('Enriched Pathways', {
            data: enrichedPathwaysData,
            fields: this.computedDataColumns(),
            fileName: 'fetchEnrichedPathwaysFromAnalytes-download.tsv',
            dataframe: this.enrichedPathways()?.data,
            loaded: !!enrichedPathwaysData,
          });
        }
        const noEnrichedPathwaysModalRef:
          | MatDialogRef<DialogModalComponent>
          | undefined = this.noEnrichedPathwaysModal();
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
    let sizeMessage = undefined;
    if (!(this.clusterPlotUrl() && this.clusterPlotUrl()!.length > 0)) {
      sizeMessage =
        'This website currently does not support clustering over 100 pathways. Please use the RaMP-DB R package for this feature.';
    }
    if (this.clusterPlotUrl()) {
      visualizationMapComputed.set('Cluster Plot', [
        {
          type: 'cluster',
          data: {
            message: sizeMessage,
            /*image: this.sanitizer.bypassSecurityTrustHtml(
              <string>this.clusterPlot()
            ),*/
            image: this.clusterPlotUrl(),
          },
          loaded: !!this.clusterPlotUrl(),
        },
      ] as VisualizationMap[]);
    }
    if (
      visualizationMapComputed.size &&
      this.activeTab() === 'pathway-enrichment'
    ) {
      const field = <string>this.activeTab();
      return { [field]: visualizationMapComputed };
    } else return undefined;
  });

  override overviewMap = computed(() => {
    const field = <string>this.activeTab();
    let ret!: { [p: string]: QueryResultsData };
    switch (field) {
      case 'analytes-from-pathways': {
        if (this.analytes()?.data) {
          ret = {
            [field]: {
              matches: this.analytes()?.query?.matches,
              noMatches: this.analytes()?.query?.noMatches,
              count: this.analytes()?.data.length,
              inputLength: this.inputList.length,
              inputType: 'pathways',
              fuzzy: true,
              function: [this.analytes()?.query?.functionCall],
            } as QueryResultsData,
          };
        }
        break;
      }
      case 'pathways-from-analytes': {
        if (this.pathways()?.data) {
          ret = {
            [field]: {
              matches: this.pathways()?.query?.matches,
              noMatches: this.pathways()?.query?.noMatches,
              count: this.pathways()?.data.length,
              inputLength: this.inputList.length,
              inputType: 'analytes',
              function: [this.pathways()?.query?.functionCall],
            } as QueryResultsData,
          };
        }
        break;
      }
      case 'pathway-enrichment': {
        if (this.enrichedPathways()?.data) {
          ret = {
            [field]: {
              matches: this.pathways()?.query?.matches,
              noMatches: this.pathways()?.query?.noMatches,
              count: this.enrichedPathways()?.data.length,
              inputLength: this.inputList.length,
              inputType: 'analytes',
              function: [this.enrichedPathways()?.query?.functionCall],
            } as QueryResultsData,
          };
        }
        break;
      }
    }
    return ret;
  });

  noEnrichedPathwaysModal = computed(() => {
    if (
      this.enrichedPathways() &&
      this.enrichedPathways()?.data &&
      !this.enrichedPathways()?.data.length
    ) {
      return this.dialog.open(DialogModalComponent, {
        data: {
          title: 'Pathway',
          message: 'No enriched pathways found.',
        },
      });
    } else return undefined;
  });

  constructor() {
    super();
  }

  ngOnInit() {
    const tempMap = this.inputMap()
      ?.get('pathway-enrichment')
      ?.filter((a) => a.section === 'filter-enrichment-results')[0].questions;
  }

  override fetchData(
    formData: { [key: string]: unknown },
    origin: string,
  ): void {
    this.activeTab.set(origin);
    switch (origin) {
      case 'analytes-from-pathways': {
        if (formData['pathway']) {
          this.inputList = this._parseInput(
            formData['pathway'] as string | string[],
          );
        }
        formData['pathway'] = this.inputList;

        this.store.dispatch(
          AnalyteFromPathwayActions.fetchAnalytesFromPathways({
            pathways: this.inputList,
            analyteType: <string>formData['analyteType'],
          }),
        );
        break;
      }
      case 'pathways-from-analytes': {
        if (formData['analytes']) {
          this.inputList = this._parseInput(
            formData['analytes'] as string | string[],
          );
        }
        formData['analytes'] = this.inputList;

        this.store.dispatch(
          PathwayEnrichmentsActions.fetchPathwaysFromAnalytes({
            analytes: this.inputList,
          }),
        );
        break;
      }
      case 'pathway-enrichment': {
        if (formData['analytes']) {
          this.inputList = this._parseInput(
            formData['analytes'] as string | string[],
          );
        }
        const event = { ...this.previousValues, ...formData };
        this.store.dispatch(
          PathwayEnrichmentsActions.fetchPathwaysFromAnalytes({
            analytes: this.inputList,
          }),
        );
        this.store.dispatch(
          PathwayEnrichmentsActions.fetchEnrichmentFromPathways({
            analytes: this.inputList,
            background: <string>event['background'],
            backgroundFile: event['backgroundFile'] as File,
            dataSourceExclusion:
              <string[]>event['dataSourceExclusion'] || undefined,
            pValType: <string>event['pValType'] || undefined,
            pValCutoff: Number(<number>event['pValCutoff']) || undefined,
            percAnalyteOverlap:
              <number>event['percAnalyteOverlap'] || undefined,
            minPathwayToCluster:
              Number(<number>event['minPathwayToCluster']) || undefined,
            percPathwayOverlap:
              <number>event['percPathwayOverlap'] || undefined,
          }),
        );
        this.previousValues = event;
        break;
      }
    }
  }
}
