import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { ConversationService } from 'src/app/services/conversation/conversation.service';

import * as ConversationsActions from '../actions/conversations.actions';

@Injectable()
export class CreateConversationEffects {
  createConversationSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ConversationsActions.createConversationSuccess),
        tap(() => {
          this.snackBar.open('Conversation is created!', 'Close', {
            duration: 5000,
            panelClass: ['success-snackbar'],
          });
        })
      );
    },
    { dispatch: false }
  );

  createConversationFailure$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(ConversationsActions.createConversationFailure),
        tap(action => {
          let message = '';

          if (!action.error) {
            message = `Something is wrong. Try again, please!`;
          } else {
            message = action.error.message;
          }
          this.snackBar.open(
            `Creating a conversation failed: ${message}`,
            'Close',
            {
              duration: 5000,
              panelClass: ['error-snackbar'],
            }
          );
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private conversationService: ConversationService,
    private snackBar: MatSnackBar
  ) {}
}
