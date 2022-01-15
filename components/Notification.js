import {useState, useEffect} from 'react';
import {Stack, Snackbar, Alert} from '@mui/material';
import {ALERT_TYPE} from '../constants';
import {connect} from 'react-redux';

function Notification(props) {
  const {dataAlert = null} = props;

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(dataAlert ? true : false);
  }, [dataAlert]);

  const _handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsOpen(false);
  };

  return (
    <Stack spacing={2} sx={{width: '100%'}}>
      <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
        onClose={_handleClose}>
        {dataAlert && (
          <Alert
            variant={'filled'}
            onClose={_handleClose}
            severity={dataAlert?.type ?? ALERT_TYPE.SUCCESS}
            sx={{width: '100%'}}
          >
            {dataAlert?.message ?? '-'}
          </Alert>
        )}
      </Snackbar>
    </Stack>
  );
}

const mapStateToProps = (state, ownProps) => {
  const {dataAlert} = state.app;
  return {dataAlert};
};

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
