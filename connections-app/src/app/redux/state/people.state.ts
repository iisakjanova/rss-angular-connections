import { ApiError } from '../../models/response.models';

export interface PeopleItem {
  uid: string;
  name: string;
}

export interface PeopleState {
  items: PeopleItem[];
  chosenPerson: string;
  loading: boolean;
  error: null | ApiError;
}

export const initialPeopleState: PeopleState = {
  items: [],
  chosenPerson: '',
  loading: false,
  error: null,
};
