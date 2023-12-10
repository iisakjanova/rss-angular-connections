import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { LoginService } from 'src/app/services/login/login.service';

import * as LoginActions from '../actions/login.actions';

@Injectable()
export class LoginEffects {
  loginUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginActions.loginUser),
      switchMap(action =>
        this.loginService.loginUser(action.email, action.password).pipe(
          map(response => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('uid', response.uid);
            localStorage.setItem('email', action.email);

            this.snackBar.open(`Login successful!`, 'Close', {
              duration: 5000,
              panelClass: ['success-snackbar'],
            });
            const redirectUrl = '/';

            const navigationExtras: NavigationExtras = {
              queryParamsHandling: 'preserve',
            };

            this.router.navigate([redirectUrl], navigationExtras);
            return LoginActions.loginUserSuccess({
              response,
            });
          }),
          catchError(error => {
            this.snackBar.open(
              `Login failed: ${error.error.message}`,
              'Close',
              {
                duration: 5000,
                panelClass: ['error-snackbar'],
              }
            );
            return of(LoginActions.loginUserFailure(error));
          })
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    public router: Router
  ) {}
}
