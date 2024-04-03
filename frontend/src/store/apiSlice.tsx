import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

import {getToken} from "../libs/cookies";

const baseUrl = import.meta.env.VITE_API_HOST

export const emptySlitApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl,
    prepareHeaders: (headers) => {
      const token = getToken()
      token && headers.set('Authorization', `Bearer ${token}`)

      return headers
    }
  }),
  endpoints: () => ({}),
})
