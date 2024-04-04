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
      <div className="pt-3 row align-items-center">
        <div className="col-12 col-lg-4 d-flex align-items-center justify-content-center justify-content-lg-start">
          <FaHome className="me-2 large-title"/>
          <span className="ms-2 text-uppercase large-title">Funny Movies</span>
        </div>
        <div className="col-12 col-lg-8 d-flex align-items-center mt-lg-0 mt-3">
          {!isLogged && <LoginForm/>}
          {isLogged && <Profile/>}
        </div>

      </div>
    </ReactBs.Col>
  )
}

export default App
