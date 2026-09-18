import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  output,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserStore } from 'user-store';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'lib-subscribe-button',
  templateUrl: './subscribe-button.component.html',
  styleUrls: ['./subscribe-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTooltip,
  ],
})
export class SubscribeButtonComponent {
  private readonly userStore = inject(UserStore);
  destroyRef = inject(DestroyRef);
  private _snackBar = inject(MatSnackBar);

  subscriptions = this.userStore.subscriptions;

  subscriptionObject = input<{ [key: string]: unknown }>();
  subscribed = computed<boolean>(() => {
    if (this.subscriptions() && this.subscriptions()?.length) {
      return (
        this.subscriptions()!.filter((sub) => {
          return this.subscriptionObject()
            ? sub['gardId'] == this.subscriptionObject()!['gardId']
            : false;
        }).length > 0
      );
    } else return false;
  });

  isSubscribed = output<boolean>();

  subscribe() {
    const subscriptionClone: { [key: string]: unknown }[] = [
      {
        diseaseName: this.subscriptionObject()!['gardName'],
        gardId: this.subscriptionObject()!['gardId'],
      },
    ];
    this.subscriptions()?.forEach((sub) => subscriptionClone.push(sub));
    this.userStore.updateUser(subscriptionClone);
    this._snackBar.open('Subscription updated', '', {
      duration: 3000,
    });
  }

  unSubscribe() {
    const subscriptionClone: { [key: string]: unknown }[] = [];
    this.subscriptions()?.forEach((sub) => {
      if (sub['gardId'] !== this.subscriptionObject()!['gardId']) {
        subscriptionClone.push(sub);
      }
    });
    this.userStore.updateUser(subscriptionClone);
    this._snackBar.open('Subscription removed', '', {
      duration: 3000,
    });
  }
}
