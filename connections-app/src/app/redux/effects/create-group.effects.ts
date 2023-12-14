import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { GroupsService } from 'src/app/services/groups/groups.service';
import { ModalService } from 'src/app/services/modal/modal.service';

import * as GroupsActions from '../actions/groups.actions';

@Injectable()
export class CreateGroupEffects {
  creategroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupsActions.createGroup),
      switchMap(action =>
        this.groupsService
          .createGroup(action.email, action.uid, action.token, action.name)
          .pipe(
            map(response => {
              this.snackBar.open(`Group is created!`, 'Close', {
                duration: 5000,
                panelClass: ['success-snackbar'],
              });

              return GroupsActions.createGroupSuccess({
                response: {
                  ...response,
                  name: action.name,
                  createdAt: action.createdAt,
                  createdBy: action.uid,
                },
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
                `Creating a group failed: ${message}`,
                'Close',
                {
                  duration: 5000,
                  panelClass: ['error-snackbar'],
                }
              );
              return of(GroupsActions.getGroupsFailure(error));
            })
          )
      )
    );
  });

  closeDialogOnSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(GroupsActions.createGroupSuccess),
        tap(() => {
          this.modalService.closeDialog();
          return []; // return an empty array to signal the effect is done
        })
      );
    },
    { dispatch: false } // This effect doesn't dispatch any new actions
  );

  constructor(
    private actions$: Actions,
    private groupsService: GroupsService,
    private snackBar: MatSnackBar,
    private modalService: ModalService
  ) {}
}
