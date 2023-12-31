import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import * as LogoutActions from 'src/app/redux/actions/logout.actions';
import * as ProfileActions from 'src/app/redux/actions/profile.actions';
import { selectLogoutLoading } from 'src/app/redux/selectors/logout.selectors';
import {
  selectProfileData,
  selectProfileLoading,
} from 'src/app/redux/selectors/profile.selectors';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  profileData$ = this.store.select(selectProfileData);

  loading$ = this.store.select(selectProfileLoading);

  logoutLoading$ = this.store.select(selectLogoutLoading);

  profileForm!: FormGroup;

  isEditing = false;

  editedName = '';

  initialFormValues = {};

  constructor(
    private store: Store,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z\s]*$/),
          Validators.maxLength(40),
        ],
      ],
    });

    this.profileData$.subscribe(profileData => {
      if (profileData) {
        this.profileForm.patchValue({
          name: profileData.name || '',
        });
      }

      if (!profileData.uid) {
        const credentials = this.authService.getCredentials();

        if (credentials.email && credentials.uid && credentials.token) {
          this.store.dispatch(ProfileActions.getProfile(credentials));
        }
      }
    });
  }

  startEditing() {
    this.isEditing = true;
    this.initialFormValues = { ...this.profileForm.value };
  }

  saveChanges() {
    const credentials = this.authService.getCredentials();
    const params = { ...credentials, name: this.profileForm.value.name };

    this.store.dispatch(ProfileActions.updateProfile(params));
  }

  cancelEditing() {
    this.isEditing = false;
    this.profileForm.patchValue(this.initialFormValues);
  }

  logout() {
    const credentials = this.authService.getCredentials();
    this.store.dispatch(LogoutActions.logoutUser(credentials));
  }
}
