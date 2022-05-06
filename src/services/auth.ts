import { CommonResponse } from 'types/common';
import { UserInfo } from 'types/user';
import HttpClient from 'utils/HttpClient';
export interface LoginParams {
  username: string;
  password: string;
  rememberMe?: boolean;
}

interface ForgotPasswordResponse {
  status: string;
  message?: string;
}

export interface ResetPasswordParams {
  email: string | (string | null)[] | null;
  resetToken: string | undefined | (string | null)[] | null;
  password: string;
}
export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  error: string;
  error_description: string;
}

export const apiLogin = async (params: LoginParams) => {
  // return HttpClient.post<typeof params, LoginResponse>(
  //   'login',
  //   stringify(params)
  // );
  return new Promise<LoginResponse>((res, rej) => {
    return setTimeout(
      () =>
        res({
          access_token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRoZXRhY2h5b24xMDdAZ21haWwuY29tIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6IlNBIn0.Xgx4QtkRi_H9Trf_22BCufN3h6cAz5hHpXjUVAEYhBE',
          refresh_token: '123213afasfasfasfa1111',
          expires_in: 3600,
          token_type: 'Bearer',
          scope: 'view edit',
          error: '',
          error_description: '',
        }),
      2000
    );
  });
};

export const apiSendPasswordResetCode = async (email: string) => {
  return HttpClient.post<typeof email, ForgotPasswordResponse>(
    'app/cus-account/send-password-reset-code',
    {
      email,
      appName: 'MVC',
      returnUrl: null,
      returnUrlHash: null,
    }
  );
};

export const apiResetPassword = async (params: ResetPasswordParams) => {
  return HttpClient.post<typeof params, ForgotPasswordResponse>(
    'app/cus-account/reset-password',
    params
  );
};

export const getUserDetails = async () => {
  return HttpClient.get<null, CommonResponse<UserInfo>>(
    '/Shared/User/GetUserDetails'
  );
};
