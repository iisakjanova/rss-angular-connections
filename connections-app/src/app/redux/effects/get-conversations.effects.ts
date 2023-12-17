import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ConversationService } from 'src/app/services/conversation/conversation.service';

import * as ConversationsActions from '../actions/conversations.actions';

@Injectable()
export class GetConversationsEffects {
  getConversations$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ConversationsActions.getConversations),
      switchMap(action =>
        this.conversationsService
          .getConversations(action.email, action.uid, action.token)
          .pipe(
            map(response => {
              return ConversationsActions.getConversationsSuccess({
                response,
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
                `Fetching people failed: ${message}`,
                'Close',
                {
                  duration: 5000,
                  panelClass: ['error-snackbar'],
                }
              );
              return of(ConversationsActions.getConversationsFailure(error));
            })
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private conversationsService: ConversationService,
    private snackBar: MatSnackBar
  ) {}
}
