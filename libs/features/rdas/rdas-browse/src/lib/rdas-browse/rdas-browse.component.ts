import { MediaMatcher } from '@angular/cdk/layout';
import { CommonModule, DOCUMENT } from '@angular/common';
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
  ViewEncapsulation,
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
  Event,
  NavigationEnd,
  NavigationExtras,
  NavigationStart,
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
import { FetchFiltersActions, FilterSelectors } from 'filter-store';
import { BrowseDiseaseListActions, DiseaseSelectors } from 'disease-store';
import { Store } from '@ngrx/store';
import { TreeChartComponent } from 'tree-chart';

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
  private readonly store = inject(Store);
  paginator = viewChild<MatPaginator>(MatPaginator);
  destroyRef = inject(DestroyRef);
  private router = inject(Router);
  protected dom = inject(DOCUMENT);

  filterMap: Signal<Map<string, FilterCategory[]>> = computed(() => {
    const map = new Map<string, FilterCategory[]>();
    const filtersL = this.store.selectSignal(
      DiseaseSelectors.getAllDiseaseFilters,
    );
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
  page = this.store.selectSignal(DiseaseSelectors.getDiseasesPage);
  loaded = this.store.selectSignal(DiseaseSelectors.getDiseasesLoaded);
  diseases = this.store.selectSignal(DiseaseSelectors.getAllDiseases);
  //  diseaseTree = this.store.selectSignal(DiseaseSelectors.getDiseaseTree);
  filters = this.store.selectSignal(FilterSelectors.selectAllFilters);

  sort = 'countArticles';
  selectedValues: Map<string, string[]> = new Map<string, string[]>();
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
    this.selectedValues.clear();
    this.fetchParameters();
    this.router.events
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((e: Event) => {
        if (e instanceof NavigationStart) {
          this.store.dispatch(BrowseDiseaseListActions.setLoading());
        }
        if (e instanceof NavigationEnd) {
          this.selectedValues.clear();
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

  filterChange(event: { label: string; term?: string; page?: number }): void {
    const skip = event.page ? event.page * 200 : 0;
    if (event.term) {
      this.store.dispatch(
        FetchFiltersActions.fetchFilters({
          label: event.label,
          term: event.term,
          limit: 200,
          skip: 0,
        }),
      );
    } else {
      this.store.dispatch(
        FetchFiltersActions.fetchFilters({
          label: event.label,
          limit: 200,
          skip: skip,
        }),
      );
    }
  }

  filterSelectionChange(filters: { label: string; values: string[] }[]): void {
    let navigationExtras: NavigationExtras = { queryParamsHandling: 'merge' };
    const newObj: { [key: string]: string | null } = {};
    if (this.router.routerState.snapshot.root.queryParamMap.has('sort')) {
      navigationExtras = {
        queryParams: {
          sort: this.router.routerState.snapshot.root.queryParamMap.get('sort'),
          direction: this.sort === 'GardName' ? 'ASC' : 'DESC',
        },
      };
    }
    filters.forEach((filter) => {
      if (filter.values.length) {
        newObj[filter.label] = filter.values.join('&');
      } else {
        newObj[filter.label] = null;
      }
    });
    navigationExtras.queryParams = { ...newObj };
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
      params.forEach((param) => {
        const selectedValues: string | null =
          this.router.routerState.root.snapshot.queryParamMap.get(param);
        if (selectedValues) {
          this.selectedValues.set(param, selectedValues.split('&'));
        }
      });
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
