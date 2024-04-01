import * as ReactBs from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux';

import * as userTypes from "../store/user/types";
import * as videoTypes from "../store/video/types";
import * as wsHelper from "../libs/ws";
import {useEffect} from "react";
import * as toastHelper from "../libs/toast";
import useWebSocket, {ReadyState} from "react-use-websocket";

function LoginForm() {
  const dispatch = useDispatch();

  const profile = useSelector(state => state.user.user)

  const userLogout = () => dispatch({type: userTypes.USER_LOGOUT})
  const onOpenVideoSharing = () => dispatch({type: videoTypes.OPEN_VIDEO_SHARING})

  const {readyState, getWebSocket, sendJsonMessage, lastJsonMessage} = useWebSocket(wsHelper.WS_URL)

  useEffect(() => {
    if ((!profile || !profile.id) && readyState === ReadyState.OPEN) {
      getWebSocket().close()
    }
    if (readyState === ReadyState.OPEN && profile && profile.id) {
      sendJsonMessage({
        command: 'subscribe',
        identifier: JSON.stringify({channel: wsHelper.NewVideoChannel, id: profile.id}),
      })
    }

  }, [readyState, profile])

  useEffect(() => {
    if (!lastJsonMessage?.message?.type) {
      return
    }
    if (lastJsonMessage.message.type === wsHelper.NewVideoChannel) {
      dispatch({type: videoTypes.FETCH_VIDEO})
      const video = lastJsonMessage.message.data
      const mes = `Just had a new video "${video.title}" shared from "${video.user.email}"`
      profile.id && profile.id !== video.user.id && toastHelper.info(mes, {autoClose: false})
    }
  }, [lastJsonMessage])

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
