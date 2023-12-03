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
