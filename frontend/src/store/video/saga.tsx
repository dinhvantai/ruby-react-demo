import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';

import * as toastHelper from '../../libs/toast';
import * as types from './types';
import * as actions from './actions';
import api from "../../libs/api";

export function* fetchVideos() {
  const {data, errors} = yield call(api, '/videos');

  if (data) {
    return yield put(actions.fetchVideoSuccess(data))
  }

  if (errors) {
    errors.message && toastHelper.error(errors.message)
    yield put(actions.fetchVideoFailed(errors));
  }
}

export function* createVideos(payload) {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(payload.payload),
  }

  const {data, errors} = yield call(api, '/videos', options);

  if (data) {
    yield put(actions.createVideoSuccess())
    yield put(actions.closeVideoSharing())
    toastHelper.success('Shared your video successfully!')

    return yield put(actions.fetchVideoRequest())
  }

  if (errors) {
    errors.message && toastHelper.error(errors.message)
    yield put(actions.createVideoFailed(errors));
  }
}


export function* watchVideo() {
  yield takeLatest(types.FETCH_VIDEO, fetchVideos)
  yield takeEvery(types.CREATE_VIDEO, createVideos)
}
