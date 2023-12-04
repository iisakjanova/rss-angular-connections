import { LoginState } from './login.state';
import { RegistrationState } from './registration.state';

export interface AppState {
  registration: RegistrationState;
  login: LoginState;
}
