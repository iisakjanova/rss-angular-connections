import { createReducer, on } from '@ngrx/store';

import * as LoginActions from '../actions/login.actions';
import { initialLogoutState, LogoutState } from '../logout.state';

export const logoutReducer = createReducer(
  initialLogoutState,
  on(
    LoginActions.loginUser,
    (state): LogoutState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    LoginActions.loginUserSuccess,
    (state): LogoutState => ({
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(
    LoginActions.loginUserFailure,
    (state, error): LogoutState => ({
      ...state,
      loading: false,
      error: error.error,
    })
  )
);
