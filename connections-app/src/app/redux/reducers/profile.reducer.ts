import { createReducer, on } from '@ngrx/store';

import * as ProfileActions from '../actions/profile.actions';
import { initialProfileState, ProfileState } from '../state/profile.state';

export const profileReducer = createReducer(
  initialProfileState,
  on(
    ProfileActions.getProfile,
    (state): ProfileState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    ProfileActions.getProfileSuccess,
    (state, { response }): ProfileState => ({
      ...state,
      data: {
        uid: response.uid.S,
        name: response.name.S,
        email: response.email.S,
        createdAt: response.createdAt.S,
      },
      loading: false,
      error: null,
    })
  ),
  on(
    ProfileActions.getProfileFailure,
    (state, error): ProfileState => ({
      ...state,
      loading: false,
      error: error.error,
    })
  ),
  on(
    ProfileActions.updateProfile,
    (state): ProfileState => ({
      ...state,
      loading: true,
      error: null,
    })
  ),
  on(
    ProfileActions.updateProfileSuccess,
    (state, { name }): ProfileState => ({
      ...state,
      data: {
        ...state.data,
        name,
      },
      loading: false,
      error: null,
    })
  ),
  on(
    ProfileActions.updateProfileFailure,
    (state, error): ProfileState => ({
      ...state,
      loading: false,
      error: error.error,
    })
  ),
  on(
    ProfileActions.removeProfileInfoFromState,
    (): ProfileState => ({
      ...initialProfileState,
    })
  )
);
