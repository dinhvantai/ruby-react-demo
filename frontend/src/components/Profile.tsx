import * as ReactBs from 'react-bootstrap'
import {useDispatch} from 'react-redux';
import useWebSocket, {ReadyState} from "react-use-websocket";
import {useEffect} from "react";
import Cookies from "js-cookie";

import * as wsHelper from "../libs/ws";
import * as toastHelper from "../libs/toast";
import {setVideoSharingStatus} from "../store/video/videoSlice";
import {useFetchProfileQuery} from "../store/user/apiSlice.tsx";
import {useFetchVideosQuery} from "../store/video/apiSlice.tsx";

function LoginForm() {
  const dispatch = useDispatch();

  const {currentData: profile, refetch} = useFetchProfileQuery()
  const {refetch: reloadVideos} = useFetchVideosQuery()

  const userLogout = () => {
    Cookies.remove('token')
    toastHelper.success('Logout successfully!')
    refetch()
  }
  const onOpenVideoSharing = () => dispatch(setVideoSharingStatus(true))

  const {
    readyState,
    getWebSocket,
    sendJsonMessage,
    lastJsonMessage,
  } = useWebSocket(wsHelper.WS_URL)

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
    <div className="flex-grow-1 justify-content-end d-flex align-items-center">
      <span>Welcome, <strong>{profile?.email}</strong></span>
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
