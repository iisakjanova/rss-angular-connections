import { createAction, props } from '@ngrx/store';
import {
  ApiError,
  SuccessGroupsResponse,
} from 'src/app/models/response.models';

export const getGroups = createAction(
  '[Groups] Get Groups',
  props<{ email: string; uid: string; token: string }>()
);

export const getGroupsSuccess = createAction(
  '[Groups] Get Groups Success',
  props<{ response: SuccessGroupsResponse }>()
);

export const getGroupsFailure = createAction(
  '[Groups] Get Groups Failure',
  props<{ error: ApiError }>()
);
