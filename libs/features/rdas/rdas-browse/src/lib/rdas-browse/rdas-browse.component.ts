import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
  Signal,
  viewChild,
  DOCUMENT,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  NavigationExtras,
  NavigationStart,
  Params,
  Router,
} from '@angular/router';
import { DiseaseNode, GeneAssociation } from 'rdas-models';
import { FilterCategory, HierarchyNode } from 'utils-models';
import { DiseaseListCardComponent } from 'disease-display';
import { RdasTreeComponent } from 'rdas-tree';
import { ChartWrapperComponent } from 'chart-wrapper';
import { SharedUtilsFilterPanelComponent } from 'filter-panel';
import { LoadingSpinnerComponent } from 'loading-spinner';
import { ScrollToTopComponent } from 'scroll-to-top';
import { SharedUtilsSelectedFilterListComponent } from 'selected-filter-list';
import { DiseaseStore } from 'disease-store';
import { TreeChartComponent } from 'tree-chart';
import { GeneStore } from 'gene-store';
import { PhenotypeStore } from 'phenotype-store';

const navigationExtras: NavigationExtras = {
  queryParamsHandling: 'merge',
};

@Component({
  selector: 'lib-rdas-browse',
  templateUrl: './rdas-browse.component.html',
  styleUrls: ['./rdas-browse.component.scss'],
  imports: [
    CommonModule,
    RdasTreeComponent,
    MatPaginatorModule,
    LoadingSpinnerComponent,
    ScrollToTopComponent,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatButtonModule,
    MatSelectModule,
    SharedUtilsFilterPanelComponent,
    SharedUtilsSelectedFilterListComponent,
    ChartWrapperComponent,
    MatTooltip,
    DiseaseListCardComponent,
    TreeChartComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class RdasBrowseComponent implements OnInit, OnDestroy {
  readonly geneStore = inject(GeneStore);
  readonly phenotypeStore = inject(PhenotypeStore);
  readonly diseaseStore = inject(DiseaseStore);
  paginator = viewChild<MatPaginator>(MatPaginator);
  destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  protected dom = inject(DOCUMENT);

  filterMap: Signal<Map<string, FilterCategory[]>> = computed(() => {
    const map = new Map<string, FilterCategory[]>();
    const filtersL = this.diseaseStore.allStaticFilters;
    if (filtersL() && filtersL()?.length) {
      filtersL()?.forEach((filterCat) => {
        if (filterCat.parent) {
          let filterCats: FilterCategory[] | undefined = map.get(
            filterCat.parent,
          );
          if (filterCats) {
            filterCats.push(filterCat);
          } else {
            filterCats = [filterCat];
          }
          map.set(filterCat.parent, filterCats);
        }
      });
    }
    return map;
  });
  page = this.diseaseStore.page;
  loaded = this.diseaseStore.isLoading;
  diseases = this.diseaseStore.diseases;
  //  diseaseTree = this.store.selectSignal(DiseaseSelectors.getDiseaseTree);
  filters = computed(() => {
    const filtersMap = new Map<string, FilterCategory | undefined>([
      ['genes', { label: 'genes' } as FilterCategory],
      ['phenotypes', { label: 'phenotypes' } as FilterCategory],
    ]);
    filtersMap.set('genes', this.geneStore.geneFilters());
    filtersMap.set('phenotypes', this.phenotypeStore.phenotypeFilters());
    return filtersMap;
  });

  sort = 'countArticles';
  selectedValues = signal<Map<string, string[]> | undefined>(undefined);
  showDownload = false;

  mobileQuery!: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor() {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.selectedValues.set(undefined);
    this.fetchParameters();
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e: Event) => {
        if (e instanceof NavigationEnd) {
          this.selectedValues.set(undefined);
          this.fetchParameters();
        }
      });

    if (this.router.routerState.root.snapshot.queryParamMap.has('sort')) {
      const sort =
        this.router.routerState.root.snapshot.queryParamMap.get('sort');
      if (sort) {
        this.sort = sort;
      }
    }
  }

  paginationChanges(event: PageEvent): void {
    navigationExtras.queryParams = {
      pageIndex: event.pageIndex + 1,
      pageSize: event.pageSize,
      sort: this.sort,
    };
    this._navigate(navigationExtras);
  }

  changeSort(event: MatSelectChange): void {
    this.sort = event.value;
    navigationExtras.queryParams = {
      sort: this.sort,
      direction: this.sort === 'gardName' ? 'ASC' : 'DESC',
      pageIndex: 1,
    };

    this._navigate(navigationExtras);
  }

  filterChange(event: {
    label: string;
    term?: string | number | boolean;
    page?: number;
  }): void {
    const skip = event.page ? event.page * 50 : 0;
    const params: Params = { limit: 50, skip: event.term ? 0 : skip };
    if (event.term) {
      params['term'] = event.term;
    }
    switch (event.label) {
      case 'genes': {
        this.geneStore.loadGeneFilters(params);
        break;
      }
      case 'phenotypes':
        {
          this.phenotypeStore.loadPhenotypeFilters(params);
        }
        break;
    }
  }

  filterSelectionChange(
    filters: { label: string; values: (string | number | boolean)[] }[],
  ): void {
    let navigationExtras: NavigationExtras = { queryParamsHandling: 'merge' };
    const newObj: { [key: string]: string | null } = {};
    if (filters.length == 0) {
      navigationExtras.queryParams = null;
      navigationExtras.queryParamsHandling = 'replace';
    } else {
      filters.forEach((filter) => {
        if (filter.values.length) {
          newObj[filter.label] = filter.values.join('&');
        } else {
          newObj[filter.label] = null;
        }
      });
      navigationExtras.queryParams = { ...newObj };
    }

    if (this.router.routerState.snapshot.root.queryParamMap.has('sort')) {
      navigationExtras = {
        queryParams: {
          sort: this.router.routerState.snapshot.root.queryParamMap.get('sort'),
          direction: this.sort === 'GardName' ? 'ASC' : 'DESC',
        },
      };
    }
    this.fetchParameters();
    this.router.navigate(['/diseases'], navigationExtras);
  }

  treeExpand(event: HierarchyNode): void {
    const ev = event as DiseaseNode;
    const navigationExtras: NavigationExtras = {
      queryParams: {
        parentId: ev.gardId,
      },
    };
    this.router.navigate(['/diseases'], navigationExtras);
  }

  fetchParameters(): void {
    const params =
      this.router.routerState.root.snapshot.queryParamMap.keys.filter(
        (key) => !['sort', 'pageIndex', 'pageSize', 'direction'].includes(key),
      );
    if (params && params.length) {
      const valuesMap = new Map();
      params.forEach((param) => {
        const selectedValuesString: string | null =
          this.router.routerState.root.snapshot.queryParamMap.get(param);
        if (selectedValuesString) {
          valuesMap.set(param, selectedValuesString.split('&'));
        }
      });
      this.selectedValues.set(valuesMap);
    }
  }

  downloadData() {
    // if(this.diseases) {
    // this.diseasesFacade.dispatch()
    //this._downloadFile(this._toTSV(this.genes), 'rdas-genes-download.tsv')
    // }
  }

  _toTSV(data: GeneAssociation[]): string {
    // grab the column headings (separated by tabs)
    const headings: string = [
      'geneSymbol',
      'associationStatus',
      'associationType',
      'references',
    ].join('\t');

    // iterate over the data
    const rows: string = data
      .reduce(
        (acc, c) => {
          // for each row object get its values and add tabs between them
          // then add them as a new array to the outgoing array

          return acc.concat([c._toString()]);

          // finally joining each row with a line break
        },
        [headings],
      )
      .join('\n');
    return rows;
  }

  _downloadFile(data: string, name: string, type = 'text/tsv') {
    if (this.dom) {
      const file = new Blob([data], { type: type });
      const link = this.dom.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(file);
        link.setAttribute('href', url);
        link.setAttribute('download', `${name}`);
        link.style.visibility = 'hidden';
        this.dom.body.appendChild(link);
        link.click();
        this.dom.body.removeChild(link);
      }
    }
  }

  private _navigate(navExtras: NavigationExtras): void {
    this.router.navigate([], navExtras);
  }
}
