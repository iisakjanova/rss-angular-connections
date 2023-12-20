import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectLoginError,
  selectLoginLoading,
} from 'src/app/redux/selectors/login.selectors';

import * as LoginActions from '../../redux/actions/login.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  loading$ = this.store.select(selectLoginLoading);

  error$ = this.store.select(selectLoginError);

  submittedEmailValue = '';

  submittedPasswordValue = '';

  hide = true;

  constructor(
    private fb: FormBuilder,
    private store: Store
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      this.submittedEmailValue = this.form.get('email')?.value;
      this.submittedPasswordValue = this.form.get('password')?.value;
      this.store.dispatch(LoginActions.loginUser({ email, password }));
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
}
