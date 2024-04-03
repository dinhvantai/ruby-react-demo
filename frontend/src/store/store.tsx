import {configureStore} from '@reduxjs/toolkit'

import {emptySlitApi as api} from './apiSlice.js'

import {listenerMiddleware} from './listenerMiddleware'

import usersReducer from './user/userSlice'
import videosReducer from './video/videoSlice'

export interface IState {
  [api.reducerPath]: ReturnType<typeof api.reducer>,
  videos: ReturnType<typeof videosReducer>,
  users: ReturnType<typeof usersReducer>,
}

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    videos: videosReducer,
    users: usersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .prepend(listenerMiddleware.middleware)
      .concat(api.middleware),
})
