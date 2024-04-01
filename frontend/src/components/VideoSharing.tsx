import * as ReactBs from 'react-bootstrap'
import {Col} from 'react-bootstrap'
import {useDispatch, useSelector} from "react-redux";
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';


interface IFormValue {
  title: string;
  full_url: string;
  video_id?: string;
  description: string;
}

import * as videoTypes from '../store/video/types'

const VideoSharingSchema = Yup.object().shape({
  title: Yup.string()
    .required('Please enter a title!'),
  full_url: Yup.string()
    .url('Please enter a correct YouTube URL!')
    .required('Input your youtube url, please!'),
  description: Yup.string(),
});


function VideoSharing() {
  const dispatch = useDispatch();

  const openVideoSharing = useSelector(state => state.video.videoSharing.open)

  const handleSubmit = (values: IFormValue, actions: FormikHelpers<IFormValue>) => {
    const url = new URL(values.full_url)
    values.video_id = url.searchParams.get('v') || ''

    dispatch({type: videoTypes.CREATE_VIDEO, payload: values, formikActions: actions})
  };

  const handleClose = () => dispatch({type: videoTypes.CLOSE_VIDEO_SHARING})

  return (
    <ReactBs.Modal
      show={openVideoSharing}
      centered
      onHide={handleClose}
    >
      <ReactBs.Modal.Header closeButton>
        <ReactBs.Modal.Title>
          Share a Youtube movie
        </ReactBs.Modal.Title>
      </ReactBs.Modal.Header>
      <ReactBs.Modal.Body>
        <Formik
          initialValues={{title: '', full_url: '', description: ''}}
          validationSchema={VideoSharingSchema}
          onSubmit={handleSubmit}
        >
          {({
              values,
              handleChange,
              handleBlur,
              isSubmitting,
              handleReset,
              handleSubmit,
              touched,
              errors,
            }) => (
            <ReactBs.Form
              noValidate
              onReset={handleReset}
              onSubmit={handleSubmit}
            >
              <ReactBs.Form.Group as={Col} xs="12">
                <ReactBs.Form.Label>Title</ReactBs.Form.Label>
                <ReactBs.InputGroup hasValidation>
                  <ReactBs.Form.Control
                    type="email"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    isValid={touched.title && !errors.title}
                    isInvalid={touched.title && !!errors.title}
                  />
                  <ReactBs.Form.Control.Feedback type="invalid" tooltip>
                    {errors.title}
                  </ReactBs.Form.Control.Feedback>
                </ReactBs.InputGroup>
              </ReactBs.Form.Group>
              <ReactBs.Form.Group className="mt-3" as={Col} xs="12">
                <ReactBs.Form.Label>Youtube URL</ReactBs.Form.Label>
                <ReactBs.InputGroup hasValidation>
                  <ReactBs.Form.Control
                    type="text"
                    name="full_url"
                    placeholder="Youtube URL"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.full_url}
                    isValid={touched.full_url && !errors.full_url}
                    isInvalid={touched.full_url && !!errors.full_url}
                  />
                  <ReactBs.Form.Control.Feedback tooltip type="invalid">
                    {errors.full_url}
                  </ReactBs.Form.Control.Feedback>
                </ReactBs.InputGroup>
              </ReactBs.Form.Group>
              <ReactBs.Form.Group className="mt-3" as={Col} xs="12">
                <ReactBs.Form.Label>Description</ReactBs.Form.Label>
                <ReactBs.InputGroup hasValidation>
                  <ReactBs.Form.Control
                    as="textarea"
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    isValid={touched.description && !errors.description}
                    isInvalid={touched.description && !!errors.description}
                  />
                  <ReactBs.Form.Control.Feedback tooltip type="invalid">
                    {errors.description}
                  </ReactBs.Form.Control.Feedback>
                </ReactBs.InputGroup>
              </ReactBs.Form.Group>
              <ReactBs.Button
                variant="primary"
                type="submit"
                className="mt-3 mb-4 w-100"
                disabled={isSubmitting}
              >
                Share
              </ReactBs.Button>
            </ReactBs.Form>
          )}
        </Formik>
      </ReactBs.Modal.Body>
    </ReactBs.Modal>
  )
}

export default VideoSharing
