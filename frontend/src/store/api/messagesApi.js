import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_ROUTES } from '../../routes/routes';

export const messagesApi = createApi({
  reducerPath: '@@messages',
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
    baseUrl: API_ROUTES.messages(),
  }),
  tagTypes: ['Messages'],
  endpoints: (builder) => ({
    fetchMessages: builder.query({
      query: () => '',
      providesTags: ['Messages'],
    }),
    createMessage: builder.mutation({
      query: (payload) => ({
        method: 'POST',
        body: {
          body: payload.body,
          channelId: payload.id,
          author: payload.author,
        },
        invalidatesTags: ['Messages'],
      }),
    }),
    removeMessage: builder.mutation({
      query: (payload) => ({
        url: payload,
        method: 'DELETE',
      }),
      invalidatesTags: ['Messages'],
    }),
    renameMessage: builder.mutation({
      query: (payload) => ({
        url: payload.id,
        method: 'PATCH',
        body: {
          body: payload.text,
        },
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const {
  useFetchMessagesQuery,
  useCreateMessageMutation,
  useRemoveMessageMutation,
  useRenameMessageMutation,
} = messagesApi;
