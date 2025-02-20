import { put, takeEvery } from "redux-saga/effects";
import { appActions } from "./slice";
import { ShowAlertType } from "@/types/ShowAlertType";
// import { reLoginRequest } from "@/actions/auth";

// NOTE: show alert
function* handleShowAlert(action: any) {
  const {
    title = "Success",
    message,
    type = "success",
    status,
  } = action.payload;
  if (message && status !== 401) {
    const desc =
      typeof message === "object" ? JSON.stringify(message) : message;
    const payload: ShowAlertType = { ...action.payload, title, message, type };
    yield put(appActions.alertSuccessState(payload));
  } else if (status === 401) {
    // yield put(reLoginRequest());
  }
}

export function* watchAlertShow() {
  yield takeEvery(appActions.alertRequestState.type, handleShowAlert);
}
