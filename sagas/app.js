import {put, takeEvery} from 'redux-saga/effects';
import {ALERT} from '../actions/types';
import {Helper} from '../libs/Helper';

async function _refreshToken() {
  // TODO: refresh token here
  const token = Helper.getRefreshToken();
  if (token) {

  }
}

export function* handleShowAlert(action) {
  const {args} = action;
  if (args.message === '401') {
    _refreshToken();
  }
}

export function* watchShowAlert() {
  yield takeEvery(ALERT.SHOW, handleShowAlert);
}
