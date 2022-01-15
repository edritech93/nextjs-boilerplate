import {Dashboard, Info, Logout} from '@mui/icons-material';

export const BASE_URL = {
  DEV: 'http://localhost:8081/',
  LIVE: 'http://localhost:8081/',
};

export const DATA_MENU_USER = [
  {
    id: 0,
    text: 'Produk',
    icon: <Dashboard />,
    push: '/product',
    isOpen: false,
  },
];

export const DATA_MENU_DOWN = [
  {
    text: 'Tentang',
    icon: <Info />,
    push: null,
  },
  {
    text: 'Keluar',
    icon: <Logout />,
    push: '/',
  },
];

export const ALERT_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
};

export const ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
};
