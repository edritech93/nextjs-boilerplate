// import {put, call, takeEvery} from 'redux-saga/effects';
// import {
//   AUTH_LOGIN,
// } from '../actions/types';
// import {API} from '../libs/api';

// export const getLoginRequest = (args) => API
//     .getLogin(args)
//     .then((json) => {
//       return json;
//     });

// export function* fetchLoginRequest(action) {
//   try {
//     const payload = yield call(getLoginRequest, action.args);
//     yield put({type: AUTH_LOGIN.SUCCESS, payload});
//   } catch (error) {
//     yield put({type: AUTH_LOGIN.FAILURE, payload: error});
//   }
// }

// export function* watchLoginRequest() {
//   yield takeEvery(AUTH_LOGIN.REQUEST, fetchLoginRequest);
// }
