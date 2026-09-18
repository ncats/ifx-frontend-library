import { ScrollDispatcher } from '@angular/cdk/overlay';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  inject,
  InjectionToken,
  input,
  DOCUMENT,
  PLATFORM_ID,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-scroll-to-top',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    CdkScrollableModule,
    ScrollingModule,
  ],
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollToTopComponent implements AfterViewInit {
  platformId: InjectionToken<NonNullable<unknown>> = inject(
    PLATFORM_ID,
  ) as InjectionToken<NonNullable<unknown>>;
  isBrowser = computed(() => isPlatformBrowser(this.platformId));
  destroyRef = inject(DestroyRef);
  private changeRef = inject(ChangeDetectorRef);
  private router = inject(Router);
  private scrollDispatcher = inject(ScrollDispatcher);
  private document = inject(DOCUMENT);

  navIsFixed!: boolean;

  ngAfterViewInit() {
    this.scrollDispatcher
      .scrolled()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        if (this.isBrowser()) {
          if (
            window.pageYOffset > 100 ||
            this.document.documentElement.scrollTop > 100 ||
            this.document.body.scrollTop > 100
          ) {
            this.navIsFixed = true;
          } else if (
            (this.navIsFixed && window.pageYOffset < 10) ||
            this.document.documentElement.scrollTop < 10 ||
            this.document.body.scrollTop < 10
          ) {
            this.navIsFixed = false;
          }
        }
        this.changeRef.detectChanges();
      });
  }

  scrollToTop(): void {
    if (this.isBrowser()) {
      (function smoothscroll() {
        const currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 5);
        }
      })();
      this.router.navigate([], { queryParamsHandling: 'merge' });
    }
  }
}
