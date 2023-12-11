import { ApiError } from '../../models/response.models';

export interface RegistrationState {
  loading: boolean;
  error: null | ApiError;
}

export const initialRegistrationState: RegistrationState = {
  loading: false,
  error: null,
};
