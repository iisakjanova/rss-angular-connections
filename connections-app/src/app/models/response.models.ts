export interface ApiResponse<T> {
  status: number;
  data: T;
}

export interface ApiError {
  type: string;
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
