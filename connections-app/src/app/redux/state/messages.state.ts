import { ApiError } from '../../models/response.models';

export interface MessageItem {
  authorID: string;
  message: string;
  createdAt: string;
}

export interface MessagesState {
  items: MessageItem[];
  loading: boolean;
  error: null | ApiError;
}

export const initialMessagesState: MessagesState = {
  items: [],
  loading: false,
  error: null,
};
