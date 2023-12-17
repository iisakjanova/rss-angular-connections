import { createAction, props } from '@ngrx/store';
import {
  ApiError,
  SuccessPeopleResponse,
} from 'src/app/models/response.models';

export const getPeople = createAction(
  '[People] Get People',
  props<{ email: string; uid: string; token: string }>()
);

export const getPeopleSuccess = createAction(
  '[People] Get People Success',
  props<{ response: SuccessPeopleResponse }>()
);

export const getPeopleFailure = createAction(
  '[People] Get People Failure',
  props<{ error: ApiError }>()
);

export const addChosenPerson = createAction(
  '[People] Add ChosenPerson',
  props<{ uid: string }>()
);
