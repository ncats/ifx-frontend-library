import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  inject,
  InjectionToken,
  PLATFORM_ID,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import SwaggerUI from 'swagger-ui';

@Component({
  selector: 'lib-abstract-extraction-api',
  imports: [],
  templateUrl: './abstract-extraction-api.html',
  styleUrl: './abstract-extraction-api.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class AbstractExtractionApi implements AfterViewInit {
  el = viewChild<ElementRef>('documentation');
  platformId: InjectionToken<NonNullable<unknown>> = inject(
    PLATFORM_ID,
  ) as InjectionToken<NonNullable<unknown>>;
  isBrowser = computed(() => isPlatformBrowser(this.platformId));

  ngAfterViewInit() {
    if (this.isBrowser()) {
      SwaggerUI({
        url: '/assets/abstract-extraction-api/abstract-extraction.json',
        domNode: this.el()?.nativeElement,
      });
    }
  }
}
