import {
  afterNextRender,
  Component,
  computed,
  ElementRef,
  inject,
  InjectionToken,
  PLATFORM_ID,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { SwaggerUIBundle } from 'swagger-ui-dist';

@Component({
  selector: 'lib-history-api',
  imports: [CommonModule],
  templateUrl: './history-api.component.html',
  styleUrl: './history-api.component.scss',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class HistoryApiComponent {
  el = viewChild<ElementRef>('documentation');
  platformId: InjectionToken<NonNullable<unknown>> = inject(
    PLATFORM_ID,
  ) as InjectionToken<NonNullable<unknown>>;
  isBrowser = computed(() => isPlatformBrowser(this.platformId));

  constructor() {
    afterNextRender(() => {
      if (this.isBrowser()) {
        SwaggerUIBundle({
          url: '/assets/history-api/nhs_swagger.json',
          domNode: this.el()?.nativeElement,
        });
      }
    });
  }
}
