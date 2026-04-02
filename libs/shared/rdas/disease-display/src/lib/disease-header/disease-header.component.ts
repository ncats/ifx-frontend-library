import { ScrollDispatcher } from '@angular/cdk/overlay';
import {
  LowerCasePipe,
  NgOptimizedImage,
  ViewportScroller,
} from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  OnInit,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Disease } from 'rdas-models';
import { SubscribeButtonComponent } from 'subscribe-button';
/*
import { shrinkOnScroll } from './disease-header-animation';
 */

@Component({
  selector: 'lib-disease-header',
  templateUrl: './disease-header.component.html',
  styleUrls: ['./disease-header.component.scss'],
  //animations: [shrinkOnScroll],
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatIconModule,
    SubscribeButtonComponent,
    NgOptimizedImage,
    LowerCasePipe,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DiseaseHeaderComponent implements OnInit {
  scroller = inject(ViewportScroller);
  scrollDispatcher = inject(ScrollDispatcher);

  animationState = signal('in');

  disease = input<Disease>();
  parsedId = computed(() => {
    let ret = 0;
    const gardId: string | undefined = this.disease()?.gardId;
    if (gardId) {
      const split = gardId.split('GARD:')[1];
      ret = parseInt(split);
    }
    return ret;
  });

  ngOnInit() {
    this.scrollDispatcher.scrolled().subscribe(() => {
      this.animationState.set(
        this.scroller.getScrollPosition()[1] > 120 ? 'out' : 'in',
      );
    });
  }
}
