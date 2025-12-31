// src/redux/features/tour/tour.api.ts
import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Tour Type endpoints
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

    // Tour endpoints
    addTour: builder.mutation({
      query: (formData: FormData) => ({
        url: "/tour/create-tour",
        method: "POST",
        body: formData,
        withCredentials: true,
      }),
      invalidatesTags: ["Tour"],
    }),

    getAllTours: builder.query({
      query: () => ({
        url: "/tour/all-tours",
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Tour"],
    }),

    updateTour: builder.mutation({
      query: ({ id, formData }: { id: string; formData: FormData }) => ({
        url: `/tour/update-tour/${id}`,
        method: "PATCH",
        body: formData,
        withCredentials: true,
      }),
      invalidatesTags: ["Tour"],
    }),

    deleteTour: builder.mutation({
      query: (id: string) => ({
        url: `/tour/delete-tour/${id}`,
        method: "DELETE",
        withCredentials: true,
      }),
      invalidatesTags: ["Tour"],
    }),

    getSingleTour: builder.query({
      query: (slug: string) => ({
        url: `/tour/single-tour/${slug}`,
        method: "GET",
        withCredentials: true,
      }),
      providesTags: ["Tour"],
    }),
  }),
});

export const {
  useAddTourTypeMutation,
  useGetTourTypeQuery,
  useDeleteTourTypeMutation,
  useUpdateTourTypeMutation,
  useAddTourMutation,
  useGetAllToursQuery,
  useUpdateTourMutation,
  useDeleteTourMutation,
  useGetSingleTourQuery,
} = tourApi;
