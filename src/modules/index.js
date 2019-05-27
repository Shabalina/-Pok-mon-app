import { combineReducers } from 'redux';
import { fork } from 'redux-saga/effects';
import all, { sagas as loadSagas } from './Load';

export default combineReducers({
    all
  });

export function* rootSaga() {
  yield fork(loadSagas);
}