import * as ReactBs from 'react-bootstrap'

import {useSelector} from "react-redux";

function VideoList() {
  const videos = useSelector(state => state.video.videos)

  return (
    <ReactBs.Col xs={10}>
      {videos.map((video) => (
        <ReactBs.Row className="mb-3" key={video.id}>
          <ReactBs.Col xs={4}>
            <iframe
              width="100%"
              height="auto"
              src={`https://www.youtube.com/embed/${video.video_id}`}
              allow="autoplay; encrypted-media"
              title={video.title}
            />
          </ReactBs.Col>
          <ReactBs.Col xs={8}>
            <strong className="text-danger">{video.title}</strong>
            <div className="mt-1">Shared by: <strong>{video.user?.email}</strong></div>
            <div className="mt-1">Description:</div>
            <p className="fw-bold">
              {video.description}
            </p>
          </ReactBs.Col>
        </ReactBs.Row>
      ))}
    </ReactBs.Col>
  )
}

export default VideoList
