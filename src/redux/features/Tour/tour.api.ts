// src/redux/features/tour/tour.api.ts

import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addTourType: builder.mutation({
      query: (tourTypeName) => ({
        url: "/tour-type/create-tour-type",
        method: "POST",
        data: tourTypeName,
        withCredentials: true,
      }),
      invalidatesTags: ["Tour"],
    }),

    getTourType: builder.query({
      query: () => ({
        url: "/tour-type/all-tour-types",
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Tour"],
    }),

    // ✅ DELETE TOUR TYPE
    deleteTourType: builder.mutation({
      query: (id: string) => ({
        url: `/tour-type/delete-tour-type/${id}`,
        method: "DELETE",
        withCredentials: true,
      }),
      invalidatesTags: ["Tour"],
    }),

    updateTourType: builder.mutation({
      query: ({ id, data }: { id: string; data: { name: string } }) => ({
        url: `/tour-type/update-tour-type/${id}`,
        method: "PATCH",
        data,
        withCredentials: true,
      }),
      invalidatesTags: ["Tour"],
    }),
  }),
});

export const { useAddTourTypeMutation, useGetTourTypeQuery, useDeleteTourTypeMutation, useUpdateTourTypeMutation } = tourApi;
