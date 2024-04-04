import * as ReactBs from 'react-bootstrap'
import {useDispatch} from 'react-redux';
import useWebSocket, {ReadyState} from "react-use-websocket";
import {useEffect} from "react";

import * as wsHelper from "../libs/ws";
import * as toastHelper from "../libs/toast";
import {setVideoSharingStatus} from "../store/video/videoSlice";
import {useFetchProfileQuery} from "../store/user/apiSlice.tsx";
import {useFetchVideosQuery} from "../store/video/apiSlice.tsx";
import {getToken, removeToken} from "../libs/cookies";

function LoginForm() {
  const dispatch = useDispatch();

  const {currentData: profile, refetch} = useFetchProfileQuery()
  const {refetch: reloadVideos} = useFetchVideosQuery()

  const userLogout = () => {
    removeToken()
    toastHelper.success('Logout successfully!')
    refetch()
  }
  const onOpenVideoSharing = () => dispatch(setVideoSharingStatus(true))

  const {
    readyState,
    getWebSocket,
    sendJsonMessage,
    lastJsonMessage,
  } = useWebSocket(`${wsHelper.WS_URL}?token=${getToken()}`)

  useEffect(() => {
    if ((!profile || !profile.id) && readyState === ReadyState.OPEN) {
      getWebSocket()?.close()
    }
    if (readyState === ReadyState.OPEN && profile && profile.id) {
      sendJsonMessage({
        command: 'subscribe',
        identifier: JSON.stringify({channel: wsHelper.NewVideoChannel, id: profile.id}),
      })
    }

  }, [readyState, profile])

  useEffect(() => {
    // @ts-expect-error
    if (!lastJsonMessage?.message?.type) {
      return
    }

    // @ts-expect-error
    if (lastJsonMessage?.message?.type === wsHelper.NewVideoChannel) {
      reloadVideos()

      // @ts-expect-error
      const video = lastJsonMessage.message.data
      const mes = `Just had a new video "${video.title}" shared from "${video.user.email}"`
      profile?.id && profile.id !== video.user.id && toastHelper.info(mes, {autoClose: false})
    }
  }, [lastJsonMessage])

  return (
    <div className="flex-grow-1 row align-items-center">
      <div className="col-12 d-flex align-items-center justify-content-end flex-column flex-lg-row">
        <div className="me-lg-5">Welcome, <strong>{profile?.email}</strong></div>
        <div className="row col-12 col-lg">
          <ReactBs.Button
            className="col-12 col-lg mt-2 mt-lg-0"
            variant="primary" type="button"
            onClick={onOpenVideoSharing}
          >
            Share a movie
          </ReactBs.Button>
          <ReactBs.Button
            className="col-12 col-lg mt-2 mt-lg-0 ms-lg-3"
            variant="danger"
            type="button"
            onClick={userLogout}
          >
            Logout
          </ReactBs.Button>
        </div>

      </div>

    </div>
  )
}

export default LoginForm
