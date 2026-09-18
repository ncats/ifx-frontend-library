import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { UserStore } from 'user-store';

@Component({
  selector: 'lib-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.scss'],
  imports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class ForgotPasswordModalComponent {
  private readonly userStore = inject(UserStore);
  destroyRef = inject(DestroyRef);
  dialog = inject(MatDialog);
  public dialogRef = inject(MatDialogRef<ForgotPasswordModalComponent>);

  loginError = '';
  emailSent = false;

  signOnForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

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
      this.userStore.sendResetEmail(this.signOnForm.value);
      this.signOnForm.reset();
      this.emailSent = true;
    }
  }

  closeModal(): void {
    this.dialogRef.close();
    this.userStore.clearError();
  }
}
