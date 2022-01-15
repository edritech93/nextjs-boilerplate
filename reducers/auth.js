import {Record} from 'immutable';
import {PROFILE} from '../actions/types';

const objectRecord = new Record({
  profile: null,
});
const initialState = new objectRecord();

const auth = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE.CHANGE:
      return state.set('profile', action.args);

    default:
      return state;
  }
};

export default auth;
