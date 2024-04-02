import * as ReactBs from 'react-bootstrap'
import {FaHome} from 'react-icons/fa'

import LoginForm from "./LoginForm";
import Profile from "./Profile";
import {useFetchProfileQuery} from "../store/user/apiSlice.tsx";

function App() {

  const {data: profile, error} = useFetchProfileQuery()
  const isLogged = !error && profile && profile.id

  return (
    <ReactBs.Col xs={12}>
      <div className="pt-3 d-flex align-items-center">
        <div className="d-flex align-items-center">
          <FaHome className="me-2 large-title"/>
          <span className="ms-2 text-uppercase large-title">Funny Movies</span>
        </div>
        {!isLogged && <LoginForm/>}
        {isLogged && <Profile/>}
      </div>
    </ReactBs.Col>
  )
}

export default App
