import {
    GET_MOVIE_DATA,GET_MOVIE_DATA_SUCCESS,GET_MOVIE_DATA_ERROR
} from "../actions/moviesAction";
  
const DEFAULT_STATE = {
    movies: null,
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case GET_MOVIE_DATA :
            return ('loading')
        case GET_MOVIE_DATA_SUCCESS :
            return (action.data)
        case GET_MOVIE_DATA_ERROR :
            return 'error'
        default:
          return state;
    }
}