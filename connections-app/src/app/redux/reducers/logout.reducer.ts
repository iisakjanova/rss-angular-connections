import { createReducer, on } from '@ngrx/store';

import * as LogoutActions from '../actions/logout.actions';
import { initialLogoutState, LogoutState } from '../logout.state';

export const logoutReducer = createReducer(
  initialLogoutState,
  on(
    LogoutActions.logoutUser,
    (state): LogoutState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    LogoutActions.logoutUserSuccess,
    (state): LogoutState => ({
      ...state,
      loading: false,
      error: null,
    })
  ),
  on(
    LogoutActions.logoutUserFailure,
    (state, error): LogoutState => ({
      ...state,
      loading: false,
      error: error.error,
    })
  )
);
