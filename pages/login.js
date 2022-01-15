import {useState} from 'react';
import {BoxHead, Card, Loader} from '../components';
import {TextField, Button, Box} from '@mui/material';
import {profileChange} from '../actions/auth';
import {showAlert} from '../actions/app';
import {useRouter} from 'next/router';
import {Helper} from '../libs/Helper';
import {connect} from 'react-redux';
import {API} from '../libs/api';
import {Formik} from 'formik';
import * as Yup from 'yup';

function Login(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const initialData = {
    username: '',
    password: '',
  };

  const validateSchema = Yup.object().shape({
    username: Yup.string()
        .min(4, 'Username minimal 4 character')
        .required('Username dibutuhkan'),
    password: Yup.string()
        .min(6, 'Password minimal 6 character')
        .required('Password dibutuhkan'),
  });

  const _onSubmit = (values) => {
    setLoading(true);
    API.singleRequest(API.login(values))
        .then((response) => {
          const {accessToken, refreshToken} = response.data;
          Helper.setToken(accessToken);
          Helper.setRefreshToken(refreshToken);
          _loadProfile();
        })
        .catch((error) => {
          props.showAlert(error);
          setLoading(false);
        });
  };

  function _loadProfile() {
    API.singleRequest(API.getProfile())
        .then((response) => {
          props.profileChange(response.data);
          router.replace('/product');
        })
        .catch((error) => {
          props.showAlert(error);
          Helper.removeToken();
          Helper.removeRefreshToken();
        })
        .finally(() => setLoading(false));
  }

  return (
    <BoxHead title={'Masuk'}>
      <Formik
        onSubmit={_onSubmit}
        initialValues={initialData}
        validationSchema={validateSchema}
      >
        {({
          values,
          handleChange,
          errors,
          setFieldTouched,
          touched,
          isValid,
          handleSubmit,
        }) => (
          <Card sx={{
            width: '343px',
            marginTop: '30vh',
            boxShadow: {xs: 0, sm: 1},
          }}>
            <TextField
              id={'username'}
              label={'Nomor HP (WA)'}
              variant={'outlined'}
              type={'text'}
              required
              error={touched.username && errors.username ? true : false}
              helperText={errors.username}
              onBlur={() => setFieldTouched('username')}
              onChange={handleChange('username')}
              sx={{marginBottom: '16px'}}
            />
            <TextField
              id={'password'}
              label={'Password'}
              variant={'outlined'}
              type={'password'}
              security={'true'}
              required
              value={values.password}
              onBlur={() => setFieldTouched('password')}
              error={touched.password && errors.password ? true : false}
              helperText={errors.password}
              onChange={handleChange('password')}
              sx={{marginBottom: '24px'}}
            />
            <Box sx={{display: 'flex'}}>
              <Button
                variant={'outlined'}
                onClick={() => router.push('/register')}
                sx={{
                  display: 'flex',
                  flex: 1,
                  marginRight: '16px',
                }}
              >Mendaftar</Button>
              <Button
                variant={'contained'}
                disabled={!isValid}
                onClick={handleSubmit}
                sx={{
                  display: 'flex',
                  flex: 1,
                }}
              >Masuk</Button>
            </Box>
          </Card>
        )}
      </Formik>
      <Loader visible={loading} />
    </BoxHead>
  );
};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch) => ({
  showAlert: (args) => dispatch(showAlert(args)),
  profileChange: (args) => dispatch(profileChange(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
