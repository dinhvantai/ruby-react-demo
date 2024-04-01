import {combineReducers} from 'redux';

import user from './user/reducer'
import video from './video/reducer'

const rootReducer = combineReducers({
  user,
  video,
})

export default rootReducer;
