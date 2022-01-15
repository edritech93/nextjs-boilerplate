import {useState, useEffect, Fragment} from 'react';
import {Box, Typography, Button} from '@mui/material';
import {ViewLanding, Loader, BannerCarousel} from '../components';
import {ALERT_TYPE} from '../constants';
import {showAlert} from '../actions/app';
import {Helper} from '../libs/Helper';
import {connect} from 'react-redux';
import {Colors} from '../themes';
import {API} from '../libs/api';

function ProductDetail(props) {
  const {productId} = props;
  const [loading, setLoading] = useState(false);
  const [objDetail, setObjDetail] = useState(null);

  useEffect(() => {
    _loadProductDetail();
  }, []);

  function _loadProductDetail() {
    setLoading(true);
    API.singleRequest(API.getProductDetail(productId))
        .then((response) => setObjDetail(response.data))
        .catch((error) => props.showAlert(error))
        .finally(() => setLoading(false));
  }

  function _onCall() {
    const {phoneNumber} = objDetail?.seller;
    if (phoneNumber) {
      let phoneSub = phoneNumber;
      if (phoneSub[0] === '0') {
        phoneSub = phoneNumber.substring(1, phoneNumber.lenght);
      }
      const url = `https://wa.me/+62${phoneSub}`;
      const win = window.open(url, '_blank');
      if (win != null) {
        win.focus();
      }
    } else {
      props.showAlert({
        message: 'Mohon Maaf, Nomor HP Penjual tidak tersedia',
        type: ALERT_TYPE.INFO,
      });
    }
  }

  return (
    <ViewLanding title={'Detail'}>
      {objDetail && (
        <Fragment>
          <BannerCarousel data={[objDetail]} sx={{marginBottom: '16px'}} />
          <Box sx={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            marginLeft: {xs: '0px', sm: '24px'},
            marginRight: {xs: '0px', sm: '24px'},
          }}>
            <Typography variant={'h4'}
              color={Colors.text}
            >{objDetail.productName}</Typography>
            <Typography variant={'h6'} color={Colors.text}
              sx={{
                marginBottom: '16px',
              }}>{`Rp. ${Helper.getFormatMoney(objDetail.productPrice)}`}</Typography>
            <Typography variant={'subtitle1'} color={Colors.text}>{'Keterangan :'}</Typography>
            <Typography variant={'subtitle1'}
              color={Colors.text}
              paragraph
              sx={{
                marginBottom: '16px',
              }}>{objDetail.productDetail}</Typography>

            <Typography variant={'subtitle1'} color={Colors.text}>{'Penjual :'}</Typography>
            <Typography variant={'subtitle1'}
              color={Colors.text}
              paragraph
              sx={{
                marginBottom: '16px',
              }}>{objDetail?.seller?.fullName ?? '-'}</Typography>
            <Typography variant={'subtitle1'} color={Colors.text}>{'No. HP (WA) :'}</Typography>
            <Typography variant={'subtitle1'}
              color={Colors.text}
              paragraph
              sx={{
                marginBottom: '16px',
              }}>{objDetail?.seller?.phoneNumber ?? '-'}</Typography>
          </Box>
          <Button
            variant={'contained'}
            sx={{
              width: {xs: '100%', sm: '50%'},
              alignSelf: 'center',
              marginBottom: '16px',
            }}
            onClick={() => _onCall()}
          >Hubungi Penjual</Button>
        </Fragment>
      )}
      <Loader visible={loading} />
    </ViewLanding>
  );
}

ProductDetail.getInitialProps = async (ctx) => {
  const {productId} = ctx.query;
  return {productId: productId};
};

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch) => ({
  showAlert: (args) => dispatch(showAlert(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
