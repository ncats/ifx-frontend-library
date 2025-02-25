import { Component, Input, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ClinicalTrial } from '@ncats-frontend-library/models/rdas';

@Component({
  selector: 'ncats-frontend-library-clinical-trials-list-card',
  templateUrl: './clinical-trials-list-card.component.html',
  styleUrls: ['./clinical-trials-list-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [MatCardModule],
})
export class ClinicalTrialsListCardComponent {
  @Input() trial!: ClinicalTrial;
}
