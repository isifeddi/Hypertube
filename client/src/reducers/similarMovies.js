import {
    GET_SIMILAR_MOVIES,GET_SIMILAR_MOVIES_SUCCESS,GET_SIMILAR_MOVIES_ERROR
} from "../actions/moviesAction";
  
const DEFAULT_STATE = {
    similarMovies: null,
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case GET_SIMILAR_MOVIES:
            return ('loading')
        case GET_SIMILAR_MOVIES_SUCCESS :
            return action.data 
        case GET_SIMILAR_MOVIES_ERROR :
            return {status : 'error', movieInfo : action.error}  
        default:
          return state;
    }
}