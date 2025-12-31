// src/redux/features/auth/auth.api.ts

import { baseApi } from "@/redux/baseApi";
import type {
  ISendOtpResponse,
  ISentOTP,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "@/types/auth.type";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerApi: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
        withCredentials: true, // IMPORTANT
      }),
    }),

    loginApi: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        data: userInfo,
        withCredentials: true, // SEND + RECEIVE HTTPONLY COOKIE
      }),
    }),

    sendOtpApi: builder.mutation<ISendOtpResponse, ISentOTP>({
      query: (payload) => ({
        url: "/otp/send",
        method: "POST",
        data: payload,
        withCredentials: true,
      }),
    }),

    verifyOtpApi: builder.mutation<VerifyOtpResponse, VerifyOtpRequest>({
      query: (payload) => ({
        url: "/otp/verify",
        method: "POST",
        data: payload,
        withCredentials: true,
      }),
    }),

    userInfo: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
        withCredentials: true,
      }),
      invalidatesTags: ["User"],
    }),

    
  }),
});

export const {
  useRegisterApiMutation,
  useLoginApiMutation,
  useSendOtpApiMutation,
  useVerifyOtpApiMutation,
  useUserInfoQuery,
  useLogoutMutation,
} = authApi;
