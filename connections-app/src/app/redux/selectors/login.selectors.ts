import { createFeatureSelector, createSelector } from '@ngrx/store';

import { LoginState } from '../state/login.state';

export const selectLoginState = createFeatureSelector<LoginState>('login');

export const selectLoginLoading = createSelector(
  selectLoginState,
  state => state.loading
);

export const selectLoginError = createSelector(
  selectLoginState,
  state => state.error
);
