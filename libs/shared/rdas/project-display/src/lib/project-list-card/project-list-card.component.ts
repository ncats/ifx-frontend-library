import { CommonModule } from '@angular/common';
import { Component, input, Input, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CoreProject } from 'rdas-models';

@Component({
  selector: 'lib-project-list-card',
  templateUrl: './project-list-card.component.html',
  styleUrls: ['./project-list-card.component.scss'],
  imports: [CommonModule, MatCardModule],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class ProjectListCardComponent {
  project = input<CoreProject>();
}
