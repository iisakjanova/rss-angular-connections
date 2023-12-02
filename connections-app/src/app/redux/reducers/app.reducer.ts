import { ActionReducerMap } from '@ngrx/store';

import { AppState } from '../app.state';
import { registrationReducer } from './registration.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  registration: registrationReducer,
};
