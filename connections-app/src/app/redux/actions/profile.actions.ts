import { createAction, props } from '@ngrx/store';
import {
  ApiError,
  SuccessProfileResponse,
} from 'src/app/models/response.models';

export const getProfile = createAction(
  '[Profile] Get Profile',
  props<{ email: string; uid: string; token: string }>()
);

export const getProfileSuccess = createAction(
  '[Profile] Get Profile Success',
  props<{ response: SuccessProfileResponse }>()
);

export const getProfileFailure = createAction(
  '[Profile] Get Profile Failure',
  props<{ error: ApiError }>()
);

export const updateProfile = createAction(
  '[Profile] Update Profile',
  props<{ email: string; uid: string; token: string; name: string }>()
);

export const updateProfileSuccess = createAction(
  '[Profile] Update Profile Success',
  props<{ name: string }>()
);

export const updateProfileFailure = createAction(
  '[Profile] Update Profile Failure',
  props<{ error: ApiError }>()
);
