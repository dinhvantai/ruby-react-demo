import * as ReactBs from 'react-bootstrap'
import {Formik, FormikHelpers} from 'formik';
import * as toastHelper from "../libs/toast";
import * as Yup from 'yup';

import {useCreateOrLoginMutation, useFetchProfileQuery} from "../store/user/apiSlice.tsx";
import IUser from "../intefaces/IUser.tsx";
import {setToken} from "../libs/cookies";

const LoginFormSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please enter your password!'),
  email: Yup.string()
    .email('Please enter a correct email!')
    .required('Please enter your email!'),
});


function LoginForm() {
  const [createOrLogin] = useCreateOrLoginMutation()
  const {refetch} = useFetchProfileQuery()

  const handleSubmit = async (values: IUser, actions: FormikHelpers<IUser>) => {
    try {
      const res = await createOrLogin(values).unwrap()
      setToken(res.token || '')
      await refetch()
      actions.resetForm()
      toastHelper.success('Login successfully!')
    } catch {
      const message = 'Wrong email or password!';
      actions.setErrors({email: message})
      toastHelper.error(message)
    } finally {
      actions.setSubmitting(false)
    }
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
          className="flex-grow-1 justify-content-end row flex-column flex-md-row align-items-center"
        >
          <ReactBs.Form.Group className="me-0 col-12 col-md-6 col-lg-4">
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
          <ReactBs.Form.Group className="mt-3 mt-md-0 me-0 col-12 col-md-6 col-lg-4">
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
              <ReactBs.Form.Control.Feedback type="invalid" tooltip>
                {errors.password}
              </ReactBs.Form.Control.Feedback>
            </ReactBs.InputGroup>
          </ReactBs.Form.Group>
          <ReactBs.Form.Group className="col-12 mt-3 mt-lg-0 col-lg-4">
            <ReactBs.Button
              className="w-100"
              variant="primary"
              type="submit"
              disabled={isSubmitting}
            >
              Login / Register
            </ReactBs.Button>
          </ReactBs.Form.Group>
        </ReactBs.Form>
      )}
    </Formik>
  )
}

export default LoginForm
