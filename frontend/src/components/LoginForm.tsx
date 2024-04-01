import * as ReactBs from 'react-bootstrap'
import {useDispatch} from 'react-redux';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';

import * as userTypes from "../store/user/types";

interface IFormValue {
  email: string;
  password: string;
}

const LoginFormSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please enter your password!'),
  email: Yup.string()
    .email('Please enter a correct email!')
    .required('Please enter your email!'),
});

function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (values: IFormValue, actions: FormikHelpers<IFormValue>) => {
    dispatch({type: userTypes.CREATE_OR_LOGIN, payload: values, formikActions: actions})
  }

  return (
    <Formik
      initialValues={{email: '', password: ''}}
      validationSchema={LoginFormSchema}
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
          className="flex-grow-1 justify-content-end d-flex"
        >
          <ReactBs.Form.Group className="me-3">
            <ReactBs.InputGroup hasValidation>
              <ReactBs.Form.Control
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                isValid={touched.email && !errors.email}
                isInvalid={touched.email && !!errors.email}
              />
              <ReactBs.Form.Control.Feedback type="invalid" tooltip>
                {errors.email}
              </ReactBs.Form.Control.Feedback>
            </ReactBs.InputGroup>
          </ReactBs.Form.Group>
          <ReactBs.Form.Group className="me-3">
            <ReactBs.InputGroup hasValidation>
              <ReactBs.Form.Control
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                onBlur={handleBlur}
                value={values.password}
                isValid={touched.password && !errors.password}
                isInvalid={touched.password && !!errors.password}
              />
              <ReactBs.Form.Control.Feedback tooltip type="invalid">
                {errors.password}
              </ReactBs.Form.Control.Feedback>
            </ReactBs.InputGroup>
          </ReactBs.Form.Group>
          <ReactBs.Button variant="primary" type="submit" disabled={isSubmitting}>
            Login / Register
          </ReactBs.Button>
        </ReactBs.Form>
      )}
    </Formik>
  )
}

export default LoginForm
