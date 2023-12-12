import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  selectGroups,
  selectGroupsError,
} from 'src/app/redux/selectors/groups.selectors';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CountdownService } from 'src/app/services/countdown/countdown.service';

import * as GroupsActions from '../../redux/actions/groups.actions';

@Component({
  selector: 'app-group-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupListComponent implements OnInit {
  list$ = this.store.select(selectGroups);

  countdown$ = this.countdownService.countdown$;

  error$ = this.store.select(selectGroupsError);

  constructor(
    private store: Store,
    private authService: AuthService,
    private countdownService: CountdownService
  ) {}

  ngOnInit(): void {
    this.list$.subscribe(list => {
      if (list.length === 0) {
        this.getGroups();
      }
    });
  }

  getGroups() {
    const credentials = this.authService.getCredentials();
    this.store.dispatch(GroupsActions.getGroups(credentials));
  }

  update() {
    this.getGroups();
    this.error$.subscribe(error => {
      if (!error) {
        this.countdownService.startCountdown();
      }
    });
  }
}
