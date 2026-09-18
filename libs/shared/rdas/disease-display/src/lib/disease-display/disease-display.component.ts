import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ScrollDispatcher } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { JsonPipe, ViewportScroller } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  QueryList,
  Signal,
  SimpleChange,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatPaginator } from '@angular/material/paginator';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Disease } from 'rdas-models';
import { FilterCategory } from 'utils-models';
import { ArticleListComponent } from 'article-display';
import { ClinicalTrialsListComponent } from 'clinical-trials-display';
import { GeneListComponent } from 'gene-display';
import { PhenotypeListComponent } from 'phenotype-display';
import { ProjectListComponent } from 'project-display';
import { ChartWrapperComponent } from 'chart-wrapper';
import { RdasPanelTemplateComponent } from 'rdas-panel-template';
import { ArticleStore } from 'article-store';
import { ProjectStore } from 'project-store';
import { ClinicalTrialStore } from 'trial-store';

@Component({
  selector: 'lib-disease-display',
  templateUrl: './disease-display.component.html',
  styleUrls: ['./disease-display.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCardModule,
    ArticleListComponent,
    ProjectListComponent,
    ClinicalTrialsListComponent,
    GeneListComponent,
    PhenotypeListComponent,
    MatExpansionModule,
    MatTabsModule,
    ScrollingModule,
    RdasPanelTemplateComponent,
    ChartWrapperComponent,
  ],
})
export class DiseaseDisplayComponent
  implements OnInit, AfterViewInit, OnChanges
{
  @ViewChildren('scrollSection') scrollSections!: QueryList<ElementRef>;
  @ViewChildren(RdasPanelTemplateComponent)
  templates!: QueryList<RdasPanelTemplateComponent>;
  private route = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);
  private changeRef = inject(ChangeDetectorRef);
  public scroller = inject(ViewportScroller);
  private scrollDispatcher = inject(ScrollDispatcher);
  private breakpointObserver = inject(BreakpointObserver);
  readonly articleStore = inject(ArticleStore);
  readonly projectStore = inject(ProjectStore);
  readonly clinicalTrialStore = inject(ClinicalTrialStore);

  disease = input<Disease>();

  articlesCount = this.articleStore.articleCounts;
  articlesList = this.articleStore.articles;
  projectsCount = this.projectStore.projectCounts;
  projectsList = this.projectStore.projects;
  clinicalTrialsCount = this.clinicalTrialStore.clinicalTrialCounts;
  clinicalTrialsList = this.clinicalTrialStore.clinicalTrials;

  loaded = input<boolean | undefined>();
  filters = input<FilterCategory[]>();
  staticFilters = input<FilterCategory[]>();
  fragment = input<string>();
  offset = input<string>();
  id = input<string>();

  staticFilterMap: Signal<Map<string, FilterCategory[]>> = computed(() => {
    return this.setFilterMap(this.staticFilters());
  });
  filterMap: Signal<Map<string, FilterCategory[]>> = computed(() => {
    return this.setFilterMap(this.filters());
  });

  activeElement = output<string>();
  optionsChange = output<{
    params: { [key: string]: unknown };
    fragment: string;
  }>();

  mobile = false;

  ngOnInit() {
    this.scroller.setOffset([0, 250]);
    if (this.route.snapshot && this.route.snapshot.fragment) {
      this.scroller.scrollToAnchor(this.route.snapshot.fragment);
    }

    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.mobile = result.matches;
        this.changeRef.markForCheck();
      });

    this.scrollDispatcher
      .scrolled()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        let scrollTop: number = this.scroller.getScrollPosition()[1] + 120;
        if (this.scroller.getScrollPosition()[1] === 0) {
          this.activeElement.emit('overview');
        } else {
          this.scrollSections.forEach((section) => {
            scrollTop = scrollTop - section.nativeElement?.scrollHeight;
            if (scrollTop >= 0 && section.nativeElement.nextSibling) {
              this.activeElement.emit(section.nativeElement.nextSibling.id);
            }
          });
        }
      });
  }

  ngOnChanges(change: { disease: SimpleChange }) {
    if (change['disease'] && !change['disease'].firstChange) {
      this.setPage();
    }
  }

  ngAfterViewInit() {
    this.setPage();
  }

  fetchList(params: { [key: string]: unknown }, fragment: string): void {
    this.optionsChange.emit({ params, fragment });
  }

  setPage() {
    const template: RdasPanelTemplateComponent[] = this.templates.filter(
      (template: RdasPanelTemplateComponent) =>
        template._id() === this.route?.snapshot?.fragment,
    );
    if (template && template.length) {
      if (
        this.route.snapshot &&
        this.route.snapshot.queryParamMap.has('offset')
      ) {
        const paginator = template[0].paginator() as MatPaginator;
        paginator.pageIndex =
          Number(this.route.snapshot.queryParamMap.get('offset')) / 10;
      } else {
        template[0].paginator()!.firstPage();
      }
    }
  }

  setFilterMap(filtersL: FilterCategory[] | undefined) {
    const map = new Map<string, FilterCategory[]>();
    if (filtersL && filtersL.length) {
      filtersL.forEach((filterCat) => {
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
  }
}
