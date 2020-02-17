import {takeLatest, put,call} from "redux-saga/effects";
//import {push} from "react-router-redux";
//import {resetState} from '../actions/resetStateAction';
import {GetMoviesError, GetMoviesSuccess} from '../actions/moviesAction';
import {request} from './helper';

const getMovies =
    function *getMovies () {
        try {
            const response = yield call(request, {
                //"url": "https://yts.unblocked4u.org/api/v2/list_movies.json/?limit=50&sort_by=rating&order_by=desc&page=1",
                "url": "https://tv-v2.api-fetch.website/movies/1?sort=year,rating&order=-1",
                "method": "GET"
            });
            if(response.data.status === 'ok'){
                
                yield put(GetMoviesSuccess(response.data.data.movies));
            }
            else
                yield put(GetMoviesSuccess(response.data));

        }catch (error) {
            if (error.response) {
                yield put(GetMoviesError("error.response.statusText", "error.response.status"));
            }
        }
    };

export default function *() {
  yield takeLatest("GET_MOVIES", getMovies);
}