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
  CHANGE,
} from '../constants/state';

const appNamespace = defineAction('BOILERPLATE');

export const ALERT = defineAction('ALERT', [SHOW, CLEAR], appNamespace);
export const STORAGE = defineAction('STORAGE', [TOKEN, REFRESH_TOKEN, USER], appNamespace);
export const PROFILE = defineAction('PROFILE', [CHANGE], appNamespace);
