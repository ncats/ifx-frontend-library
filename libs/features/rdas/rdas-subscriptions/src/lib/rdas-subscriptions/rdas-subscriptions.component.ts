import { Component, inject } from '@angular/core';
import { DiseaseListCardComponent } from 'disease-display';
import { DiseaseStore } from 'disease-store';

@Component({
  selector: 'lib-rdas-subscriptions',
  templateUrl: './rdas-subscriptions.component.html',
  styleUrls: ['./rdas-subscriptions.component.scss'],
  imports: [DiseaseListCardComponent],
  standalone: true,
})
export class RdasSubscriptionsComponent {
  private diseaseStore = inject(DiseaseStore);
  diseases = this.diseaseStore.diseases;
  loading = true;
}
