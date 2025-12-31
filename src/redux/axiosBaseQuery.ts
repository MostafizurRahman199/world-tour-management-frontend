// 📂 src/redux/axiosBaseQuery.ts

import { axiosInstance } from "@/lib/axios";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";

export const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      body?: AxiosRequestConfig["data"]; // ✅ Add support for 'body' (RTK Query uses 'body')
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, body, params, headers }) => {
    try {
      // ✅ Use 'body' if provided, otherwise use 'data'
      const requestData = body || data;

      // ✅ Auto-detect FormData and set proper headers
      const isFormData = requestData instanceof FormData;
      
      const result = await axiosInstance({
        url,
        method,
        data: requestData,
        params,
        headers: {
          ...headers,
          // ✅ Let axios handle Content-Type for FormData
          ...(isFormData ? {} : headers),
        },
        withCredentials: true,
      });

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;

      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };