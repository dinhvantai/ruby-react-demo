import * as ReactBs from 'react-bootstrap'
import {FaHome} from 'react-icons/fa'
import {useState} from "react";

interface THeaderProps {
  onOpenVideoSharing: () => void;
}

function App(props: THeaderProps) {
  const [isLogged, setIsLogger] = useState<boolean>(false)
  const [validated, setValidated] = useState<boolean>(false);

  const handleSubmit = (event) => {
    setValidated(true);
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      setIsLogger(true)
    }
  };

  return (
    <ReactBs.Col xs={12}>
      <div className="pt-3 d-flex align-items-center">
        <div className="d-flex align-items-center">
          <FaHome className="me-2 large-title"/>
          <span className="ms-2 text-uppercase large-title">Funny Movies</span>
        </div>
        {!isLogged && (
          <ReactBs.Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            className="flex-grow-1 justify-content-end d-flex"
          >
            <ReactBs.Form.Group className="me-3">
              <ReactBs.Form.Control
                required
                type="email" name="email"
                placeholder="Email"
              />
            </ReactBs.Form.Group>
            <ReactBs.Form.Group className="me-3">
              <ReactBs.Form.Control
                required
                type="password" name="password"
                placeholder="Password"
              />
            </ReactBs.Form.Group>
            <ReactBs.Button variant="primary" type="submit">
              Login / Register
            </ReactBs.Button>
          </ReactBs.Form>
        )}
        {isLogged && (
          <div className="flex-grow-1 justify-content-end d-flex align-items-center">
            <span>Welcome, <strong>test@gmail.coms</strong></span>
            <ReactBs.Button
              variant="primary" type="button"
              onClick={props.onOpenVideoSharing} className="ms-3"
            >
              Share a movie
            </ReactBs.Button>
            <ReactBs.Button
              variant="danger"
              type="button"
              className="ms-3"
              onClick={() => setIsLogger(false)}
            >
              Logout
            </ReactBs.Button>
          </div>
        )}
      </div>
    </ReactBs.Col>
  )
}

export default App
