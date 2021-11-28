import {put, call, takeEvery} from 'redux-saga/effects';
import {
  AUTH_LOGIN,
  AUTH_RESET,
  AUTH_REGISTER,
  AUTH_LOGOUT,
  STORAGE,
} from '../actions/types';
import {API} from '../libs/api';
import UserDefaults from '../libs/UserDefaults';

/**
 *  AUTH_LOGIN SAGAS
 */
export const getLoginRequest = (args) => API
    .getLogin(args)
    .then((json) => {
      UserDefaults.set(STORAGE.TOKEN, json);
      return json;
    });

export function* fetchLoginRequest(action) {
  try {
    const payload = yield call(getLoginRequest, action.args);
    yield put({type: AUTH_LOGIN.SUCCESS, payload});
  } catch (error) {
    yield put({type: AUTH_LOGIN.FAILURE, payload: error});
  }
}

export function* watchLoginRequest() {
  yield takeEvery(AUTH_LOGIN.REQUEST, fetchLoginRequest);
}

/**
 *  AUTH_RESET SAGAS
 */
export const getResetRequest = (args) => API
    .getReset(args)
    .then((json) => json);

export function* fetchResetRequest(action) {
  try {
    const payload = yield call(getResetRequest, action.args);
    yield put({type: AUTH_RESET.SUCCESS, payload});
  } catch (error) {
    yield put({type: AUTH_RESET.FAILURE, payload: error});
  }
}

export function* watchResetRequest() {
  yield takeEvery(AUTH_RESET.REQUEST, fetchResetRequest);
}

/**
 *  AUTH_REGISTER SAGAS
 */
export const getRegisterRequest = (args) => API
    .getRegister(args)
    .then((json) => json);

export function* fetchRegisterRequest(action) {
  try {
    const payload = yield call(getRegisterRequest, action.args);
    yield put({type: AUTH_REGISTER.SUCCESS, payload});
  } catch (error) {
    yield put({type: AUTH_REGISTER.FAILURE, payload: error});
  }
}

export function* watchRegisterRequest() {
  yield takeEvery(AUTH_REGISTER.REQUEST, fetchRegisterRequest);
}

/**
 *  AUTH_LOGOUT SAGAS
 */

export const getLogoutRequest = async (args) => {
  const keys = [STORAGE.USER, STORAGE.TOKEN, STORAGE.CONFIGURATION];
  const res = UserDefaults.multiRemove(keys);
  return res.then((response) => {
    if (response == null) {
      return false;
    }
    return true;
  });
};

export function* fetchLogoutRequest(action) {
  try {
    const payload = yield call(getLogoutRequest, action.args);
    yield put({type: AUTH_LOGOUT.SUCCESS, payload});
  } catch (error) {
    yield put({type: AUTH_LOGOUT.FAILURE, payload: error});
  }
}

export function* watchLogoutRequest() {
  yield takeEvery(AUTH_LOGOUT.REQUEST, fetchLogoutRequest);
}
