import {createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'


export interface IVideoState {
  videoSharing: {
    open: boolean;
  }
}

const initialState: IVideoState = {
  videoSharing: {
    open: false
  },
}

const videosSlice = createSlice({
  name: 'videos',
  initialState,
  reducers: {
    setVideoSharingStatus(state, action: PayloadAction<boolean>) {
      state.videoSharing.open = action.payload
    },
  }
})

export const {setVideoSharingStatus} = videosSlice.actions

export default videosSlice.reducer
