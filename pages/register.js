import {useState, useRef, useEffect} from 'react';
import {BoxHead, Card, Loader, Attachment} from '../components';
import {
  TextField, Button, Typography, FormControl, InputLabel, Select,
  MenuItem,
} from '@mui/material';
import {showAlert} from '../actions/app';
import {ALERT_TYPE} from '../constants';
import {useRouter} from 'next/router';
import {connect} from 'react-redux';
import {Colors} from '../themes';
import {API} from '../libs/api';
import {Formik} from 'formik';
import * as Yup from 'yup';

function Register(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dataDistrict, setDataDistrict] = useState([]);
  const [dataAttachment, setDataAttachment] = useState([]);
  const REF_FORMIK = useRef();

  const initialData = {
    fullName: '',
    phoneNumber: '',
    password: '',
    passwordConfirm: '',
    districtId: '',
  };

  const validateSchema = Yup.object().shape({
    fullName: Yup.string()
        .required('Nama Lengkap dibutuhkan'),
    phoneNumber: Yup.string()
        .min(4, 'No. HP (WA) minimal 10 character')
        .required('No. HP (WA) dibutuhkan'),
    password: Yup.string()
        .min(6, 'Password minimal 6 character')
        .required('Password dibutuhkan'),
    passwordConfirm: Yup.string()
        .min(6, 'Password minimal 6 character')
        .required('Password dibutuhkan')
        .oneOf(
            [Yup.ref('password'), null],
            'Password tidak sama',
        ),
    districtId: Yup.string()
        .required('DPC dibutuhkan'),
  });

  useEffect(() => {
    function _loadDistrict() {
      API.singleRequest(API.getDistrict())
          .then((response) => setDataDistrict(response.data))
          .catch((error) => props.showAlert(error));
    }
    _loadDistrict();
  }, []);

  function _onGetAttachment(files) {
    const arrayAttachment = [...dataAttachment];
    arrayAttachment.push(...files);
    setDataAttachment(arrayAttachment);
  }

  const _onSubmit = (values) => {
    if (dataAttachment.length > 0) {
      const body = {
        ...values,
        attachment: dataAttachment[0],
      };
      API.singleRequest(API.register(body))
          .then((response) => {
            props.showAlert({message: response.data.message});
            router.replace('/login');
          })
          .catch((error) => props.showAlert(error))
          .finally(() => setLoading(false));
    } else {
      props.showAlert({
        message: 'Foto KTA Dibutuhkan',
        type: ALERT_TYPE.ERROR,
      });
    }
  };

  return (
    <BoxHead title={'Mendaftar'}>
      <Formik
        innerRef={REF_FORMIK}
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
          setFieldValue,
        }) => (
          <Card sx={{
            width: '343px',
            marginTop: '10vh',
            boxShadow: {xs: 0, sm: 1},
          }}>
            <TextField
              id={'fullName'}
              label={'Nama Lengkap'}
              variant={'outlined'}
              type={'text'}
              required
              error={touched.fullName && errors.fullName ? true : false}
              helperText={errors.fullName}
              onBlur={() => setFieldTouched('fullName')}
              onChange={handleChange('fullName')}
              sx={{marginBottom: '16px'}}
            />
            <TextField
              id={'phoneNumber'}
              label={'Nomor HP (WA)'}
              variant={'outlined'}
              type={'text'}
              required
              error={touched.phoneNumber && errors.phoneNumber ? true : false}
              helperText={errors.phoneNumber}
              onBlur={() => setFieldTouched('phoneNumber')}
              onChange={handleChange('phoneNumber')}
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
              sx={{marginBottom: '16px'}}
            />
            <TextField
              id={'passwordConfirm'}
              label={'Ulangi Password'}
              variant={'outlined'}
              type={'password'}
              security={'true'}
              required
              value={values.passwordConfirm}
              onBlur={() => setFieldTouched('passwordConfirm')}
              error={touched.passwordConfirm && errors.passwordConfirm ? true : false}
              helperText={errors.passwordConfirm}
              onChange={handleChange('passwordConfirm')}
              sx={{marginBottom: '16px'}}
            />
            <FormControl fullWidth sx={{marginBottom: '16px'}}>
              <InputLabel id={'labelDistrictId'}>Anggota DPC</InputLabel>
              <Select
                id={'districtId'}
                labelId={'labelDistrictId'}
                value={values.districtId}
                label={'Anggota DPC'}
                onChange={handleChange('districtId')}
              >
                {dataDistrict.map((item) => (
                  <MenuItem
                    key={item.id}
                    value={item.id}>{item.districtName}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant={'subtitle2'} color={Colors.text}>Foto KTA</Typography>
            <Attachment
              data={dataAttachment}
              isMultiple={false}
              showAdd={dataAttachment.length > 0 ? false : true}
              onSelect={(files) => _onGetAttachment(files)}
              onDelete={(files) => setDataAttachment(files)}
              sx={{marginBottom: '16px'}}
            />
            <Button
              variant={'contained'}
              disabled={!isValid}
              onClick={handleSubmit}
            >Mendaftar</Button>
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
