import {fork} from 'redux-saga/effects';
import {watchShowAlert} from './app';

export default function* rootSaga() {
  yield [
    yield fork(watchShowAlert),
  ];
}
