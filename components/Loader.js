import {Backdrop, CircularProgress} from '@mui/material';

export default function Loader(props) {
  const {visible = false} = props;
  return (
    <Backdrop
      sx={{
        color: '#fff',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={visible}
    >
      <CircularProgress color={'inherit'} />
    </Backdrop>
  );
}
