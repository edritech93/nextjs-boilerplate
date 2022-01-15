import {Box, Typography} from '@mui/material';

export default function EmptyState(props) {
  const {label = 'Tidak Ada Data'} = props;
  return (
    <Box sx={{
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <Typography>{label}</Typography>
    </Box>
  );
}
