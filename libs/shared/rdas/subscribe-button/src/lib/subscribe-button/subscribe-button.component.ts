import { SelectionModel } from '@angular/cdk/collections';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription } from 'utils-models';
import { UpdateUserActions, UserSelectors } from 'user-store';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { AboutSubscribeModalComponent } from '../about-subscribe-modal/about-subscribe-modal.component';
import { UnsubscribeModalComponent } from '../unsubscribe-modal/unsubscribe-modal.component';

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
  ],
})
export class SubscribeButtonComponent implements OnInit {
  private readonly userStore = inject(Store);
  destroyRef = inject(DestroyRef);
  public dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  private changeRef = inject(ChangeDetectorRef);
  private breakpointObserver = inject(BreakpointObserver);
  user = this.userStore.selectSignal(UserSelectors.getUser);

  subscriptionName = input<string | undefined>();
  subscriptionId = input<string | undefined>();
  subscribed = computed<boolean>(() => {
    return (
      !!this.user() &&
      this.user()!.subscriptions.filter(
        (sub: Subscription) => sub.gardID == this.subscriptionId(),
      ).length > 0
    );
  });
  mobile = signal(false);

  isSubscribed = output<boolean>();

  /*user!: User;
  subscription?: Subscription;
*/
  all = ['articles', 'grants', 'trials'];

  subscriptionSelection = computed(() => {
    const ret = new SelectionModel<string>(true, this.all);
    const subscription = this.user()?.subscriptions?.filter(
      (sub: Subscription) => sub.gardID == this.subscriptionId(),
    )[0];
    if (subscription?.alerts) {
      ret.setSelection(...subscription.alerts);
    }
    return ret;
  });

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        this.mobile.set(result.matches);
      });

    this.subscriptionSelection()
      .changed.pipe(
        takeUntilDestroyed(this.destroyRef),
        debounceTime(1000),
        distinctUntilChanged(),
      )
      .subscribe(() => {
        const subscriptionClone: Subscription[] = [];
        if (this.user() && this.user()!.subscriptions) {
          this.user()?.subscriptions.forEach((sub) =>
            subscriptionClone.push(sub),
          );
          subscriptionClone.splice(
            this.user()!.subscriptions.findIndex(
              (obj) => obj.gardID === this.subscriptionId(),
            ),
            1,
          );
          const subscription = new Subscription({
            diseaseName: this.subscriptionName(),
            gardID: this.subscriptionId(),
            alerts: this.subscriptionSelection().selected,
          });
          subscriptionClone.push(subscription);
          this.userStore.dispatch(
            UpdateUserActions.updateUserSubscriptions({
              subscriptions: subscriptionClone,
            }),
          );
        }
      });
  }

  /*

  setSubscriptions() {
    if (this.user) {
      this.subscription = this.user?.subscriptions?.filter(
        (sub: Subscription) => sub.gardID == this.subscriptionId(),
      )[0];
      this.subscribed.set(!!this.subscription);
      if (this.subscription?.alerts) {
        this.subscriptionSelection.setSelection(...this.subscription.alerts);
      }
    } else {
      this.subscription = undefined;
      this.subscribed.set(false);
    }
  }
*/

  subscribe() {
    if (this.user) {
      const subscription = new Subscription({
        diseaseName: this.subscriptionName(),
        gardID: this.subscriptionId(),
        alerts: this.all,
      });
      const subscriptionClone: Subscription[] = [{ ...subscription }];
      this.user()?.subscriptions.forEach((sub) => subscriptionClone.push(sub));
      this.userStore.dispatch(
        UpdateUserActions.updateUserSubscriptions({
          subscriptions: subscriptionClone,
        }),
      );
      this._snackBar.open('Subscription updated', '', {
        duration: 3000,
      });
    } else {
      //  alert("sign in, pal")
    }
  }

  unSubscribe() {
    this.dialog
      .open(UnsubscribeModalComponent, {
        data: {
          entity: this.subscriptionId(),
          label: this.subscriptionName(),
        },
      })
      .afterClosed()
      .subscribe((res: { [key: string]: string }) => {
        if (res) {
          const subscriptionClone: Subscription[] = [];
          this.user()?.subscriptions.forEach((sub) => {
            if (sub.gardID !== this.subscriptionId()) {
              subscriptionClone.push(Object.assign({}, { ...sub }));
            }
          });
          this.userStore.dispatch(
            UpdateUserActions.updateUserSubscriptions({
              subscriptions: subscriptionClone,
            }),
          );
          this._snackBar.open('Subscription removed', '', {
            duration: 3000,
          });
        }
      });
  }

  aboutSubscribe() {
    this.dialog.open(AboutSubscribeModalComponent, {
      width: this.mobile() ? '90vw' : '35vw',
      data: {
        user: !!this.user(),
      },
    });
  }

  toggleAll() {
    if (this.subscriptionSelection()?.selected.length === 3) {
      this.subscriptionSelection()?.clear();
    } else {
      this.subscriptionSelection()?.select(...this.all);
    }
  }
}
