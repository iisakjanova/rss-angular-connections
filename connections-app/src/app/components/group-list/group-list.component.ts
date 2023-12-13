import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  selectGroups,
  selectGroupsError,
  selectGroupsLoading,
} from 'src/app/redux/selectors/groups.selectors';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CountdownService } from 'src/app/services/countdown/countdown.service';
import { ModalService } from 'src/app/services/modal/modal.service';

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

  loading$ = this.store.select(selectGroupsLoading);

  private errorSubscription: Subscription | undefined;

  constructor(
    private store: Store,
    private authService: AuthService,
    private countdownService: CountdownService,
    private modalService: ModalService
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
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
      this.errorSubscription = undefined;
    }

    // Subscribe to the new error$ observable
    this.errorSubscription = this.error$.subscribe(error => {
      if (!error) {
        this.countdownService.startCountdown();
      } else {
        this.countdownService.stopCountdown();
        this.countdownService.resetCountdown();
      }
    });

    this.getGroups();
  }

  onCreateButtonClick() {
    this.modalService.openDialog();
  }

  // eslint-disable-next-line class-methods-use-this
  isButtonDisabled(
    loading: boolean | null,
    countdownValue: number | null
  ): boolean {
    // If loading is null, treat it as false
    const isLoading = loading !== null ? loading : false;
    // If countdownValue is null, treat it as 0
    const countdown = countdownValue !== null ? countdownValue : 0;

    return isLoading || (countdown < 60 && countdown !== 0);
  }
}
