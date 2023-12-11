import { createFeatureSelector, createSelector } from '@ngrx/store';

import { RegistrationState } from '../state/registration.state';

export const selectRegistrationState =
  createFeatureSelector<RegistrationState>('registration');

export const selectRegistrationLoading = createSelector(
  selectRegistrationState,
  state => state.loading
);

export const selectRegistrationError = createSelector(
  selectRegistrationState,
  state => state.error
);
