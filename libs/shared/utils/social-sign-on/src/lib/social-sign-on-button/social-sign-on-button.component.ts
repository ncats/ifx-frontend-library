import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { UserStore } from 'user-store';
import { SocialSignOnModalComponent } from '../social-sign-on-modal/social-sign-on-modal.component';

@Component({
  selector: 'lib-social-sign-on-button',
  templateUrl: './social-sign-on-button.component.html',
  styleUrls: ['./social-sign-on-button.component.scss'],
  imports: [
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    RouterLink,
    MatDialogModule,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialSignOnButtonComponent {
  private readonly userStore = inject(UserStore);
  destroyRef = inject(DestroyRef);
  public dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  user = this.userStore.user;

  /**
   * opens modal for user to sign in
   */
  openSignInModal() {
    this.dialog.open(SocialSignOnModalComponent, {
      hasBackdrop: false,
      backdropClass: 'signin-backdrop',
      maxHeight: '100vh',
      minHeight: '100vh',
      maxWidth: '100vw',
      minWidth: '100vw',
    });
  }

  /**
   * sign out user
   */
  signOut(): void {
    this.userStore.logoutUser();
  }
}
