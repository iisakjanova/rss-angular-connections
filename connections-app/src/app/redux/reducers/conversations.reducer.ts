import { createReducer, on } from '@ngrx/store';

import * as ConversationsActions from '../actions/conversations.actions';
import {
  ConversationsState,
  initialConversationsState,
} from '../state/conversations.state';

export const conversationsReducer = createReducer(
  initialConversationsState,
  on(
    ConversationsActions.getConversations,
    (state): ConversationsState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    ConversationsActions.getConversationsSuccess,
    (state, { response }): ConversationsState => {
      const normalizedData = response.Items.map(item => ({
        id: item.id.S,
        companionID: item.companionID.S,
      }));

      return {
        ...state,
        items: normalizedData,
        loading: false,
        error: null,
      };
    }
  ),
  on(
    ConversationsActions.getConversationsFailure,
    (state, error): ConversationsState => ({
      ...state,
      loading: false,
      error,
    })
  )
);
