import {emptySlitApi} from "../apiSlice.tsx";
import IUser from "../../intefaces/IUser.tsx";

const extendedApi = emptySlitApi.injectEndpoints({
  endpoints: build => ({
    // A query endpoint with no arguments
    fetchProfile: build.query<IUser, void>({
      query: () => '/me',
    }),
    // A mutation endpoint
    createOrLogin: build.mutation<IUser, Partial<IUser>>({
      query: form => ({
        url: '/users',
        method: 'POST',
        body: form,
      })
    }),
  }),
})

export const {
  useFetchProfileQuery,
  useCreateOrLoginMutation,
} = extendedApi