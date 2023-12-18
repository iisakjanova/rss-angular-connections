import { createAction, props } from '@ngrx/store';
import {
  ApiError,
  ApiFailureError,
  SuccessConversationsResponse,
} from 'src/app/models/response.models';

export const getConversations = createAction(
  '[Conversations] Get Conversations',
  props<{ email: string; uid: string; token: string }>()
);

export const getConversationsSuccess = createAction(
  '[Conversations] Get Conversations Success',
  props<{ response: SuccessConversationsResponse }>()
);

export const getConversationsFailure = createAction(
  '[Conversations] Get Conversations Failure',
  props<{ error: ApiError }>()
);

export const createConversation = createAction(
  '[Conversations] Create Conversation'
);

export const createConversationSuccess = createAction(
  '[Conversations] Create Conversation Success',
  props<{ response: { conversationID: string }; companion: string }>()
);

export const createConversationFailure = createAction(
  '[Conversations] Create Conversation Failure',
  props<{ error: ApiFailureError }>()
);
