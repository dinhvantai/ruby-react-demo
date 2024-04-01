import * as types from './types';

import IUser from "../../intefaces/IUser";

type TUserState = {
  user: IUser;
  errors: object;
}

const initialState: TUserState = {
  user: {},
  errors: {},
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.FETCH_PROFILE_SUCCESS:
      return {...state, user: action.payload, errors: {}};

    case types.USER_LOGOUT_SUCCESS:
      return {...state, user: {}, errors: {}};

    case types.FETCH_PROFILE_FAILED:
      return {...state, errors: action.payload, user: {}};

    default:
      return state;
  }
}

export default userReducer;
