import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile/profile.service';

import * as ProfileActions from '../actions/profile.actions';

@Injectable()
export class GetProfileEffects {
  getProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.getProfile),
      switchMap(action =>
        this.profileService
          .getProfile(action.email, action.uid, action.token)
          .pipe(
            map(response => {
              this.snackBar.open(`Fetching user info successful!`, 'Close', {
                duration: 5000,
                panelClass: ['success-snackbar'],
              });

              return ProfileActions.getProfileSuccess({
                response,
              });
            }),
            catchError(error => {
              this.snackBar.open(
                `Fetching user info failed: ${error.error.message}`,
                'Close',
                {
                  duration: 5000,
                  panelClass: ['error-snackbar'],
                }
              );
              return of(ProfileActions.getProfileFailure(error));
            })
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private profileService: ProfileService,
    private snackBar: MatSnackBar
  ) {}
}
