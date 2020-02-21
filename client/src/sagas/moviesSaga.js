import {takeLatest, put,call, select} from "redux-saga/effects";
//import {push} from "react-router-redux";
//import {resetState} from '../actions/resetStateAction';
import {GetMoviesError, GetMoviesSuccess} from '../actions/moviesAction';
import {request} from './helper';

const getMovies =
    function *getMovies ({indice}) {
        try {
            // const id = yield select((state) => state.user.id);
            // const token = yield select((state) => state.user.token);
            const response = yield call(request, {
                "url": 'http://localhost:5000/getMovies',
                "data": {page:  indice},
                "method": "POST"
            });
            if(response.data.length > 0){
                let oldData = yield select ((state) => state.movies.movies)
                let newData = response.data;
                let data = null;
                if(indice.indice !== 0)
                    data = oldData.concat(newData);
                else
                    data = newData;
                yield put(GetMoviesSuccess(data));
            }
            else
                yield put(GetMoviesError('error'));
        }catch (error) {
            if (error.response) {
                yield put(GetMoviesError("error.response.statusText", "error.response.status"));
            }
        }
    };

export default function *() {
    yield takeLatest("GET_MOVIES", getMovies);
}