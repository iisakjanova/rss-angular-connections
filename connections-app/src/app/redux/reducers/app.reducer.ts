import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../app.state';
import { loginReducer } from './login.reducer';
import { profileReducer } from './profile.reducer';
import { registrationReducer } from './registration.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  registration: registrationReducer,
  login: loginReducer,
  profile: profileReducer,
};
