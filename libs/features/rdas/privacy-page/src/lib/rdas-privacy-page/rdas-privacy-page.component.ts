import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { OverlayModule, ScrollDispatcher } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  viewChildren,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'rdas-privacy-page',
  imports: [
    CommonModule,
    MatListModule,
    ScrollingModule,
    OverlayModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
  ],
  templateUrl: './rdas-privacy-page.component.html',
  styleUrl: './rdas-privacy-page.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class RdasPrivacyPageComponent implements OnInit {
  scrollSections = viewChildren<ElementRef>('scrollSection');
  private changeRef = inject(ChangeDetectorRef);
  private scrollDispatcher = inject(ScrollDispatcher);
  public scroller = inject(ViewportScroller);
  private breakpointObserver = inject(BreakpointObserver);
  destroyRef = inject(DestroyRef);
  mobile = false;

  activeElement = 'statement';

  ngOnInit(): void {
    this.scrollDispatcher
      .scrolled()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        let scrollTop: number = this.scroller.getScrollPosition()[1] + 60;
        if (scrollTop === 60) {
          this.activeElement = 'statement';
          this.changeRef.detectChanges();
        } else {
          this.scrollSections().forEach((section) => {
            scrollTop = scrollTop - section.nativeElement?.scrollHeight;
            if (scrollTop >= 0) {
              this.activeElement = section.nativeElement.nextSibling.id;
              this.changeRef.detectChanges();
            }
          });
        }
      });

    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.mobile = result.matches;
        this.changeRef.markForCheck();
      });
  }

  public scroll(el: HTMLElement): void {
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  isActive(check: string): boolean {
    return this.activeElement === check;
  }
}
