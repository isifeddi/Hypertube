import {
    GET_COMMENTS_SUCCESS,
    GET_COMMENTS_ERROR,
    ADD_COMMENT_SUCCESS,
} from '../actions/moviesAction';

const DEFAULT_STATE = [];

export default function (state = DEFAULT_STATE, action) {
    switch (action.type) {
        case GET_COMMENTS_SUCCESS:
            return action.data;
        case GET_COMMENTS_ERROR:
            return DEFAULT_STATE;
        case ADD_COMMENT_SUCCESS:
        {
            const comments = [...state];
            comments.push(action.data); 
            return [...comments]
        }
        default:
            return state;
    }
}