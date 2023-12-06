import { createReducer, on } from '@ngrx/store';

import * as LoginActions from '../actions/login.actions';
import { initialLoginState, LoginState } from '../login.state';

export const loginReducer = createReducer(
  initialLoginState,
  on(
    LoginActions.loginUser,
    (state): LoginState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    LoginActions.loginUserSuccess,
    (state): LoginState => ({
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(
    LoginActions.loginUserFailure,
    (state, error): LoginState => ({
      ...state,
      loading: false,
      error: error.error,
    })
  )
);
