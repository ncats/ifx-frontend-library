import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayModule, ScrollDispatcher } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  QueryList,
  ViewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { select, Store } from '@ngrx/store';
import { DataProperty, NcatsDatatableComponent } from 'ncats-datatable';
import { EntityCount, SourceVersion } from 'ramp';
import { LoadRampActions, RampSelectors } from 'ramp-store';

import { tap } from 'rxjs';
import { CdkScrollable, ScrollingModule } from '@angular/cdk/scrolling';
import { NgClass, ViewportScroller } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { UpsetComponent } from 'upset-chart';

@Component({
  selector: 'ramp-about',
  templateUrl: './ramp-about.component.html',
  styleUrls: ['./ramp-about.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatListModule,
    NgClass,
    CdkScrollable,
    NcatsDatatableComponent,
    UpsetComponent,
    ScrollingModule,
    OverlayModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
  ],
})
export class AboutComponent implements OnInit {
  private readonly store = inject(Store);
  destroyRef = inject(DestroyRef);

  @ViewChildren('scrollSection') scrollSections!: QueryList<ElementRef>;
  mobile = false;

  /**
   * default active element for menu highlighting, will be replaced on scroll
   * @type {string}
   */
  activeElement = 'about';

  genesData!: { id: string; sets: string[]; size: number }[];
  compoundsData!: { id: string; sets: string[]; size: number }[];
  sourceVersions!: Array<SourceVersion>;
  entityCounts!: { [key: string]: DataProperty }[];
  databaseUrl!: string;
  entityCountsColumns: DataProperty[] = [
    new DataProperty({
      label: 'Category',
      field: 'status_category',
      sortable: true,
      sorted: 'asc',
    }),
    new DataProperty({
      label: 'ChEBI',
      field: 'chebi',
      sortable: true,
    }),
    new DataProperty({
      label: 'HMDB',
      field: 'hmdb',
      sortable: true,
    }),
    new DataProperty({
      label: 'KEGG',
      field: 'kegg',
      sortable: true,
    }),
    new DataProperty({
      label: 'LIPIDMAPS',
      field: 'lipidmaps',
      sortable: true,
    }),
    new DataProperty({
      label: 'Reactome',
      field: 'reactome',
      sortable: true,
    }),
    new DataProperty({
      label: 'WikiPathways',
      field: 'wiki',
      sortable: true,
    }),
  ];
  dbVersion!: string;
  dbUpdated!: string;

  constructor(
    private changeRef: ChangeDetectorRef,
    private scrollDispatcher: ScrollDispatcher,
    public scroller: ViewportScroller,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.mobile = result.matches;
        this.changeRef.markForCheck();
      });

    this.store.dispatch(LoadRampActions.loadRampStats());

    this.store
      .pipe(
        select(RampSelectors.getAllRamp),
        takeUntilDestroyed(this.destroyRef),
        tap((data) => {
          if (data.sourceVersions) {
            this.sourceVersions = data.sourceVersions;
            if (this.sourceVersions.length > 0) {
              const first = this.sourceVersions[0];
              if (first.ramp_db_version) {
                this.dbVersion = first.ramp_db_version;
              }
              if (first.db_mod_date) {
                this.dbUpdated = first.db_mod_date;
              }
            }

            this.changeRef.markForCheck();
          }
          if (data.entityCounts) {
            this.entityCounts = data.entityCounts.map((count: EntityCount) => {
              const newObj: { [key: string]: DataProperty } = {};
              Object.entries(count).map((value: string[]) => {
                newObj[<string>value[0]] = new DataProperty({
                  // name: value[0],
                  label: <string>value[0],
                  value: <string>value[1],
                });
              });
              return newObj;
            });
            this.changeRef.markForCheck();
          }
          if (data.geneIntersects) {
            this.genesData = data.geneIntersects;
            this.changeRef.markForCheck();
          }
          if (data.metaboliteIntersects) {
            this.compoundsData = data.metaboliteIntersects;
            this.changeRef.markForCheck();
          }
          if (data.databaseUrl) {
            this.databaseUrl = data.databaseUrl;
          }
        }),
      )
      .subscribe();

    this.scrollDispatcher
      .scrolled()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        let scrollTop: number = this.scroller.getScrollPosition()[1];
        if (scrollTop === 0) {
          this.activeElement = 'about';
          this.changeRef.detectChanges();
        } else {
          this.scrollSections.forEach((section) => {
            scrollTop = scrollTop - section.nativeElement?.scrollHeight;
            if (scrollTop >= 0) {
              this.activeElement = section.nativeElement.nextSibling.id;
              this.changeRef.detectChanges();
            }
          });
        }
      });
  }

  /**
   * scroll to section
   * @param el
   */
  public scroll(el: HTMLElement): void {
    //  el.scrollIntoView(true);
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    this.activeElement = el.id;
  }

  /**
   * check which section is active
   * @param {string} check
   * @returns {boolean}
   */
  isActive(check: string): boolean {
    return this.activeElement === check;
  }
}
