import { createAction, props } from '@ngrx/store';
import {
  ApiError,
  SuccessRegistrationResponse,
} from 'src/app/models/response.models';

export const registerUser = createAction(
  '[Registration] Register User',
  props<{ email: string; name: string; password: string }>()
);

export const registerUserSuccess = createAction(
  '[Registration] Register User Success',
  props<{ response: SuccessRegistrationResponse }>()
);

export const registerUserFailure = createAction(
  '[Registration] Register User Failure',
  props<{ error: ApiError }>()
);
