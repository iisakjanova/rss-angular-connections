import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectRegistrationError,
  selectRegistrationLoading,
} from 'src/app/redux/selectors/registration.selectors';

import * as RegistrationActions from '../../redux/actions/registration.actions';

export const passwordStrengthValidator = (
  control: AbstractControl
): ValidationErrors | null => {
  const { value } = control;

  // Define regular expressions for each requirement.
  const lengthRegex = /(?=.{8,})/;
  const uppercaseRegex = /(?=.*[A-Z])/;
  const digitRegex = /(?=.*\d)/;
  const specialCharRegex = /(?=.*[!@#$%^&*(),.?":{}|<>])/;

  // Check if the password meets all the requirements.
  const errors: ValidationErrors = {};

  if (!lengthRegex.test(value)) {
    errors['minLength'] = '- Password should have at least 8 characters';
  }

  if (!uppercaseRegex.test(value)) {
    errors['uppercase'] =
      '- Password should include at least one uppercase letter';
  }

  if (!digitRegex.test(value)) {
    errors['digit'] = '- Password should include at least one number';
  }

  if (!specialCharRegex.test(value)) {
    errors['specialChar'] =
      '- Password should include at least one special character';
  }

  if (Object.keys(errors).length > 0) {
    // Password didn't meet one or more requirements, set 'passwordStrength'.
    errors['passwordStrength'] = "Your password isn't strong enough:";
  }

  return Object.keys(errors).length > 0 ? errors : null;
};

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;

  loading$ = this.store.select(selectRegistrationLoading);

  error$ = this.store.select(selectRegistrationError);

  submittedEmailValue = '';

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordStrengthValidator]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { firstName, email, password } = this.form.value;
      this.submittedEmailValue = this.form.get('email')?.value;
      this.store.dispatch(
        RegistrationActions.registerUser({ name: firstName, email, password })
      );
    }
  }
}
