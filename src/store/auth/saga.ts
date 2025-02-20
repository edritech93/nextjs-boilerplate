import { STORAGE } from "../../constants/define";
import { ScheduleBodyType, ResponseLoginType } from "@/types/ScheduleType";
import { takeEvery, put, call } from "redux-saga/effects";
import { ShowAlertType } from "../../types/ShowAlertType";
import { ProfileType } from "@/types/ProfileType";
import { appActions } from "../app/slice";
import { AxiosResponse } from "axios";
import { authActions } from "./slice";
import { API } from "@/libs/Api";

// NOTE: Login
const loginReq = async (body: ScheduleBodyType) => {
  return API.singleRequest(API.webCheckRoom(body))
    .then((response: AxiosResponse) => response.data.data)
    .catch((error: ShowAlertType) => {
      throw error;
    });
};

const getProfileReq = async () => {
  return API.singleRequest(API.getProfile())
    .then((response: AxiosResponse) => response.data.data)
    .catch((error: ShowAlertType) => {
      throw error;
    });
};

function* handleLogin(action: any): any {
  const body: ScheduleBodyType = action.payload;
  try {
    const objLogin: ResponseLoginType = yield call(loginReq, body);
    window.localStorage.setItem(STORAGE.TOKEN, objLogin.token);
    window.localStorage.setItem(STORAGE.REFRESH_TOKEN, objLogin.refreshToken);
    yield put(authActions.loginSuccessState(objLogin));
    const objProfile: ProfileType = yield call(getProfileReq);
    yield put(authActions.profileChangeState(objProfile));
  } catch (error) {
    yield put(appActions.alertRequestState(error as ShowAlertType));
    yield put(authActions.loginFailureState());
  }
}

export function* watchLogin() {
  yield takeEvery(authActions.loginRequestState.type, handleLogin);
}

// // NOTE: RE_LOGIN
// export const refreshAuthRequest = async () => {
//   return new Promise(async function (resolve, reject) {
//     const token = localStorage.getItem(STORAGE.REFRESH_TOKEN);
//     if (token) {
//       return API.singleRequest(API.refreshToken())
//         .then((response: AxiosResponse) => {
//           const objLogin = response.data.data;
//           localStorage.setItem(STORAGE.TOKEN, objLogin.token);
//           localStorage.setItem(STORAGE.REFRESH_TOKEN, objLogin.refreshToken);
//           resolve(objLogin);
//         })
//         .catch((error: ShowAlertType) => reject(error));
//     } else {
//       reject(false);
//     }
//   });
// };

// function* handleReLogin(_: any) {
//   try {
//     const { isConnected } = yield select(getStateApp);
//     if (isConnected) {
//       yield call(refreshAuthRequest);
//     }
//     yield put({ type: RE_LOGIN.SUCCESS });
//   } catch (error) {
//     yield put({ type: RE_LOGIN.FAILURE, error });
//     // NavigationService.resetRoot("Login");
//   }
// }

// export function* watchReLogin() {
//   yield takeEvery(RE_LOGIN.REQUEST, handleReLogin);
// }

// // NOTE: Helper
// const getStateApp = (state: any) => state.app;
