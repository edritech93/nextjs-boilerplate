import {Box, Grid} from '@mui/material';
import ItemCategory from './ItemCategory';

export default function GridCategory(props) {
  const {data = [], onPress} = props;
  return (
    <Box sx={{flexGrow: 1}}>
      <Grid sx={{flexGrow: 1}} container spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent={'center'} spacing={'16px'}>
            {data && data.map((value, index) => (
              <Grid key={index} item>
                <ItemCategory item={value} onPress={() => onPress(value)} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
