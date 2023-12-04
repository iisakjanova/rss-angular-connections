import { createAction, props } from '@ngrx/store';
import {
  ApiError,
  SuccessRegistrationResponse,
} from 'src/app/models/response.models';

export const loginUser = createAction(
  '[Login] Login User',
  props<{ email: string; password: string }>()
);

export const loginUserSuccess = createAction(
  '[Login] Login User Success',
  props<{ response: SuccessRegistrationResponse }>()
);

export const loginUserFailure = createAction(
  '[Login] Login User Failure',
  props<{ error: ApiError }>()
);