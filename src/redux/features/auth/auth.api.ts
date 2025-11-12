// src/redux/features/auth/auth.api.ts
import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerApi: builder.mutation({
      query: (userInfo) => ({
        url: "/user/register",
        method: "POST",
        data: userInfo,
      }),
    }),
  }),
});


export const { useRegisterApiMutation } = authApi;
