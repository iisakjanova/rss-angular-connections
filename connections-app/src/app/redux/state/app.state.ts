import { ConversationsState } from './conversations.state';
import { GroupsState } from './groups.state';
import { LoginState } from './login.state';
import { LogoutState } from './logout.state';
import { PeopleState } from './people.state';
import { ProfileState } from './profile.state';
import { RegistrationState } from './registration.state';

export interface AppState {
  registration: RegistrationState;
  login: LoginState;
  profile: ProfileState;
  logout: LogoutState;
  groups: GroupsState;
  people: PeopleState;
  conversations: ConversationsState;
}
