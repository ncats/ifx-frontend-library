import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, ViewportScroller } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnDestroy,
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
import { DiseaseSelectors, FetchDiseaseActions } from 'disease-store';
import { ArticleSelectors } from 'article-store';
import { ProjectSelectors } from 'grant-store';
import { TrialSelectors } from 'trial-store';
import { Store } from '@ngrx/store';

@Component({
  selector: 'lib-rdas-disease-page',
  templateUrl: './rdas-disease-page.component.html',
  styleUrls: ['./rdas-disease-page.component.scss'],
  /*   animations: [
    trigger('followOnScroll', [
      state('in', style({ top: '30vh' })),
      state(
        'out',
        style({
          top: '15vh',
        }),
      ),
      transition('in => out', [group([animate('200ms ease-out')])]),
      transition('out => in', [group([animate('200ms ease-in')])]),
    ]),
  ], */
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
export class RdasDiseasePageComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  private readonly route = inject(ActivatedRoute);
  scroller = inject(ViewportScroller);
  scrollDispatcher = inject(ScrollDispatcher);
  private changeRef = inject(ChangeDetectorRef);
  private breakpointObserver = inject(BreakpointObserver);
  private router = inject(Router);
  destroyRef = inject(DestroyRef);

  disease: Signal<Disease | undefined> = this.store.selectSignal(
    DiseaseSelectors.getSelected,
  );
  loaded: Signal<boolean | undefined> = this.store.selectSignal(
    DiseaseSelectors.getDiseasesLoaded,
  );
  diseaseFilters: Signal<FilterCategory[] | undefined> =
    this.store.selectSignal(DiseaseSelectors.getDiseaseFilters);
  staticDiseaseFilters: Signal<FilterCategory[] | undefined> =
    this.store.selectSignal(DiseaseSelectors.getStaticDiseaseFilters);
  articlesCount = this.store.selectSignal(ArticleSelectors.getArticleCount);
  projectsCount = this.store.selectSignal(
    ProjectSelectors.selectAllProjectsCount,
  );
  trialsCount = this.store.selectSignal(TrialSelectors.getTrialCount);
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
        queryParams: { id: this.disease()?.gardId, ...event.params },
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

  ngOnDestroy() {
    this.store.dispatch(FetchDiseaseActions.clearStaticDiseaseFilters());
    // this.store.dispatch(FetchDiseaseActions.clearDisease());
  }
}
