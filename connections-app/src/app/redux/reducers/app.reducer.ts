import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { groupsReducer } from './groups.reducer';
import { loginReducer } from './login.reducer';
import { logoutReducer } from './logout.reducer';
import { profileReducer } from './profile.reducer';
import { registrationReducer } from './registration.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  registration: registrationReducer,
  login: loginReducer,
  profile: profileReducer,
  logout: logoutReducer,
  groups: groupsReducer,
};
