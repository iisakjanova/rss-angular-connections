import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { RegistrationService } from 'src/app/services/registration.service';

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
            map(response =>
              RegistrationActions.registerUserSuccess({
                response: response.data,
              })
            ),
            catchError(error => {
              return of(RegistrationActions.registerUserFailure(error));
            })
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private registrationService: RegistrationService
  ) {}
}
