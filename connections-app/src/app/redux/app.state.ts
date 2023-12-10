import { LoginState } from './login.state';
import { LogoutState } from './logout.state';
import { ProfileState } from './profile.state';
import { RegistrationState } from './registration.state';

export interface AppState {
  registration: RegistrationState;
  login: LoginState;
  profile: ProfileState;
  logout: LogoutState;
}
