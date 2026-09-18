import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  signal,
  Signal,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import {
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle,
} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { Disease } from 'rdas-models';
import { FilterCategory } from 'utils-models';
import {
  DiseaseDisplayComponent,
  DiseaseHeaderComponent,
} from 'disease-display';
import { ScrollToTopComponent } from 'scroll-to-top';
import { DiseaseSelectors, DiseaseStore } from 'disease-store';
import { ArticleStore } from 'article-store';
import { ProjectStore } from 'project-store';
import { ClinicalTrialStore } from 'trial-store';

@Component({
  selector: 'lib-rdas-disease-page',
  templateUrl: './rdas-disease-page.component.html',
  styleUrls: ['./rdas-disease-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule,
    DiseaseDisplayComponent,
    DiseaseHeaderComponent,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatTabsModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
    ScrollToTopComponent,
    ScrollingModule,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RdasDiseasePageComponent implements OnInit {
  private readonly articleStore = inject(ArticleStore);
  private readonly diseaseStore = inject(DiseaseStore);
  private readonly projectStore = inject(ProjectStore);
  private readonly clinicalTrialStore = inject(ClinicalTrialStore);
  private readonly route = inject(ActivatedRoute);
  scroller = inject(ViewportScroller);
  scrollDispatcher = inject(ScrollDispatcher);
  private changeRef = inject(ChangeDetectorRef);
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  destroyRef = inject(DestroyRef);

  loaded = this.diseaseStore.isLoading;

  diseaseFilters: Signal<FilterCategory[] | undefined> =
    this.diseaseStore.dynamicDiseaseFilters;

  disease = this.diseaseStore.disease;
  staticDiseaseFilters = this.diseaseStore.staticDiseaseFilters;
  articlesCount = this.articleStore.articleCounts;
  projectsCount = this.projectStore.projectCounts;
  clinicalTrialsCount = this.clinicalTrialStore.clinicalTrialCounts;

  animationState = signal('in');

  activeElement = 'overview';
  mobile = false;

  ngOnInit(): void {
    this.scrollDispatcher.scrolled().subscribe(() => {
      this.animationState.set(
        this.scroller.getScrollPosition()[1] > 120 ? 'out' : 'in',
      );
    });

    if (this.route.snapshot && this.route.snapshot.fragment) {
      this.activeElement = this.route.snapshot.fragment;
    }

    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.mobile = result.matches;
        this.changeRef.markForCheck();
      });
  }

  setUrl(event: { fragment: string; params?: { [key: string]: unknown } }) {
    if (
      this.route.snapshot.fragment &&
      this.route.snapshot.fragment === event.fragment
    ) {
      const oldParams: { [key: string]: unknown } = {};
      Object.keys(this.route.snapshot.queryParams).forEach((key) => {
        if (key != 'offset') {
          oldParams[key] = this.route.snapshot.queryParams[key];
        }
      });
      this.router.navigate(['disease'], {
        fragment: event.fragment,
        queryParams: { ...oldParams, ...event.params },
        onSameUrlNavigation: 'ignore',
        replaceUrl: true,
      });
    } else {
      //scroll to section
      this.router.navigate(['disease'], {
        fragment: event.fragment,
        queryParams: { gardId: this.disease()?.gardId, ...event.params },
      });
    }
  }

  setActiveElement(event: string) {
    this.activeElement = event;
  }

  public scroll(el: string): void {
    this.setUrl({ fragment: el });
  }

  isActive(check: string): boolean {
    return this.activeElement === check;
  }
}
