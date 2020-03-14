import { connectRouter } from "connected-react-router";
import registerReducer from "./registerReducer";
import loginReducer from "./loginReducer";
import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import resetPasswordReducer from "./resetPasswordReducer";
import userReducer from './userReducer';
import moviesReducer from './moviesReducer';
import movieDetails from './movieDetails';
import similarMovies from './similarMovies'
import watchList from './watchList'
import commentsReducer from './commentsReducer';
const combinedReducer = (history)=> combineReducers({
    "router" : connectRouter(history),
    "register" : registerReducer,
    "login": loginReducer,
    "resetPassword": resetPasswordReducer,
    "user": userReducer,
    "movies": moviesReducer,
    "movieDetails" : movieDetails,
    "similarMovies" : similarMovies,
    "watchList" : watchList,
    "movieDetails": movieDetails,
    "similarMovies": similarMovies,
    "comments": commentsReducer,
    form
});

export default combinedReducer;