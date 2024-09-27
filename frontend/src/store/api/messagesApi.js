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
          text: payload.text,
          channelId: payload.id,
          author: payload.author,
        },
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

export const { useFetchMessagesQuery, useCreateMessageMutation } = messagesApi;
