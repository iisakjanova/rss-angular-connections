import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ProfileState } from '../profile.state';

export const selectProfileState =
  createFeatureSelector<ProfileState>('profile');

export const selectProfileLoading = createSelector(
  selectProfileState,
  state => state.loading
);

export const selectProfileError = createSelector(
  selectProfileState,
  state => state.error
);

export const selectProfileData = createSelector(
  selectProfileState,
  state => state.data
);
