import { createReducer, on } from '@ngrx/store';

import * as MessagesActions from '../actions/messages.actions';
import {
  initialMessagesState,
  MessageItem,
  MessagesState,
} from '../state/messages.state';

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
    (state, { response, groupId }): MessagesState => {
      const normalizedData: {
        [id: string]: { messages: MessageItem[]; timestamp: number };
      } = {};

      response.Items.forEach(item => {
        const messageItem: MessageItem = {
          authorID: item.authorID.S,
          message: item.message.S,
          createdAt: item.createdAt.S,
        };

        if (!normalizedData[groupId]) {
          normalizedData[groupId] = { messages: [], timestamp: Date.now() };
        }

        normalizedData[groupId].messages.push(messageItem);
      });

      return {
        ...state,
        items: {
          ...state.items,
          ...normalizedData,
        },
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
