import { CommonModule } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NavigationExtras, Router } from '@angular/router';
import { Disease } from 'rdas-models';
import { SubscribeButtonComponent } from 'subscribe-button';

@Component({
  selector: 'lib-disease-list-card',
  templateUrl: './disease-list-card.component.html',
  styleUrls: ['./disease-list-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    SubscribeButtonComponent,
  ],
})
export class DiseaseListCardComponent {
  router = inject(Router);
  disease = input<Disease>();
  diseaseSubscription = computed(() => {
    return {
      gardName: this.disease()?.gardName,
      gardId: this.disease()?.gardId,
    };
  });

  navigate(gardId: string | undefined): void {
    if (gardId) {
      const navigationExtras: NavigationExtras = {
        queryParams: {
          gardId: gardId,
        },
      };
      this.router.navigate(['/disease'], navigationExtras);
    }
  }
}
