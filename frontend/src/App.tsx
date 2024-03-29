import {useState} from 'react'
import TUser from './types/TUser'
import * as ReactBs from 'react-bootstrap'

import Header from "./components/Header";
import VideoList from "./components/VideoList";
import VideoSharing from "./components/VideoSharing";

import './App.scss'

function App() {
  const [showVideoSharing, setShowVideoSharing] = useState<boolean>(false)
  const onHideVideoSharing = () => setShowVideoSharing(false)
  const onOpenVideoSharing = () => setShowVideoSharing(true)

  return (
    <ReactBs.Container className="justify-content-between">
      <ReactBs.Row>
        <Header onOpenVideoSharing={onOpenVideoSharing}/>
      </ReactBs.Row>
      <ReactBs.Row>
        <ReactBs.Col xs={12}>
          <hr/>
        </ReactBs.Col>
      </ReactBs.Row>

      <ReactBs.Row className="justify-content-center mt-4">
        <VideoList/>
      </ReactBs.Row>

      <VideoSharing show={showVideoSharing} onHide={onHideVideoSharing}/>

    </ReactBs.Container>
  )
}

export default App
