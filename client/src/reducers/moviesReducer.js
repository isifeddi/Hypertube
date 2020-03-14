import {
    GET_MOVIES,GET_MOVIES_SUCCESS,GET_MOVIES_ERROR
} from "../actions/moviesAction";
import {RESET_MOVIES_STATE} from '../actions/resetStateAction';
const DEFAULT_STATE = {
    status: 'default',
    movies: [],
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case GET_MOVIES:
        {
            if(action.filter.page === 1)
                return {status: 'loading', movies: []};
            else
                return {status: 'loading2', movies: [...state.movies]};
        }  
        case GET_MOVIES_SUCCESS:
            return {status: 'success', movies: action.data};
        case GET_MOVIES_ERROR:
            return {status: 'error', movies: []};
        case RESET_MOVIES_STATE:
            return DEFAULT_STATE;
        default:
          return state;
    }
}