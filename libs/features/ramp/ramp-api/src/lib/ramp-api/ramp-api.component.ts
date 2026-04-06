import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  InjectionToken,
  PLATFORM_ID,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import SwaggerUI  from 'swagger-ui';


@Component({
  selector: 'lib-ramp-ramp-api',
  templateUrl: './ramp-api.component.html',
  styleUrls: ['./ramp-api.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [],
})
export class RampApiComponent implements AfterViewInit {
  @ViewChild('documentation') el!: ElementRef;
  platformId: InjectionToken<NonNullable<unknown>> = inject(
    PLATFORM_ID,
  ) as InjectionToken<NonNullable<unknown>>;
  isBrowser = computed(() => isPlatformBrowser(this.platformId));
  url = '/assets/data/ramp-api.json';

  ngAfterViewInit() {
    if (this.isBrowser()) {
      SwaggerUI({
        url: this.url,
        domNode: this.el.nativeElement,
      });
      }
  }
}
