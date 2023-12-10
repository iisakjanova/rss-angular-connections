import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LogoutState } from '../logout.state';

export const selectLogoutState = createFeatureSelector<LogoutState>('logout');

export const selectLogoutLoading = createSelector(
  selectLogoutState,
  state => state.loading
);

export const selectLoginError = createSelector(
  selectLogoutState,
  state => state.error
);
