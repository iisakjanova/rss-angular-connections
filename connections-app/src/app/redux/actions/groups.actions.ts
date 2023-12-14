import { createAction, props } from '@ngrx/store';
import {
  ApiError,
  SuccessCreateGroupResponse,
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

export const createGroup = createAction(
  '[Groups] Create Group',
  props<{ email: string; uid: string; token: string; name: string }>()
);

export const createGroupSuccess = createAction(
  '[Groups] Create Group Success',
  props<{ response: SuccessCreateGroupResponse }>()
);

export const createGroupFailure = createAction(
  '[Groups] Create Group Failure',
  props<{ error: ApiError }>()
);
