import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';
import { selectProfileData } from 'src/app/redux/selectors/profile.selectors';
import { AuthService } from 'src/app/services/auth/auth.service';

import * as ProfileActions from '../../redux/actions/profile.actions';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  profileData$ = this.store.select(selectProfileData);

  constructor(
    private store: Store,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.profileData$.subscribe(profileData => {
      if (!profileData.uid) {
        const credentials = this.authService.getCredentials();
        this.store.dispatch(ProfileActions.getProfile(credentials));
      }
    });
  }
}
