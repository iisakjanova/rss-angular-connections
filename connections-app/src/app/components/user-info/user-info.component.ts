import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Store } from '@ngrx/store';

import * as ProfileActions from '../../redux/actions/profile.actions';

@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token') || '';
    const email = localStorage.getItem('email') || '';
    const uid = localStorage.getItem('uid') || '';
    this.store.dispatch(ProfileActions.getProfile({ email, uid, token }));
  }
}
