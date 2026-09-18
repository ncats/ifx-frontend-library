import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { SubscribeButtonComponent } from 'subscribe-button';

@Component({
  selector: 'lib-shared-utils-data-not-found',
  imports: [CommonModule, SubscribeButtonComponent],
  templateUrl: './shared-utils-data-not-found.component.html',
  styleUrls: ['./shared-utils-data-not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class SharedUtilsDataNotFoundComponent {
  message = input<string>();
  subscription = input<{ [key: string]: unknown }>();
  subscribed = false;

  setSub(sub: boolean) {
    this.subscribed = sub;
  }
}
