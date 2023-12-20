import { createReducer, on } from '@ngrx/store';

import * as MessagesActions from '../actions/messages.actions';
import { initialMessagesState, MessagesState } from '../state/messages.state';

export const messagesReducer = createReducer(
  initialMessagesState,
  on(
    MessagesActions.getMessages,
    (state): MessagesState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    MessagesActions.getMessagesSuccess,
    (state, { response }): MessagesState => {
      const normalizedData = response.Items.map(item => ({
        authorID: item.authorID.S,
        message: item.message.S,
        createdAt: item.createdAt.S,
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
    MessagesActions.getMessagesFailure,
    (state, error): MessagesState => ({
      ...state,
      loading: false,
      error,
    })
  )
);
