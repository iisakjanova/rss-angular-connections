import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { MessagesService } from 'src/app/services/messages/messages.service';

import * as MessagesActions from '../actions/messages.actions';

@Injectable()
export class GetMessagesEffects {
  getMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(MessagesActions.getMessages),
      switchMap(action =>
        this.messagesService
          .getMessages(action.email, action.uid, action.token, action.groupID)
          .pipe(
            map(response => {
              return MessagesActions.getMessagesSuccess({
                response,
                groupId: action.groupID,
              });
            }),
            catchError(error => {
              let message = '';

              if (!error.error.message) {
                message = `Something is wrong. Try again, please!`;
              } else {
                message = error.error.message;
              }

              this.snackBar.open(
                `Fetching messages failed: ${message}`,
                'Close',
                {
                  duration: 5000,
                  panelClass: ['error-snackbar'],
                }
              );
              return of(MessagesActions.getMessagesFailure(error));
            })
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private messagesService: MessagesService,
    private snackBar: MatSnackBar
  ) {}
}
