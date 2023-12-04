import { ApiError } from '../models/response.models';

export interface LoginState {
  loading: boolean;
  error: null | ApiError;
}

export const initialLoginState: LoginState = {
  loading: false,
  error: null,
};
