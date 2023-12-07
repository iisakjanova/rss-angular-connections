import { ApiError } from '../models/response.models';

export interface ProfileState {
  data: {
    uid: string;
    email: string;
    name: string;
    createdAt: string;
  };
  loading: boolean;
  error: null | ApiError;
}

export const initialProfileState: ProfileState = {
  data: {
    uid: '',
    email: '',
    name: '',
    createdAt: '',
  },
  loading: false,
  error: null,
};
