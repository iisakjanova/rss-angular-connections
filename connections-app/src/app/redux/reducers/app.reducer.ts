import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../app.state';
import { registrationReducer } from './registration.reducer';
import { loginReducer } from './login.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  registration: registrationReducer,
  login: loginReducer,
};
