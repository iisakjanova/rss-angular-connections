import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { DeleteModalService } from 'src/app/services/delete-modal/delete-modal.service';
import { GroupsService } from 'src/app/services/groups/groups.service';

import * as GroupsActions from '../actions/groups.actions';

@Injectable()
export class DeleteGroupEffects {
  deleteGroup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupsActions.deleteGroup),
      switchMap(action =>
        this.groupsService
          .deleteGroup(action.email, action.uid, action.token, action.groupID)
          .pipe(
            map(() => {
              this.snackBar.open(`Group is deleted!`, 'Close', {
                duration: 5000,
                panelClass: ['success-snackbar'],
              });

              return GroupsActions.deleteGroupSuccess({
                id: action.groupID,
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
                `Deleting a group failed: ${message}`,
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
        ofType(GroupsActions.deleteGroupSuccess),
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
    private modalService: DeleteModalService
  ) {}
}
