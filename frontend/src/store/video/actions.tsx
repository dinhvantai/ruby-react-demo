import * as types from './types';

export function fetchVideoRequest() {
  return {
    type: types.FETCH_VIDEO,
    payload: {},
  }
}

export function fetchVideoFailed(errors) {
  return {
    type: types.FETCH_VIDEO_FAILED,
    payload: errors,
  }
}

export function fetchVideoSuccess(user) {
  return {
    type: types.FETCH_VIDEO_SUCCESS,
    payload: user,
  }
}

export function createVideoRequest(form) {
  return {
    type: types.CREATE_VIDEO,
    payload: form,
  }
}

export function createVideoFailed(errors) {
  return {
    type: types.CREATE_VIDEO_FAILED,
    payload: errors,
  }
}

export function createVideoSuccess() {
  return {
    type: types.CREATE_VIDEO_SUCCESS,
    payload: {},
  }
}


export function openVideoSharing() {
  return {
    type: types.OPEN_VIDEO_SHARING,
    payload: {},
  }
}

export function closeVideoSharing() {
  return {
    type: types.CLOSE_VIDEO_SHARING,
    payload: {},
  }
}
