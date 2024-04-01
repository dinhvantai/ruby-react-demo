import {call, put, takeLatest} from 'redux-saga/effects';
import Cookies from 'js-cookie'
import * as toastHelper from '../../libs/toast';

import * as types from './types';
import * as actions from './actions';
import api from "../../libs/api";
import {FormikHelpers} from "formik";

export function* fetchProfile() {
  const {data, errors} = yield call(api, '/me');

  if (data) {
    return yield put(actions.fetchProfileSuccess(data))
  }

  if (errors) {
    yield put(actions.fetchProfileFailed(errors));
  }
}

export function* createOrLogin(payload: { type: string, payload: object, formikActions: FormikHelpers<object> }) {
  const options = {
    method: 'POST',
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(payload.payload),
  }

  const {data, errors} = yield call(api, '/users', options);

  if (data) {
    Cookies.set('token', data.token)
    toastHelper.success('Login successfully!')
    payload.formikActions?.setSubmitting(false)
    payload.formikActions?.resetForm()
    return yield put(actions.fetchProfileSuccess(data))
  }

  if (errors) {
    toastHelper.error(errors.message)
    payload.formikActions?.setSubmitting(false)
    yield put(actions.fetchProfileFailed(errors));
  }
}


export function* userLogout() {
  Cookies.remove('token')
  toastHelper.success('Logout successfully!')
  yield put(actions.userLogoutSuccess())
}

export function* watchUser() {
  yield takeLatest(types.FETCH_PROFILE, fetchProfile)
  yield takeLatest(types.CREATE_OR_LOGIN, createOrLogin)
  yield takeLatest(types.USER_LOGOUT, userLogout)
}
