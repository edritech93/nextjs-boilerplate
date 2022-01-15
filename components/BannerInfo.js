import {Box, Typography, Button} from '@mui/material';
import {useRouter} from 'next/router';
import {Colors} from '../themes';

export default function BannerInfo(props) {
  const router = useRouter();
  const {sx} = props;
  return (
    <Box sx={{
      display: 'flex',
      flex: 1,
      maxHeight: '50px',
      bgcolor: Colors.accent,
      borderRadius: '4px',
      padding: '8px',
      alignItems: 'center',
      justifyItems: 'center',
      ...sx,
    }}>
      <Typography
        variant={'h6'}
        color={Colors.white}
        sx={{
          display: 'flex',
          flex: 1,
        }}>{'Ingin Berjualan ?'}</Typography>
      <Button
        variant={'contained'}
        color={'inherit'}
        onClick={() => router.push('/login')}
      >Klik Disini</Button>
    </Box>
  );
}
