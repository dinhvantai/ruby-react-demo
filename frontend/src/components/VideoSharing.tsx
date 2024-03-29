import * as ReactBs from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {useState} from "react";

interface TVideoSharingPopupProps {
  show: boolean;
  onHide: () => void;
}

function App(props: TVideoSharingPopupProps) {
  const [validated, setValidated] = useState<boolean>(false);

  const handleSubmit = (event) => {
    setValidated(true);

    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity()) {
      setValidated(false)
    }
  };


  return (
    <ReactBs.Modal {...props} centered>
      <ReactBs.Modal.Header closeButton>
        <ReactBs.Modal.Title>
          Share a Youtube movie
        </ReactBs.Modal.Title>
      </ReactBs.Modal.Header>
      <ReactBs.Modal.Body>
        <ReactBs.Form noValidate validated={validated} onSubmit={handleSubmit}>
          <ReactBs.Form.Group as={Col} xs="12">
            <ReactBs.Form.Label>Title</ReactBs.Form.Label>
            <ReactBs.Form.Control
              required
              name="title"
              type="text"
              placeholder="Title"
              autoFocus
            />
            <ReactBs.Form.Control.Feedback type="invalid">
              Please input a title.
            </ReactBs.Form.Control.Feedback>
          </ReactBs.Form.Group>
          <ReactBs.Form.Group as={Col} xs="12" className="mt-3">
            <ReactBs.Form.Label>Youtube url</ReactBs.Form.Label>
            <ReactBs.Form.Control
              required
              name="full_url"
              type="text"
              placeholder="Youtube url"
            />
            <ReactBs.Form.Control.Feedback type="invalid">
              Please input your Youtube url.
            </ReactBs.Form.Control.Feedback>
          </ReactBs.Form.Group>
          <ReactBs.Form.Group className="mt-3">
            <ReactBs.Form.Label>Description</ReactBs.Form.Label>
            <ReactBs.Form.Control as="textarea" rows={3}/>
          </ReactBs.Form.Group>
          <ReactBs.Button variant="primary" type="submit" className="mt-3 mb-4 w-100">
            Share
          </ReactBs.Button>
        </ReactBs.Form>
      </ReactBs.Modal.Body>
    </ReactBs.Modal>
  )
}

export default App
