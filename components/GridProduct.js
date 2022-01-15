import {Box, Grid} from '@mui/material';
import {Title} from './Text';
import ItemProduct from './ItemProduct';

export default function GridProduct(props) {
  const {data = [], onPress} = props;
  return (
    <Box sx={{flexGrow: 1}}>
      <Title sx={{marginBottom: '8px'}}>{'Produk Kami'}</Title>
      <Grid sx={{flexGrow: 1}} container spacing={2}>
        <Grid item xs={12}>
          <Grid container spacing={'16px'}>
            {data && data.map((value, index) => (
              <Grid key={index} item>
                <ItemProduct item={value} onPress={() => onPress(value)} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
