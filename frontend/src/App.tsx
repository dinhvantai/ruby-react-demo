import {useEffect} from 'react'
import {useDispatch} from "react-redux";
import * as ReactBs from 'react-bootstrap'

import Header from "./components/Header";
import VideoList from "./components/VideoList";
import VideoSharing from "./components/VideoSharing";

import './App.scss'
import * as videoTypes from './store/video/types'
import * as userTypes from './store/user/types'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({type: userTypes.FETCH_PROFILE})
    dispatch({type: videoTypes.FETCH_VIDEO})
  }, [])

  return (
    <ReactBs.Container className="justify-content-between">
      <ReactBs.Row>
        <Header/>
      </ReactBs.Row>
      <ReactBs.Row>
        <ReactBs.Col xs={12}>
          <hr/>
        </ReactBs.Col>
      </ReactBs.Row>

      <ReactBs.Row className="justify-content-center mt-4">
        <VideoList/>
      </ReactBs.Row>

      <VideoSharing/>
    </ReactBs.Container>
  )
}

export default App
