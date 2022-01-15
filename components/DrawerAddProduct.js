import {useState, useEffect, Fragment} from 'react';
import {
  Box, Drawer, Button, TextField, Typography, FormControl, InputLabel,
  Select, MenuItem,
} from '@mui/material';
import {showAlert} from '../actions/app';
import {ALERT_TYPE} from '../constants';
import {connect} from 'react-redux';
import {API} from '../libs/api';
import {Formik} from 'formik';
import Attachment from './Attachment';
import Loader from './Loader';
import * as Yup from 'yup';

const ANCHOR = 'right';
const WIDTH_DRAWER = 350;

const DEFAULT_VALUE = {
  productName: '',
  productDetail: '',
  productPrice: '',
  categoryId: '',
};

function DrawerAddProduct(props) {
  const {selected = null, isOpenDrawer = false, setIsOpenDrawer, onSubmit} = props;

  const [loading, setLoading] = useState(false);
  const [initialData, setInitialData] = useState(DEFAULT_VALUE);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataAttachment, setDataAttachment] = useState([]);

  const validateSchema = Yup.object().shape({
    productName: Yup.string().required('Nama produk dibutuhkan'),
    productDetail: Yup.string().required('Detail produk dibutuhkan'),
    productPrice: Yup.string().required('Harga produk dibutuhkan'),
    categoryId: Yup.string().required('Kategori dibutuhkan'),
  });

  useEffect(() => {
    if (selected) {
      setInitialData({
        productName: selected.productName,
        productDetail: selected.productDetail,
        productPrice: selected.productPrice,
        categoryId: String(selected.categoryId),
      });
      setDataAttachment([selected.attachment]);
    } else {
      setInitialData(DEFAULT_VALUE);
    }
  }, [selected]);

  useEffect(() => {
    if (isOpenDrawer) {
      setLoading(true);
      API.singleRequest(API.getCategory())
          .then((response) => setDataCategory(response.data))
          .catch((error) => props.showAlert(error))
          .finally(() => setLoading(false));
    }
  }, [isOpenDrawer]);

  const _onSubmit = (values) => {
    if (dataAttachment.length > 0) {
      const body = {...values, attachment: dataAttachment[0]};
      onSubmit(body);
    } else {
      props.showAlert({
        message: 'Foto Produk Dibutuhkan',
        type: ALERT_TYPE.ERROR,
      });
    }
  };

  function _onGetAttachment(files) {
    const arrayAttachment = [...dataAttachment];
    arrayAttachment.push(...files);
    setDataAttachment(arrayAttachment);
  }

  return (
    <Fragment>
      <Button
        variant={'contained'}
        onClick={() => setIsOpenDrawer(true)}
      >
        Tambah
      </Button>
      <Formik
        onSubmit={_onSubmit}
        initialValues={initialData}
        enableReinitialize
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
          <Drawer
            anchor={ANCHOR}
            open={isOpenDrawer}
            onClose={() => setIsOpenDrawer(false)}
          >
            <Box
              sx={{
                display: 'flex',
                width: `${WIDTH_DRAWER}px`,
                flexDirection: 'column',
                padding: '16px',
              }}
              role={'presentation'}
            >
              <Typography
                variant={'h6'}
                color={'inherit'}
                sx={{
                  marginBottom: '16px',
                }}
              >
                {`${selected ? 'Ubah' : 'Tambah'} Produk`}
              </Typography>
              <TextField
                id={'productName'}
                label={'Nama Produk'}
                variant={'outlined'}
                type={'text'}
                required
                defaultValue={values.productName}
                error={touched.productName && errors.productName ? true : false}
                helperText={errors.productName}
                onBlur={() => setFieldTouched('productName')}
                onChange={handleChange('productName')}
                sx={{marginBottom: '16px'}}
              />
              <TextField
                id={'productDetail'}
                label={'Detail Produk'}
                variant={'outlined'}
                type={'text'}
                required
                defaultValue={values.productDetail}
                error={touched.productDetail && errors.productDetail ? true : false}
                helperText={errors.productDetail}
                onBlur={() => setFieldTouched('productDetail')}
                onChange={handleChange('productDetail')}
                sx={{marginBottom: '16px'}}
              />
              <TextField
                id={'productPrice'}
                label={'Harga Produk'}
                variant={'outlined'}
                type={'number'}
                required
                defaultValue={values.productPrice}
                error={touched.productPrice && errors.productPrice ? true : false}
                helperText={errors.productPrice}
                onBlur={() => setFieldTouched('productPrice')}
                onChange={handleChange('productPrice')}
                sx={{marginBottom: '16px'}}
              />
              <FormControl fullWidth sx={{marginBottom: '16px'}}>
                <InputLabel id={'labelCategoryId'}>Kategori</InputLabel>
                <Select
                  id={'categoryId'}
                  labelId={'labelCategoryId'}
                  value={values.categoryId}
                  label={'Kategori'}
                  onChange={handleChange('categoryId')}
                >
                  {dataCategory.map((item) => (
                    <MenuItem
                      key={item.id}
                      value={item.id}>{item.categoryName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Attachment
                title={'Foto Produk'}
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
              >
                {`${selected ? 'Ubah' : 'Tambah'}`}
              </Button>
            </Box>
            <Loader visible={loading} />
          </Drawer>
        )}
      </Formik>
    </Fragment>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  showAlert: (args) => dispatch(showAlert(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerAddProduct);
