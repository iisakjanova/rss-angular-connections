import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  combineLatest,
  map,
  Observable,
  of,
  Subscription,
  switchMap,
  take,
} from 'rxjs';
import * as MessagesActions from 'src/app/redux/actions/messages.actions';
import { selectGroupById } from 'src/app/redux/selectors/groups.selectors';
import {
  selectMessages,
  selectMessagesError,
  selectMessagesLoading,
} from 'src/app/redux/selectors/messages.selectors';
import { selectPeople } from 'src/app/redux/selectors/people.selectors';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CountdownService } from 'src/app/services/countdown/countdown.service';
import { DeleteModalService } from 'src/app/services/delete-modal/delete-modal.service';

interface MessageItemFull {
  name: string;
  message: string;
  createdAt: string;
}

@Component({
  selector: 'app-group-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './group-dialog.component.html',
  styleUrls: ['./group-dialog.component.scss'],
})
export class GroupDialogComponent implements OnInit {
  countdown$ = this.countdownService.groupDialogCountdown$;

  loading$ = this.store.select(selectMessagesLoading);

  error$ = this.store.select(selectMessagesError);

  private errorSubscription: Subscription | undefined;

  private credentials;

  groupId!: string;

  isCurrentUser$: Observable<boolean>;

  list$ = this.store.select(selectMessages);

  users$ = this.store.select(selectPeople);

  items$: Observable<MessageItemFull[]> = combineLatest([
    this.list$,
    this.users$,
  ]).pipe(
    map(([messages, users]) =>
      messages.map(message => ({
        ...message,
        name:
          users.find(user => user.uid === message.authorID)?.name || 'Unknown',
      }))
    )
  );

  constructor(
    private countdownService: CountdownService,
    private store: Store,
    private authService: AuthService,
    private route: ActivatedRoute,
    private deleteModalService: DeleteModalService
  ) {
    this.credentials = this.authService.getCredentials();
    this.route.params.subscribe(params => {
      this.groupId = params['groupID'];
    });

    this.isCurrentUser$ = this.isCurrentUser();
  }

  ngOnInit(): void {
    this.list$.subscribe(list => {
      if (list.length === 0) {
        this.getMessages();
      }
    });
  }

  get group$() {
    return this.store.select(selectGroupById(this.groupId));
  }

  getMessages() {
    this.store.dispatch(
      MessagesActions.getMessages({
        ...this.credentials,
        groupID: this.groupId,
      })
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
        this.countdownService.startGroupDialogCountdown();
      } else {
        this.countdownService.stopGroupDialogCountdown();
        this.countdownService.resetGroupDialogCountdown();
      }
    });

    this.getMessages();
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

  isCurrentUser(): Observable<boolean> {
    return this.group$.pipe(
      take(1),
      switchMap(group => {
        const createdBy = group?.createdBy || '';
        return of(this.credentials.uid === createdBy);
      })
    );
  }

  onDeleteButtonClick() {
    this.deleteModalService.openDialog(this.groupId);
  }

  getUserNameById(userId: string): Observable<string | undefined> {
    return this.users$.pipe(
      take(1),
      switchMap(users => of(users.find(user => user.uid === userId))),
      map(user => user?.name ?? 'DefaultName')
    );
  }
}
