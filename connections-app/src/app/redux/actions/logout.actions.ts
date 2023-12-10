import { createAction, props } from '@ngrx/store';
import {
  ApiError,
  SuccessLogoutResponse,
} from 'src/app/models/response.models';

export const logoutUser = createAction(
  '[Logout] Logout User',
  props<{ email: string; uid: string; token: string }>()
);

export const logoutUserSuccess = createAction(
  '[Logout] Logout User Success',
  props<{ response: SuccessLogoutResponse }>()
);

export const logoutUserFailure = createAction(
  '[Logout] Logout User Failure',
  props<{ error: ApiError }>()
);
