import {combineReducers} from 'redux';
import app from './app';
import auth from './auth';

const appReducer = combineReducers({
  app,
  auth,
});

export const rootReducer = (state, action) => appReducer(state, action);
