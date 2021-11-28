import { useState, Fragment } from 'react'
import { BoxHead, Card } from '../components';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as Yup from 'yup';

export default function Login(props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false);

  const initialData = {
    username: '',
    password: '',
  }

  const validateSchema = Yup.object().shape({
    username: Yup.string()
      .min(4, `Username minimal 4 character`)
      .required(`Username dibutuhkan`),
    password: Yup.string()
      .min(6, `Password minimal 6 character`)
      .required(`Password dibutuhkan`),
  });

  const _onSubmit = values => {
    setLoading(true);
    // localStorage.setItem('TOKEN', '123qwe')
    // router.replace('/dashboard')
  }

  return (
    <BoxHead>
      <Formik
        onSubmit={_onSubmit}
        initialValues={initialData}
        validationSchema={validateSchema}>
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <Fragment>
            <Card
              sx={{
                width: '343px',
              }}>
              <TextField
                id="outlined-basic"
                label="Username"
                variant="outlined"
                type={'text'}
                required={true}
                error={touched.username && errors.username}
                helperText={errors.username}
                onBlur={() => setFieldTouched('username')}
                onChange={handleChange('username')}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                id={"outlined-basic"}
                label={"Password"}
                variant="outlined"
                type={"password"}
                security="true"
                required={true}
                value={values.password}
                onBlur={() => setFieldTouched('password')}
                error={touched.password && errors.password}
                helperText={errors.password}
                onChange={handleChange('password')}
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                disabled={!isValid}
                onClick={handleSubmit}>Masuk</Button>
            </Card>
          </Fragment>
        )}
      </Formik>
    </BoxHead>
  )
}
