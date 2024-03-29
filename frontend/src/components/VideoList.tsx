import * as ReactBs from 'react-bootstrap'

function App() {
  return (
    <ReactBs.Col xs={10}>
      {[...Array(5).keys()].map((i) => (
        <ReactBs.Row className="mb-3" key={i}>
          <ReactBs.Col xs={4}>
            <iframe
              width="100%"
              height="auto"
              src="https://www.youtube.com/embed/2g811Eo7K8U"
              allow="autoplay; encrypted-media"
              title="video"
            />
          </ReactBs.Col>
          <ReactBs.Col xs={8}>
            <strong className="text-danger">Title</strong>
            <div className="mt-1">Shared by: <strong>test@gmail.com</strong></div>
            <div className="mt-1">Description:</div>
            <p className="fw-bold">
              description description description description
              description description description description
              description description description description
            </p>
          </ReactBs.Col>
        </ReactBs.Row>
      ))}
    </ReactBs.Col>
  )
}

export default App
