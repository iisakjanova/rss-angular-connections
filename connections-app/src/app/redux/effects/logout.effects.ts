import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LogoutService } from 'src/app/services/logout/logout.service';

import * as LogoutActions from '../actions/logout.actions';

@Injectable()
export class LogoutEffects {
  logoutUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LogoutActions.logoutUser),
      switchMap(action =>
        this.logoutService
          .logoutUser(action.email, action.uid, action.token)
          .pipe(
            map(response => {
              localStorage.removeItem('token');
              localStorage.removeItem('uid');
              localStorage.removeItem('email');
              this.snackBar.open(`Logout successful!`, 'Close', {
                duration: 5000,
                panelClass: ['success-snackbar'],
              });
              const redirectUrl = '/signin';

              const navigationExtras: NavigationExtras = {
                queryParamsHandling: 'preserve',
              };

              this.router.navigate([redirectUrl], navigationExtras);
              return LogoutActions.logoutUserSuccess({ response });
            }),
            catchError(error => {
              this.snackBar.open(
                `Logout failed: ${error.error.message}`,
                'Close',
                {
                  duration: 5000,
                  panelClass: ['error-snackbar'],
                }
              );
              return of(LogoutActions.logoutUserFailure(error));
            })
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private logoutService: LogoutService,
    private snackBar: MatSnackBar,
    public router: Router
  ) {}
}
