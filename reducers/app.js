import {Record} from 'immutable';
import {ALERT} from '../actions/types';

const objectRecord = new Record({
  dataAlert: null,
});
const initialState = new objectRecord();

const app = (state = initialState, action) => {
  switch (action.type) {
    case ALERT.SHOW:
      return state.set('dataAlert', action.args);

    case ALERT.CLEAR:
      return state.set('dataAlert', null);

    default:
      return state;
  }
};

export default app;
