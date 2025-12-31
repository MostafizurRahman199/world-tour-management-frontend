// src/redux/features/division/division.api.ts
import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllDivisions: builder.query({
      query: () => ({
        url: "/division/all-divisions",
        method: "GET",
      }),
      providesTags: ["Division"],
    }),

    addDivision: builder.mutation({
      query: (formData: FormData) => ({
        url: "/division/create",
        method: "POST",
        body: formData, // ✅ Use 'body' for FormData (axiosBaseQuery will handle it)
      }),
      invalidatesTags: ["Division"],
    }),

    updateDivision: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/division/update-division/${id}`,
        method: "PATCH",
        body: formData, // ✅ Use 'body' for FormData
      }),
      invalidatesTags: ["Division"],
    }),

    deleteDivision: builder.mutation({
      query: (id: string) => ({
        url: `/division/delete-division/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Division"],
    }),
  }),
});

export const { 
  useGetAllDivisionsQuery, 
  useAddDivisionMutation, 
  useUpdateDivisionMutation, 
  useDeleteDivisionMutation 
} = divisionApi;