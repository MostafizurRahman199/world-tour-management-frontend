export interface ISentOTP {
  email : string;
}

export interface ISendOtpResponse<T = null> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

// Request payload interface
export interface VerifyOtpRequest {
  email: string;
  otp: string;
}

// Success response
export interface VerifyOtpSuccessResponse {
  success: true;
  statusCode: 200;
  message: string;
  data: null;
}

// Failure response
export interface VerifyOtpErrorResponse {
  success: false;
  statusCode: 400;
  message: string;
}

// Union type for all possible responses
export type VerifyOtpResponse = VerifyOtpSuccessResponse | VerifyOtpErrorResponse;
