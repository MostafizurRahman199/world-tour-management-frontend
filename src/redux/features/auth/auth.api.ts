// src/redux/features/auth/auth.api.ts



import { baseApi } from "@/redux/baseApi";
import type {  ISendOtpResponse, ISentOTP, VerifyOtpRequest, VerifyOtpResponse } from "@/types/auth.type";



export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerApi: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),

    loginApi: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
      }),
    }),

    // SEND OTP
    sendOtpApi: builder.mutation<ISendOtpResponse, ISentOTP>({
      query: (payload) => ({
        url: "/otp/send",
        method: "POST",
        data: payload, // { email }
      }),
    }),

    // VERIFY OTP
    verifyOtpApi: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (payload) => ({
        url: "/otp/verify",
        method: "POST",
        data: payload, // { email, otp }
      }),
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
    }),

  }),
});

export const {
  useRegisterApiMutation,
  useLoginApiMutation,
  useSendOtpApiMutation,
  useVerifyOtpApiMutation,
  useUserInfoQuery,
} = authApi;
