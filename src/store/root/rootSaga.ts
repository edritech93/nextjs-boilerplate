import { fork, all } from "redux-saga/effects";
import { watchAlertShow } from "../app/saga";
import { watchLogin } from "../auth/saga";

export function* rootSaga(): any {
  yield all([fork(watchAlertShow), fork(watchLogin)]);
}
