import React from 'react';
import {Carousel} from 'react-responsive-carousel';
import {Box} from '@mui/material';
import {Helper} from '../libs/Helper';
import Image from 'next/image';

export default function BannerCarousel(props) {
  const {sx, data = []} = props;
  return (
    <Box sx={sx}>
      <Carousel
        autoFocus={true}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showArrows={true}>
        {data && data.map((item, index) => (
          <ItemCarousel key={index} item={item} />
        ))}
      </Carousel>
    </Box>
  );
}

function ItemCarousel(props) {
  const {item} = props;
  return (
    <Box sx={{
      height: {xs: '200px', sm: '300px'},
      width: '100%',
    }}>
      <Image
        src={`${Helper.getBaseUrl()}${item.attachment}`}
        alt={`${Helper.getBaseUrl()}${item.attachment}`}
        objectFit={'cover'}
        layout={'fill'}
      />
    </Box>
  );
}
