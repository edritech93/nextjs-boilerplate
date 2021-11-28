import {ALERT} from './types';

export const showAlert = (args) => ({type: ALERT.SHOW, args});

export const clearAlert = (args) => ({type: ALERT.CLEAR, args});
