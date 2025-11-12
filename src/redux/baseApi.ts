import { createApi } from "@reduxjs/toolkit/query/react"; // ✅ Correct import
import { axiosBaseQuery } from "./axiosBaseQuery";


export const baseApi = createApi({
  reducerPath: "baseApi", // ✅ Should be a unique string, not the baseUrl
  baseQuery: axiosBaseQuery(),
  tagTypes: [], // ✅ Add this for cache tagging
  endpoints: () => ({}),
});
