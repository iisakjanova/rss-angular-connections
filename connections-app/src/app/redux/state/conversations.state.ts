import { ApiError } from '../../models/response.models';

export interface ConversationItem {
  id: string;
  companionID: string;
}

export interface ConversationsState {
  items: ConversationItem[];
  loading: boolean;
  error: null | ApiError;
}

export const initialConversationsState: ConversationsState = {
  items: [],
  loading: false,
  error: null,
};
