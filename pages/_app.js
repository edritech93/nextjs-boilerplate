import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {Notification} from '../components';
import {Provider} from 'react-redux';
import {Colors} from '../themes';
import configureStore from '../libs/configureStore';

const store = configureStore();

const theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
      light: Colors.primary,
      dark: Colors.primary,
      contrastText: Colors.white,
    },
    secondary: {
      main: Colors.accent,
      light: Colors.accent,
      dark: Colors.accent,
      contrastText: Colors.white,
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

export default function MyApp({Component, pageProps}) {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Component {...pageProps} />
        <Notification />
      </Provider>
    </ThemeProvider>
  );
};
