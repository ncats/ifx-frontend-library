import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import {
  LinkTemplateProperty,
  slideInOutAnimation,
} from '@ncats-frontend-library/models/utils';

@Component({
  selector: 'ncats-frontend-library-mobile-header-template',
  standalone: true,
  animations: [slideInOutAnimation],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    MatIconModule,
    NgClass,
    MatSidenavModule,
  ],
  templateUrl: './shared-utils-mobile-header-template.component.html',
  styleUrls: ['./shared-utils-mobile-header-template.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileHeaderTemplateComponent {
  @ViewChild(MatSidenav, { static: true }) menu!: MatSidenav;

  /**
   * animation state changed by scrolling
   * @type {string}
   */
  @Input() animationState = 'in';

  @Input() title?: string;

  @Input() active!: string;

  @Input() links?: LinkTemplateProperty[] = [];

  isActive(path: string | undefined) {
    return this.active === path;
  }
}
