import { BreakpointObserver } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { CoreProject, Project } from 'rdas-models';
import { AnnotationsDisplayComponent } from '../annotations-display/annotations-display.component';

@Component({
  selector: 'lib-project-details',
  imports: [
    CommonModule,
    MatCardModule,
    MatTabsModule,
    MatExpansionModule,
    AnnotationsDisplayComponent,
  ],
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class ProjectDetailsComponent {
  breakpointObserver = inject(BreakpointObserver);
  fullAbstract = true;

  project = input<CoreProject>();
  latestProject = computed<Project>(() => {
    const g = this.project();
    if (g && g.subProjects) {
      return g.subProjects[0];
    } else {
      return {} as Project;
    }
  });

  truncatedAbstract = computed(() => {
    const abs = this.latestProject()?.abstract;
    let ret = abs;
    if (abs && abs.length > 800) {
      this.fullAbstract = false;
      ret = abs.slice(0, 800);
    }
    if (this.breakpointObserver.isMatched('(max-width: 768px)')) {
      this.fullAbstract = false;
      if (abs && abs.length > 400) {
        ret = abs.slice(0, 400);
      }
    }
    return ret;
  });

  funding = computed(() => {
    const gr = this.latestProject();
    /*    if (gr && gr?.fundedByAgents) {
      return gr?.fundedByAgents.map((obj) => obj.name).join(', ');
    } else return null;*/
  });
}
