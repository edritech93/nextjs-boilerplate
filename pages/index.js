import {useState, useEffect} from 'react';
import {ViewLanding, GridProduct, Loader, BannerInfo, BannerCarousel, GridCategory} from '../components';
import {showAlert} from '../actions/app';
import {Typography} from '@mui/material';
import {useRouter} from 'next/router';
import {connect} from 'react-redux';
import {API} from '../libs/api';

function Index(props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [dataProduct, setDataProduct] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);

  useEffect(() => {
    _loadProduct();
  }, []);

  useEffect(() => {
    function _loadCategory() {
      API.singleRequest(API.getCategory())
          .then((response) => setDataCategory(response.data))
          .catch((error) => props.showAlert(error));
    }
    _loadCategory();
  }, []);

  function _loadProduct(text) {
    setLoading(true);
    const body = text ? {search: text} : null;
    API.singleRequest(API.getProduct(body))
        .then((response) => setDataProduct(response.data))
        .catch((error) => props.showAlert(error))
        .finally(() => setLoading(false));
  }

  const _onPressProduct = (item) => {
    router.push({
      pathname: '/product-detail',
      query: {
        productId: item.id,
      },
    });
  };

  const _onPressCategory = (item) => {
    router.push({
      pathname: '/product-detail',
      query: {
        productId: item.id,
      },
    });
  };

  return (
    <ViewLanding onSearch={(text) => _loadProduct(text)}>
      <BannerCarousel data={dataProduct} sx={{marginBottom: '16px'}} />
      <BannerInfo sx={{marginBottom: '16px'}} />
      {/* <GridCategory data={dataCategory} onPress={_onPressCategory} /> */}
      <GridProduct data={dataProduct} onPress={_onPressProduct} />
      <Loader visible={loading} />
    </ViewLanding>
  );
}

const mapStateToProps = (state, ownProps) => ({});

const mapDispatchToProps = (dispatch) => ({
  showAlert: (args) => dispatch(showAlert(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
