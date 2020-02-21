import {
    GET_MOVIES,GET_MOVIES_SUCCESS,GET_MOVIES_ERROR
} from "../actions/moviesAction";
  
const DEFAULT_STATE = {
    status: 'default',
    movies: [],
};

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case GET_MOVIES:
        {
            if(action.indice === 1)
                return {status: 'loading', movies: []};
            else
                return {status: 'loading2', movies: [...state.movies]};
        }
            
        case GET_MOVIES_SUCCESS:
            return {status: 'success', movies: action.data};
        case GET_MOVIES_ERROR:
            return {status: 'error', movies: action.error};
        default:
          return state;
    }
}