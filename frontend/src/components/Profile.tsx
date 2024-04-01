import * as ReactBs from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';

import * as userTypes from "../store/user/types";
import * as videoTypes from "../store/video/types";

function LoginForm() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.user)

  const userLogout = () => dispatch({type: userTypes.USER_LOGOUT, payload: {}})
  const onOpenVideoSharing= () => dispatch({type: videoTypes.OPEN_VIDEO_SHARING})

  return (
    <div className="flex-grow-1 justify-content-end d-flex align-items-center">
      <span>Welcome, <strong>{profile.email}</strong></span>
      <ReactBs.Button
        variant="primary" type="button"
        onClick={onOpenVideoSharing} className="ms-3"
      >
        Share a movie
      </ReactBs.Button>
      <ReactBs.Button
        variant="danger"
        type="button"
        className="ms-3"
        onClick={userLogout}
      >
        Logout
      </ReactBs.Button>
    </div>
  )
}

export default LoginForm
