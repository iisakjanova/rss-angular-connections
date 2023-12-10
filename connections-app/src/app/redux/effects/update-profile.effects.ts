import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProfileService } from 'src/app/services/profile/profile.service';

import * as ProfileActions from '../actions/profile.actions';

@Injectable()
export class UpdateProfileEffects {
  updateProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProfileActions.updateProfile),
      switchMap(action =>
        this.profileService
          .updateProfile(action.email, action.uid, action.token, action.name)
          .pipe(
            map(() => {
              this.snackBar.open(`Update successful!`, 'Close', {
                duration: 5000,
                panelClass: ['success-snackbar'],
              });

              return ProfileActions.updateProfileSuccess({
                name: action.name,
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
                `Update user info failed: ${message}`,
                'Close',
                {
                  duration: 5000,
                  panelClass: ['error-snackbar'],
                }
              );
              return of(ProfileActions.updateProfileFailure(error));
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
