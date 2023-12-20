import { createFeatureSelector, createSelector } from '@ngrx/store';

import { MessagesState } from '../state/messages.state';

export const selectMessagesState =
  createFeatureSelector<MessagesState>('messages');

export const selectMessagesLoading = createSelector(
  selectMessagesState,
  state => state.loading
);

export const selectMessagesError = createSelector(
  selectMessagesState,
  state => state.error
);

export const selectMessages = (groupID: string) =>
  createSelector(selectMessagesState, state => state.items[groupID] || []);
