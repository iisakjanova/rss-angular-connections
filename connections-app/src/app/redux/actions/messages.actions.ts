import { createAction, props } from '@ngrx/store';
import {
  ApiError,
  SuccessMessagesResponse,
} from 'src/app/models/response.models';

export const getMessages = createAction(
  '[Messages] Get Messages',
  props<{ email: string; uid: string; token: string }>()
);

export const getMessagesSuccess = createAction(
  '[Messages] Get Messages Success',
  props<{ response: SuccessMessagesResponse }>()
);

export const getMessagesFailure = createAction(
  '[Messages] Get Messages Failure',
  props<{ error: ApiError }>()
);
