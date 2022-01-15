import {STORAGE} from '../actions/types';
import {BASE_URL} from '../constants';

export const Helper = {
  setToken: (token) => {
    localStorage.setItem(STORAGE.TOKEN, token);
  },
  getToken: () => {
    const token = localStorage.getItem(STORAGE.TOKEN);
    if (token) {
      return token;
    }
    return null;
  },
  setRefreshToken: (token) => {
    localStorage.setItem(STORAGE.REFRESH_TOKEN, token);
  },
  getRefreshToken: () => {
    const token = localStorage.getItem(STORAGE.REFRESH_TOKEN);
    if (token) {
      return token;
    }
    return null;
  },
  removeToken: () => {
    localStorage.removeItem(STORAGE.TOKEN);
  },
  removeRefreshToken: () => {
    localStorage.removeItem(STORAGE.REFRESH_TOKEN);
  },
  getBaseUrl: () => BASE_URL.DEV,
  getFormatMoney: (amount) => {
    const formatter = new Intl.NumberFormat('id-ID');
    return formatter.format(amount);
  },
};
