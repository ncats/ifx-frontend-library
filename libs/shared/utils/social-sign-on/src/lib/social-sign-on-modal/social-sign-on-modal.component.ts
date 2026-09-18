import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import {
  MatDialog,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserStore } from 'user-store';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  MatError,
  MatFormField,
  MatInput,
  MatLabel,
} from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RegisterModalComponent } from '../register-modal/register-modal.component';
import { ForgotPasswordModalComponent } from '../forgot-password-modal/forgot-password-modal.component';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'lib-social-sign-on-modal',
  templateUrl: './social-sign-on-modal.component.html',
  styleUrls: ['./social-sign-on-modal.component.scss'],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    MatDialogContent,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SocialSignOnModalComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  userStore = inject(UserStore);
  dialogRef = inject(MatDialogRef<SocialSignOnModalComponent>);
  public dialog = inject(MatDialog);

  loginError = this.userStore.error;
  formError = '';
  user = this.userStore.user;
  userSignal = toObservable(this.user);

  signOnForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    pw: new FormControl('', [Validators.required]),
  });

  //
  ngOnInit() {
    this.userSignal.subscribe((res) => {
      if (res && 'uid' in res) {
        this.closeModal();
      }
    });

    this.signOnForm.controls['pw'].valueChanges.subscribe(
      () => (this.formError = ''),
    );
  }

  login(provider: string): void {
    this.userStore.loginUser({ providerName: provider });
  }
  /**
   * use firebase's email login methods
   */
  loginEmail() {
    this.userStore.loginEmailUser(this.signOnForm.value);
  }

  getEmailErrorMessage() {
    if (this.signOnForm.controls['email'].hasError('required')) {
      return 'Email address required';
    }
    return this.signOnForm.controls['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

  getPasswordErrorMessage() {
    if (this.signOnForm.controls['pw'].hasError('required')) {
      return 'Password required';
    }
    return '';
  }

  register() {
    this.dialog
      .open(RegisterModalComponent, {
        minHeight: '100vh',
        maxHeight: '100vh',
        minWidth: '100vw',
        maxWidth: '100vw',
      })
      .afterClosed()
      .subscribe(() => (this.formError = ''));
  }

  forgotPassword() {
    this.formError = '';
    this.dialog
      .open(ForgotPasswordModalComponent, {
        minHeight: '100vh',
        maxHeight: '100vh',
        minWidth: '100vw',
        maxWidth: '100vw',
      })
      .afterClosed()
      .subscribe(() => (this.formError = ''));
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
