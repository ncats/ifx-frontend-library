import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ClinicalTrial } from 'rdas-models';
import { ClinicalTrialsListCardComponent } from '../clinical-trials-list-card/clinical-trials-list-card.component';

@Component({
  selector: 'lib-clinical-trials-list',
  templateUrl: './clinical-trials-list.component.html',
  styleUrls: ['./clinical-trials-list.component.scss'],
  imports: [ClinicalTrialsListCardComponent],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClinicalTrialsListComponent {
  trials = input<ClinicalTrial[]>();
  router = inject(Router);

  navigate(id: string): void {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        nctId: id,
      },
    };
    this.router.navigate(['/trial'], navigationExtras);
  }
}
