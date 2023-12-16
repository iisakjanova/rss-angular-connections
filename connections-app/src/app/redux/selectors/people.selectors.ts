import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PeopleState } from '../state/people.state';

export const selectPeopleState = createFeatureSelector<PeopleState>('people');

export const selectPeopleLoading = createSelector(
  selectPeopleState,
  state => state.loading
);

export const selectPeopleError = createSelector(
  selectPeopleState,
  state => state.error
);

export const selectPeople = createSelector(
  selectPeopleState,
  state => state.items
);
