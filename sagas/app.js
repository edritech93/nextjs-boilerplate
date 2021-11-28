import {put, takeEvery} from 'redux-saga/effects';
import {ALERT} from '../actions/types';

async function _refreshToken() {
  // TODO: refresh token here
  // const token = await Helper.getRefreshToken();
  // if (token) {
  //     API.singleRequest(API.relogin())
  //         .then(response => {
  //             const dataLogin = response.data;
  //             Helper.setToken(dataLogin.access_token);
  //             Helper.setRefreshToken(dataLogin.refresh_token);
  //         })
  //         .catch(() => { })
  //         .finally(() => NavigationService.resetRoot('Splash'));
  // } else {
  //     NavigationService.resetRoot('DashboardGuest');
  // }
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
