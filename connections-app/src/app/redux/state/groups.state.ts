import { ApiError } from '../../models/response.models';

export interface GroupItem {
  id: string;
  name: string;
  createdAt: string;
  createdBy: string;
}

export interface GroupsState {
  items: GroupItem[];
  loading: boolean;
  error: null | ApiError;
}

export const initialGroupsState: GroupsState = {
  items: [],
  loading: false,
  error: null,
};
