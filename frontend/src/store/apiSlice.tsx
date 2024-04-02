import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import Cookies from 'js-cookie'

const baseUrl = 'http://localhost:3000/api'

export const emptySlitApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl,
    prepareHeaders: (headers) => {
      const token = Cookies.get('token')
      token && headers.set('Authorization', `Bearer ${token}`)

      return headers
    }
  }),
  endpoints: () => ({}),
})
