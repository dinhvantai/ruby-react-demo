import * as types from './types';
import IVideo from "../../intefaces/IVideo";

type TVideoState = {
  videos: IVideo[],
  errors: object,
  videoSharing: {
    open: boolean,
  }
}

const initialState: TVideoState = {
  videos: [],
  errors: {},
  videoSharing: {
    open: false
  }
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_VIDEO_SUCCESS:
      return {...state, videos: action.payload};

    case types.FETCH_VIDEO_FAILED:
    case types.CREATE_VIDEO_FAILED:
      return {...state, errors: action.payload};

    case types.OPEN_VIDEO_SHARING:
      return {...state, videoSharing: {...state.videoSharing, open: true}};

    case types.CLOSE_VIDEO_SHARING:
      return {...state, videoSharing: {...state.videoSharing, open: false}};

    default:
      return state;
  }
}

export default userReducer;
