export interface ApiResponse<T> {
  status: number;
  data: T;
}

export interface ApiError {
  type: string;
}

export interface ApiFailureError {
  type: string;
  message: string;
}

export interface SuccessRegistrationResponse {
  statusCode: number;
}

export interface SuccessLogoutResponse {
  statusCode: number;
}

export interface SuccessLoginResponse {
  statusCode: number;
  uid: string;
  token: string;
}

export interface SuccessProfileResponse {
  uid: { S: string };
  email: { S: string };
  name: { S: string };
  createdAt: { S: string };
}

export interface Group {
  id: { S: string };
  name: { S: string };
  createdAt: { S: string };
  createdBy: { S: string };
}

export interface SuccessGroupsResponse {
  Count: number;
  Items: Group[];
}

export interface SuccessCreateGroupResponse {
  groupID: string;
  name: string;
  createdAt: string;
  createdBy: string;
}

export interface Person {
  uid: { S: string };
  name: { S: string };
}

export interface SuccessPeopleResponse {
  Count: number;
  Items: Person[];
}

export interface Conversation {
  id: { S: string };
  companionID: { S: string };
}

export interface SuccessConversationsResponse {
  Count: number;
  Items: Conversation[];
}

export interface Message {
  authorID: { S: string };
  message: { S: string };
  createdAt: { S: string };
}

export interface SuccessMessagesResponse {
  Count: number;
  Items: Message[];
}
