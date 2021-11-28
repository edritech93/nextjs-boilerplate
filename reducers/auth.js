import {Record} from 'immutable';
import {} from '../actions/types';

const objectRecord = new Record({
});
const initialState = new objectRecord();

const auth = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default auth;
