import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NavigationExtras, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RegistrationService } from 'src/app/services/registration/registration.service';

import * as RegistrationActions from '../actions/registration.actions';

@Injectable()
export class RegistrationEffects {
  registerUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegistrationActions.registerUser),
      switchMap(action =>
        this.registrationService
          .registerUser(action.email, action.name, action.password)
          .pipe(
            map(() => {
              this.snackBar.open(`Registration successful!`, 'Close', {
                duration: 5000,
                panelClass: ['success-snackbar'],
              });
              const redirectUrl = '/signin';

              const navigationExtras: NavigationExtras = {
                queryParamsHandling: 'preserve',
              };

              this.router.navigate([redirectUrl], navigationExtras);
              return RegistrationActions.registerUserSuccess();
            }),
            catchError(error => {
              let message = '';

              if (!error.error.message) {
                message = `No internet connection`;
              } else {
                message = error.error.message;
              }

              this.snackBar.open(`Registration failed: ${message}`, 'Close', {
                duration: 5000,
                panelClass: ['error-snackbar'],
              });
              return of(RegistrationActions.registerUserFailure(error));
            })
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private registrationService: RegistrationService,
    private snackBar: MatSnackBar,
    public router: Router
  ) {}
}
