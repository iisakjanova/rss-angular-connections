import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  selectPeople,
  selectPeopleError,
  selectPeopleLoading,
} from 'src/app/redux/selectors/people.selectors';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CountdownService } from 'src/app/services/countdown/countdown.service';

import * as ConversationsActions from '../../redux/actions/conversations.actions';
import * as PeopleActions from '../../redux/actions/people.actions';

@Component({
  selector: 'app-people-list',
  standalone: true,
  imports: [
    CommonModule,
    MatListModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss'],
})
export class PeopleListComponent implements OnInit {
  list$ = this.store.select(selectPeople);

  countdown$ = this.countdownService.peopleCountdown$;

  error$ = this.store.select(selectPeopleError);

  loading$ = this.store.select(selectPeopleLoading);

  private errorSubscription: Subscription | undefined;

  private credentials;

  constructor(
    private store: Store,
    private authService: AuthService,
    private countdownService: CountdownService
  ) {
    this.credentials = this.authService.getCredentials();
  }

  ngOnInit(): void {
    this.list$.subscribe(list => {
      if (list.length === 0) {
        this.getPeople();
        this.getConversations();
      }
    });
  }

  getPeople() {
    this.store.dispatch(PeopleActions.getPeople(this.credentials));
  }

  getConversations() {
    this.store.dispatch(
      ConversationsActions.getConversations(this.credentials)
    );
  }

  update() {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
      this.errorSubscription = undefined;
    }

    // Subscribe to the new error$ observable
    this.errorSubscription = this.error$.subscribe(error => {
      if (!error) {
        this.countdownService.startPeopleCountdown();
      } else {
        this.countdownService.stopPeopleCountdown();
        this.countdownService.resetPeopleCountdown();
      }
    });

    this.getPeople();
    this.getConversations();
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

  onPersonClick(uid: string) {
    this.store.dispatch(PeopleActions.addChosenPerson({ uid }));
  }
}
