// 📂 src/redux/baseApi.ts

import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosBaseQuery } from "./axiosBaseQuery";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["User", "Tour", "Division"],
  endpoints: () => ({}),
});


// // src/redux/baseApi.ts
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const baseApi = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:5000/api/v1', // Your backend URL
//     credentials: 'include',
//     prepareHeaders: (headers, { endpoint }) => {
//       // Add auth token if exists
//       const token = localStorage.getItem('token');
//       if (token) {
//         headers.set('Authorization', `${token}`);
//       }
      
//       // ⚠️ CRITICAL: Don't set Content-Type for FormData
//       // The browser needs to set it automatically with the boundary
//       // RTK Query will handle this if body is FormData
      
//       return headers;
//     },
//   }),
//   tagTypes: ['Division', 'User' , "Tour"], // Add your tag types
//   endpoints: () => ({}),
// });