import { ApiError } from '../../models/response.models';

export interface PeopleItem {
  uid: string;
  name: string;
}

export interface PeopleState {
  items: PeopleItem[];
  loading: boolean;
  error: null | ApiError;
}

export const initialPeopleState: PeopleState = {
  items: [],
  loading: false,
  error: null,
};
