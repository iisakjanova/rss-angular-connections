import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PeopleService } from 'src/app/services/people/people.service';

import * as PeopleActions from '../actions/people.actions';

@Injectable()
export class GetPeopleEffects {
  getPeople$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PeopleActions.getPeople),
      switchMap(action =>
        this.peopleService
          .getPeople(action.email, action.uid, action.token)
          .pipe(
            map(response => {
              return PeopleActions.getPeopleSuccess({
                response,
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
                `Fetching people failed: ${message}`,
                'Close',
                {
                  duration: 5000,
                  panelClass: ['error-snackbar'],
                }
              );
              return of(PeopleActions.getPeopleFailure(error));
            })
          )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private peopleService: PeopleService,
    private snackBar: MatSnackBar
  ) {}
}
