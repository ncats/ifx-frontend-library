import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDetailsComponent } from 'project-display';
import { ProjectStore } from 'project-store';

@Component({
  selector: 'lib-project-page',
  imports: [CommonModule, ProjectDetailsComponent],
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss'],
})
export class ProjectPageComponent {
  private readonly projectStore = inject(ProjectStore);
  project = this.projectStore.project;
}
