import { takeLatest, put, call, select } from "redux-saga/effects";
import {
    GetMoviesError,
    GetMoviesSuccess,
    getMovieDataSuccess,
    getMovieDataError,
    getSimilarMoviesError,
    getSimilarMoviesSuccess,
    getCommentsSuccess,
    getCommentsError,
    addCommentSuccess,
    addCommentError,
    getSeenMoviesSuccess,getSeenMoviesError
} from '../actions/moviesAction';
import { request } from './helper';

const getMovies =
    function* getMovies({ filter }) {
        try {
            const token = yield select((state) => state.user.token);

            const response = yield call(request, {
                "url": 'http://localhost:5000/getMovies',
                "data": { filter: filter },
                "method": "POST"
            }, token);


            let oldData = yield select((state) => state.movies.movies)
            let newData = response.data;
            let data = null;
            if (filter.page !== 0)
                data = oldData.concat(newData);
            else
                data = newData;
            yield put(GetMoviesSuccess(data));
        } catch (error) {
            if (error.response) {
                yield put(GetMoviesError("error.response.statusText", "error.response.status"));
            }
        }
    };

const getMovieData =
    function* getMovieData({ data }) {
        try {

            const token = yield select((state) => state.user.token);

            const response = yield call(request, {
                "url": 'http://localhost:5000/getMovieData',
                "data": data,
                "method": "POST"
            }, token);
            let res = response.data;
            if (res) {
                if (res.isData === true)
                    yield put(getMovieDataSuccess(res.data));
                else if (res.isData === false)
                    yield put(getMovieDataError('error'));
            }
            else
                yield put(getMovieDataError('error'));
        } catch (error) {
            if (error.response) {
                yield put(getMovieDataError("error"));
            }
        }
    };

const getSimilarMovies =
    function* getSimilarMovies({ data }) {
        try {
            const token = yield select((state) => state.user.token);
            const response = yield call(request, {
                "url": 'http://localhost:5000/getSimilarMovies',
                "data": data,
                "method": "POST"
            }, token);
            if (response.data) {
                yield put(getSimilarMoviesSuccess(response.data));
            }
            else
                yield put(getSimilarMoviesError('error'));
        } catch (error) {
            if (error.response) {
                yield put(getSimilarMoviesError("error"));
            }
        }
    };
    const updateSeen =
    function *updateSeen ({data}) {
        try {
            const token = yield select((state) => state.user.token);
            const response = yield call(request, {
                "url": 'http://localhost:5000/updateSeen',
                "data": data,
                "method": "POST"
            },token);
           
            if(response.data){
                
            }
            
        }catch (error) {
            if (error.response) {
               
            }
        }
    };
    const getSeenMovies =
    function *getSeenMovies (data) {
        try {
            const token = yield select((state) => state.user.token);
            const response = yield call(request, {
                "url": 'http://localhost:5000/getSeenMovies',
                "data": data,
                "method": "POST"
            },token);
            if(response.data){
                yield put(getSeenMoviesSuccess(response.data))
            }
            else
            yield put(getSeenMoviesError('error'))
            
        }catch (error) {
            if (error.response) {
                yield put(getSeenMoviesError('error'))
            }
        }
    };

const getComments =
    function* getComments({ data }) {
        try {
            const token = yield select((state) => state.user.token);
            const response = yield call(request, {
                "url": 'http://localhost:5000/getComments',
                "data": data,
                "method": "POST"
            }, token);
            if (response.data.isValid) {
                yield put(getCommentsSuccess(response.data.comments));
            }
            else
                yield put(getCommentsError());
        } catch (error) {
            if (error.response) {
                yield put(getCommentsError());
            }
        }
    };

const addComment =
    function* addComment({ data }) {
        try {

            const token = yield select((state) => state.user.token);
            const response = yield call(request, {
                "url": 'http://localhost:5000/addComment',
                "data": data,
                "method": "POST"
            }, token);        
            if (response.data.isValid) {
                yield put(addCommentSuccess(response.data));
            }
            else
                yield put(addCommentError());
        } catch (error) {
            if (error.response) {
                yield put(addCommentError());
            }
        }
    };

export default function* () {
    yield takeLatest("GET_MOVIES", getMovies);
    yield takeLatest("GET_MOVIE_DATA", getMovieData);
    yield takeLatest("GET_SIMILAR_MOVIES", getSimilarMovies);
    yield takeLatest("UPDATE_SEEN", updateSeen);
    yield takeLatest("GET_SEEN_MOVIES", getSeenMovies);
    yield takeLatest("GET_COMMENTS", getComments);
    yield takeLatest("ADD_COMMENT", addComment);
}