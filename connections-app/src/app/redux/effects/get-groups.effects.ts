import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { GroupsService } from 'src/app/services/groups/groups.service';

import * as GroupsActions from '../actions/groups.actions';

@Injectable()
export class GetGroupsEffects {
  getgroups$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GroupsActions.getGroups),
      switchMap(action =>
        this.groupsService
          .getGroups(action.email, action.uid, action.token)
          .pipe(
            map(response => {
              return GroupsActions.getGroupsSuccess({
                response,
              });
            }),
            catchError(error => {
              let message = '';

              if (!error.error.message) {
                message = `No internet connection`;
              } else {
                message = error.error.message;
              }

              this.snackBar.open(
                `Fetching groups failed: ${message}`,
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

  constructor(
    private actions$: Actions,
    private groupsService: GroupsService,
    private snackBar: MatSnackBar
  ) {}
}
