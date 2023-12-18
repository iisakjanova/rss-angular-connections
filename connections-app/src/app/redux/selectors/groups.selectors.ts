import { createFeatureSelector, createSelector } from '@ngrx/store';

import { GroupsState } from '../state/groups.state';

export const selectGroupsState = createFeatureSelector<GroupsState>('groups');

export const selectGroupsLoading = createSelector(
  selectGroupsState,
  state => state.loading
);

export const selectGroupsError = createSelector(
  selectGroupsState,
  state => state.error
);

export const selectGroups = createSelector(
  selectGroupsState,
  state => state.items
);

export const selectGroupById = (groupId: string) =>
  createSelector(selectGroupsState, state =>
    state.items.find(group => group.id === groupId)
  );
