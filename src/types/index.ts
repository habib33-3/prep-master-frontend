export interface SuccessResponse<T> {
  status: number;
  message: string;
  path: string;
  data: T;
  timestamp: string;
}
