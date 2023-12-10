import { ApiError } from '../models/response.models';

export interface LogoutState {
  loading: boolean;
  error: null | ApiError;
}

export const initialLogoutState: LogoutState = {
  loading: false,
  error: null,
};
