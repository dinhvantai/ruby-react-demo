import {emptySlitApi} from "../apiSlice.tsx";
import IVideo from "../../intefaces/IVideo.tsx";

const extendedApi = emptySlitApi.injectEndpoints({
  endpoints: build => ({
    fetchVideos: build.query<IVideo[], void>({
      query: () => '/videos'
    }),
    shareVideo: build.mutation<IVideo, Partial<IVideo>>({
      query: form => ({
        url: '/videos',
        method: 'POST',
        body: form,
      })
    }),
  })
})

export const {
  useFetchVideosQuery,
  useShareVideoMutation,
} = extendedApi