import {
    GET_SEEN_MOVIES,GET_SEEN_MOVIES_SUCCESS,GET_SEEN_MOVIES_EROOR
} from "../actions/moviesAction";
  
const DEFAULT_STATE = null;

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case GET_SEEN_MOVIES:
            return 'loading';
        case GET_SEEN_MOVIES_SUCCESS :
            return [...action.data ]
        case GET_SEEN_MOVIES_EROOR :
            return {status : 'error', movieInfo : action.error}  
        default:
          return state;
    }
}