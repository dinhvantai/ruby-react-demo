import * as ReactBs from 'react-bootstrap'

import Header from "./components/Header";
import VideoList from "./components/VideoList";
import VideoSharing from "./components/VideoSharing";

import './App.scss'

function App() {

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
