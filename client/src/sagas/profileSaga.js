import { takeLatest, call,put,select, delay} from "redux-saga/effects";
import {resetState} from "../actions/resetStateAction";
import {editInfoError,sendImageError} from "../actions/profileAction";
import { updateUserSuccess,updateImage} from '../actions/userAction';
import {request} from './helper';

const edit_Info =
function *edit_Info ({data}) {
    try {
        const id = yield select((state) => state.user.id);
        const info = {...data,id}
        const token = yield select((state) => state.user.token);
        const response = yield call(request, {
                "url": "http://localhost:5000/editProfile",
                "data": info,
                "method": "post"
              },token);
        
        if(response.data.result.valid)
        {
            yield put(updateUserSuccess(response.data.uu));
        }
        else
        {
            yield put(editInfoError(response.data.err));
        }
        yield delay(4000);
        yield put(resetState());
    }catch (error) {
        if (error.response) {
            yield put(editInfoError('there has been an error'));
        }
    }
};
const sendPictures =
  function *sendPictures ({data}) {
    try {
      const token = yield select((state) => state.user.token);
      const response = yield call(request, {
                "url": "http://localhost:5000/upload",
                "data": data,
                "method": "post"
              },token);
              const res = response.data;  
    if(res)
    {
     if(res.isValid === true)
     {
      yield put(updateImage(res.data))
     }
        
      else if(!res.isValid)
      yield put(sendImageError(res.error));
    }  
    }catch (error) {
      if (error.response) {
        yield put(sendImageError(error.response));
      }
    }
};

export default function *() {
  yield takeLatest("EDIT_INFO", edit_Info);
  yield takeLatest("SEND_IMAGE", sendPictures);
}