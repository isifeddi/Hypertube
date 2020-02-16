import {takeLatest, put,call,delay} from "redux-saga/effects";
import {push} from "react-router-redux";
import {resetState} from '../actions/resetStateAction';
import {loginError, loginUserSuccess,loginErrorField} from "../actions/loginAction";
import {updateUserSuccess} from '../actions/userAction'
import {request} from './helper';
import socket from '../socketConn';

const login =
  function *login ({data}) {
    try {
    const username = data.username;
    const password = data.password;
      const response = yield call(request, {
        "url": "http://localhost:5000/login",
        "data": {
          username,
          password
        },
        "method": "post"
      });
     
      if(response.data.isValid)
      {
        const  user = response.data.user;
        yield put(loginUserSuccess());
        yield put(updateUserSuccess(user));
        
        socket.emit('join', {id: user.id});
        yield put(push("/home"));
      }
      else
      {
        yield put(loginErrorField(response.data.errorField))
        yield delay(4000);
        yield put(resetState());
      }
    }catch (error) {
      if (error.response) {
        yield put(loginError("error.response.statusText", "error.response.status"));
      }
    }
  };

export default function *() {
  yield takeLatest("LOGIN_USER", login);
}