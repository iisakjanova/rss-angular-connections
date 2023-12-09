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
import { selectProfileData } from 'src/app/redux/selectors/profile.selectors';
import { AuthService } from 'src/app/services/auth/auth.service';

import * as ProfileActions from '../../redux/actions/profile.actions';

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

  profileForm!: FormGroup;

  isEditing = false;

  editedName = '';

  constructor(
    private store: Store,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.profileData$.subscribe(profileData => {
      if (profileData) {
        this.profileForm.patchValue({
          name: profileData.name || '',
        });
      }

      if (!profileData.uid) {
        const credentials = this.authService.getCredentials();
        this.store.dispatch(ProfileActions.getProfile(credentials));
      }
    });
  }

  startEditing() {
    this.isEditing = true;
  }

  saveChanges() {
    this.isEditing = false;
  }

  cancelEditing() {
    this.isEditing = false;
  }
}