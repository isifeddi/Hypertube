import {fork, all} from "redux-saga/effects";
import registerSaga from "./registerSaga";
import loginSaga from './loginSaga';
import resetPasswordSaga from './resetPasswordSaga';
import moviesSaga from "./moviesSaga";
import profileSaga from "./profileSaga";

export default function *() {
  yield all([
    fork(registerSaga),
    fork(loginSaga),
    fork(resetPasswordSaga),
    fork(moviesSaga),
    fork(profileSaga),
  ]);
}