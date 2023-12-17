import { createAction, props } from '@ngrx/store';
import {
  ApiError,
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
