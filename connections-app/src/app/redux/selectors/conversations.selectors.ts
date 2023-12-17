import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ConversationsState } from '../state/conversations.state';

export const selectConversationsState =
  createFeatureSelector<ConversationsState>('conversations');

export const selectConversationsLoading = createSelector(
  selectConversationsState,
  state => state.loading
);

export const selectConversationsError = createSelector(
  selectConversationsState,
  state => state.error
);

export const selectConversations = createSelector(
  selectConversationsState,
  state => state.items
);
