import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../../routes/routes';

export const channelsApi = createApi({
  reducerPath: '@@channels',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
    baseUrl: API_ROUTES.channels(),
  }),
  tagTypes: ['Channels'],
  endpoints: (builder) => ({
    fetchChannels: builder.query({
      query: () => '',
      providesTags: ['Channels'],
    }),
    createChannel: builder.mutation({
      query: (payload) => ({
        method: 'POST',
        body: {
          name: payload,
        },
      }),
      invalidatesTags: ['Channels'],
    }),
    renameChannel: builder.mutation({
      query: (payload) => ({
        url: payload.id,
        method: 'PATCH',
        body: {
          name: payload.name,
        },
      }),
      invalidatesTags: ['Channels'],
    }),
    removeChannel: builder.mutation({
      query: (payload) => ({
        url: payload,
        method: 'DELETE',
      }),
      invalidatesTags: ['Channels', 'Messages'],
    }),
  }),
});

export const {
  useFetchChannelsQuery,
  useCreateChannelMutation,
  useRenameChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
