import * as ReactBs from 'react-bootstrap'
import {FaHome} from 'react-icons/fa'
import {useSelector} from 'react-redux';

import LoginForm from "./LoginForm";
import Profile from "./Profile";

function App() {
  const profile = useSelector(state => state.user.user)

  return (
    <ReactBs.Col xs={12}>
      <div className="pt-3 d-flex align-items-center">
        <div className="d-flex align-items-center">
          <FaHome className="me-2 large-title"/>
          <span className="ms-2 text-uppercase large-title">Funny Movies</span>
        </div>
        {(!profile || !profile.id) && <LoginForm/>}
        {profile && profile.id && <Profile/>}
      </div>
    </ReactBs.Col>
  )
}

export default App
