import {all} from 'redux-saga/effects';
import {watchUser} from './user/saga';
import {watchVideo} from './video/saga';

export default function* rootSaga() {
  yield all([
    watchUser(),
    watchVideo(),
  ]);
}
