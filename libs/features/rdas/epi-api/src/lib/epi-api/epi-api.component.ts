import {
  afterNextRender,
  ChangeDetectionStrategy,
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
import SwaggerUI from 'swagger-ui';

@Component({
  selector: 'lib-epi-api',
  imports: [CommonModule],
  templateUrl: './epi-api.component.html',
  styleUrls: ['./epi-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class EpiApiComponent {
  el = viewChild<ElementRef>('documentation');
  platformId: InjectionToken<NonNullable<unknown>> = inject(
    PLATFORM_ID,
  ) as InjectionToken<NonNullable<unknown>>;
  isBrowser = computed(() => isPlatformBrowser(this.platformId));

  constructor() {
    afterNextRender(() => {
      if (this.isBrowser()) {
        SwaggerUI({
          url: '/assets/epi-api/epi4rdas.json',
          domNode: this.el()?.nativeElement,
        });
      }
    });
  }
}
