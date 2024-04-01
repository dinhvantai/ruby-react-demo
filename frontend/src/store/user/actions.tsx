import * as types from './types';

export function fetchProfileRequest() {
  return {
    type: types.FETCH_PROFILE,
    payload: {},
  }
}

export function fetchProfileFailed(errors) {
  return {
    type: types.FETCH_PROFILE_FAILED,
    payload: errors,
  }
}

export function fetchProfileSuccess(user) {
  return {
    type: types.FETCH_PROFILE_SUCCESS,
    payload: user,
  }
}

export function createOrLogin(form) {
  return {
    type: types.CREATE_OR_LOGIN,
    payload: form,
  }
}

export function userLogout() {
  return {
    type: types.USER_LOGOUT,
    payload: {},
  }
}

export function userLogoutSuccess() {
  return {
    type: types.USER_LOGOUT_SUCCESS,
    payload: {},
  }
}
