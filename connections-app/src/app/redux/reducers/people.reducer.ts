import { createReducer, on } from '@ngrx/store';

import * as PeopleActions from '../actions/people.actions';
import { initialPeopleState, PeopleState } from '../state/people.state';

export const peopleReducer = createReducer(
  initialPeopleState,
  on(
    PeopleActions.getPeople,
    (state): PeopleState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(PeopleActions.getPeopleSuccess, (state, { response }): PeopleState => {
    const normalizedData = response.Items.map(item => ({
      uid: item.uid.S,
      name: item.name.S,
    }));

    return {
      ...state,
      items: normalizedData,
      loading: false,
      error: null,
    };
  }),
  on(
    PeopleActions.getPeopleFailure,
    (state, error): PeopleState => ({
      ...state,
      loading: false,
      error,
    })
  )
);
