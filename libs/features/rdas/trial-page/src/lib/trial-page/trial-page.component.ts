import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicalTrialsDetailsComponent } from 'clinical-trials-display';
import { ClinicalTrialStore } from 'trial-store';

@Component({
  selector: 'lib-trial-page',
  imports: [CommonModule, ClinicalTrialsDetailsComponent],
  templateUrl: './trial-page.component.html',
  styleUrls: ['./trial-page.component.scss'],
  standalone: true,
})
export class TrialPageComponent {
  private readonly clinicalTrialStore = inject(ClinicalTrialStore);
  trial = this.clinicalTrialStore.clinicalTrial;
}
