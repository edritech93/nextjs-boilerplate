import {Typography, Box, Card, CardActionArea} from '@mui/material';
import {Helper} from '../libs/Helper';
import Image from 'next/image';

export default function ItemProduct(props) {
  const {item, onPress} = props;
  return (
    <Card sx={{
      width: {xs: '170px', sm: '220px'},
    }}>
      <CardActionArea onClick={() => onPress()}>
        <div style={{
          borderTopLeftRadius: '4px',
          borderTopRightRadius: '4px',
          overflow: 'hidden',
        }}>
          <Image
            src={`${Helper.getBaseUrl()}${item.attachment}`}
            alt={`${Helper.getBaseUrl()}${item.attachment}`}
            width={'100%'}
            height={'100%'}
            layout={'responsive'}
            objectFit={'cover'}
          />
        </div>
        <Box sx={{
          padding: '8px',
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}>
          <Typography>{item.productName}</Typography>
          <Typography>{`Rp. ${Helper.getFormatMoney(item.productPrice)}`}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
