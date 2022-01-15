import {useState, useEffect} from 'react';
import {Box} from '@mui/material';
import {ViewDashboard, TableProduct, DrawerAddProduct, Loader} from '../components';
import {showAlert} from '../actions/app';
import {Helper} from '../libs/Helper';
import {connect} from 'react-redux';
import {API} from '../libs/api';

function Dashboard(props) {
  const {profile} = props;

  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selected, setSelected] = useState(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  useEffect(() => {
    _loadDataSource();
  }, []);

  useEffect(() => {
    if (!isOpenDrawer) {
      setSelected(null);
    }
  }, [isOpenDrawer]);

  function _loadDataSource() {
    setLoading(true);
    API.singleRequest(API.getProductUser())
        .then((response) => {
          const array = response.data.map((item) => ({
            ...item,
            stringPrice: `Rp. ${Helper.getFormatMoney(item.productPrice)}`,
          }));
          setDataSource(array);
        })
        .catch((error) => props.showAlert(error))
        .finally(() => setLoading(false));
  }

  function _addEditProduct(values) {
    setLoading(true);
    let apiCalls = null;
    if (selected) {
      apiCalls = API.editProduct(values, selected);
    } else {
      apiCalls = API.addProduct(values);
    }
    setIsOpenDrawer(false);
    if (apiCalls) {
      API.singleRequest(apiCalls)
          .then((response) => {
            props.showAlert({message: response.data.message});
            _loadDataSource();
          })
          .catch((error) => props.showAlert(error))
          .finally(() => setLoading(false));
    }
  }

  function _deleteUser(item) {
    setLoading(true);
    API.singleRequest(API.deleteProduct(item))
        .then((response) => {
          props.showAlert({message: response.data.message});
          _loadDataSource();
        })
        .catch((error) => props.showAlert(error))
        .finally(() => setLoading(false));
  }

  function _onPressEditProduct(item) {
    setSelected(item);
    setTimeout(() => {
      setIsOpenDrawer(true);
    }, 100);
  }

  return (
    <ViewDashboard select={0}>
      <Box sx={{
        display: 'flex',
        marginBottom: '16px',
        justifyContent: 'flex-end',
      }}
      >
        <DrawerAddProduct
          selected={selected}
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
          onSubmit={(values) => _addEditProduct(values)}
        />
      </Box>
      <TableProduct
        data={dataSource}
        onDetele={(item) => _deleteUser(item)}
        onEdit={(item) => _onPressEditProduct(item)}
      />
      <Loader visible={loading} />
    </ViewDashboard>
  );
};

const mapStateToProps = (state, ownProps) => {
  const {profile} = state.auth;
  return {profile};
};

const mapDispatchToProps = (dispatch) => ({
  showAlert: (args) => dispatch(showAlert(args)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
