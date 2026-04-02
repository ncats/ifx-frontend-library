import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  NavigationExtras,
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
/*
import { Disease } from 'rdas-models';
*/
import { LinkTemplateProperty } from 'utils-models';
import { HeaderTemplateComponent } from 'header-template';
import { MobileHeaderTemplateComponent } from 'mobile-header-template';
import { SocialSignOnButtonComponent } from 'social-sign-on';
import { FooterTemplateComponent } from 'footer-template';
import { RdasSearchComponent } from 'rdas-search';
import { Disease } from 'rdas-models';
/*
import { RdasSearchComponent } from 'rdas-search';
*/

@Component({
  selector: 'app-rdas-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    RouterLink,
    MatSidenavModule,
    //RdasSearchComponent,
    RouterOutlet,
    FooterTemplateComponent,
    HeaderTemplateComponent,
    SocialSignOnButtonComponent,
    CdkScrollableModule,
    ScrollingModule,
    MobileHeaderTemplateComponent,
    MatIconModule,
    MatButtonModule,
    RdasSearchComponent,
  ],
})
export class AppComponent {
  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);

  header = viewChild<MobileHeaderTemplateComponent>(
    MobileHeaderTemplateComponent,
  );

  title = 'rdas';
  loaded = false;
  mobile = computed(() => {
    let isMobile = false;
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .subscribe((breakpointState) => {
        isMobile = breakpointState.matches;
      });
    return isMobile;
  });

  displayLinks = computed(() =>
    this.links.filter(
      (link) => !(link.hideMobile && link.hideMobile === this.mobile()),
    ),
  );
  links: LinkTemplateProperty[] = [
    {
      link: 'diseases',
      label: 'Diseases',
    },
    {
      link: 'about',
      label: 'About',
    },
    {
      link: 'apis',
      label: 'APIs',
      hideMobile: true,
      children: [
        {
          link: 'apis/diseases',
          label: 'Diseases',
        },
        {
          link: 'apis/epi',
          label: 'Epidemiology',
        },
        {
          link: 'apis/history',
          label: 'Natural History',
        },
      ],
    },
  ];

  selectDisease(event: Disease): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        id: event.gardId,
      },
    };
    this.router.navigate(['/disease'], navigationExtras);
  }

  searchDiseaseString(event: string): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        q: event,
      },
    };
    this.router.navigate(['/diseases'], navigationExtras);
  }

  closeSidenav() {
    if (this.header()) {
      this.header()?.menu.close();
    }
  }
}
