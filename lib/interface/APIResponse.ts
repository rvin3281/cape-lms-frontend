export interface APIBaseSuccessResponse {
  success: string;
  code: string;
  message: string;
  timestamp: string;
  path: string;
}

export interface APIObjectSuccessResponse<T> extends APIBaseSuccessResponse {
  data: T;
}

export interface APIListSuccessResponse<T> extends APIBaseSuccessResponse {
  data: T[];
}
