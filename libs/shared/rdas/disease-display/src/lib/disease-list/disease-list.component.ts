import { Component, input } from '@angular/core';
import { Disease } from '@ncats-frontend-library/models/rdas';
import { DiseaseListCardComponent } from '../disease-list-card/disease-list-card.component';

@Component({
  selector: 'ncats-frontend-library-disease-list',
  templateUrl: './disease-list.component.html',
  styleUrls: ['./disease-list.component.scss'],
  standalone: true,
  imports: [DiseaseListCardComponent],
})
export class DiseaseListComponent {
   diseases = input<Disease[]>();
}
