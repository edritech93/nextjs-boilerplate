import {defineAction} from 'redux-define';
import {
  REQUEST,
  SUCCESS,
  FAILURE,
  USER,
  TOKEN,
  REFRESH_TOKEN,
  SHOW,
  CLEAR,
} from '../constants/state';

const appNamespace = defineAction('BOILERPLATE');

export const ALERT = defineAction('ALERT', [SHOW, CLEAR], appNamespace);
export const STORAGE = defineAction('STORAGE', [TOKEN, REFRESH_TOKEN, USER], appNamespace);
