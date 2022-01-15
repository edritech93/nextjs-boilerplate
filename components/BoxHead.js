import Head from 'next/head';
import {Box} from '@mui/material';

export default function BoxHead(props) {
  const {title = '', children, sx} = props;
  const textTitle = title ? `Marketplace - ${title}` : 'Marketplace';
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        bgcolor: 'background.paper',
        minHeight: '100vh',
        ...sx,
      }}
    >
      <Head>
        <title>{textTitle}</title>
        <meta name={'description'} content={'Aplikasi StartUp didunia UMKM'} />
        <link rel={'icon'} href={'/favicon.ico'} />
        <link
          rel={'stylesheet'}
          href={'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'}
        />
      </Head>
      {children}
    </Box>
  );
}
