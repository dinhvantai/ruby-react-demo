import * as ReactBs from 'react-bootstrap'

import IVideo from "../intefaces/IVideo.tsx";
import {useFetchVideosQuery} from "../store/video/apiSlice.tsx";

function VideoList() {
  const {data: videos, isLoading} = useFetchVideosQuery()

  return (
    <ReactBs.Col xs={10}>
      {isLoading && (
        <ReactBs.Row className="mb-3">
          <ReactBs.Col xs={12} className="d-flex justify-content-center">
            <ReactBs.Spinner animation="border" variant="primary"/>
          </ReactBs.Col>
        </ReactBs.Row>
      )}
      {videos?.map((video: IVideo) => (
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
