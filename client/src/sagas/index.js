import {fork, all} from "redux-saga/effects";
import registerSaga from "./registerSaga";
import loginSaga from './loginSaga';
import logoutSaga from "./logoutSaga";
import resetPasswordSaga from './resetPasswordSaga';
import moviesSaga from "./moviesSaga";

export default function *() {
  yield all([
    fork(registerSaga),
    fork(loginSaga),
    fork(logoutSaga),
    fork(resetPasswordSaga),
    fork(moviesSaga),
  ]);
}