import {
  Component,
  DestroyRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  ResetPasswordEmailActions,
  UserSelectors,
} from '@ncats-frontend-library/stores/user-store';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs';

@Component({
  selector: 'ncats-frontend-library-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
  ],
})
export class ForgotPasswordModalComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);
  destroyRef = inject(DestroyRef);

  loginError = '';
  emailSent = false;

  signOnForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    public dialogRef: MatDialogRef<ForgotPasswordModalComponent>,
    public dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.store
      .pipe(
        select(UserSelectors.getUsersError),
        takeUntilDestroyed(this.destroyRef),
        map((res: string | null | undefined) => {
          if (res) {
            this.loginError = res;
          }
        }),
      )
      .subscribe();

    this.store
      .pipe(
        select(UserSelectors.getEmail),
        takeUntilDestroyed(this.destroyRef),
        map((res: string | null | undefined) => {
          if (res === 'reset') {
            this.emailSent = true;
            this.signOnForm.reset();
          }
        }),
      )
      .subscribe();
  }

  getEmailErrorMessage() {
    if (this.signOnForm.controls['email'].hasError('required')) {
      return 'Email address required';
    }
    return this.signOnForm.controls['email'].hasError('email')
      ? 'Not a valid email'
      : '';
  }

  send() {
    if (this.signOnForm.valid) {
      this.store.dispatch(
        ResetPasswordEmailActions.resetPasswordEmail(this.signOnForm.value),
      );
    }
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.loginError = '';
  }
}
