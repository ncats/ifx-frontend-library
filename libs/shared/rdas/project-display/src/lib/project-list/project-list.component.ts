import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { NavigationExtras, Router } from '@angular/router';
import { CoreProject } from 'rdas-models';
import { ProjectListCardComponent } from '../project-list-card/project-list-card.component';

@Component({
  selector: 'lib-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
    ProjectListCardComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class ProjectListComponent {
  projects = input<CoreProject[]>();
  router = inject(Router);

  navigate(id: string): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        projectNumber: id,
      },
    };
    this.router.navigate(['/project'], navigationExtras);
  }
}
