import { createReducer, on } from '@ngrx/store';

import * as RegistrationActions from '../actions/registration.actions';
import {
  initialRegistrationState,
  RegistrationState,
} from '../registration.state';

export const registrationReducer = createReducer(
  initialRegistrationState,
  on(
    RegistrationActions.registerUser,
    (state): RegistrationState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    RegistrationActions.registerUserSuccess,
    (state): RegistrationState => ({
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(
    RegistrationActions.registerUserFailure,
    (state, { error }): RegistrationState => ({
      ...state,
      loading: false,
      error,
    })
  )
);
