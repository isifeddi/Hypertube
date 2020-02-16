export const GET_MOVIES = "GET_MOVIES";
export const GET_MOVIES_SUCCESS = "GET_MOVIES_SUCCESS";
export const GET_MOVIES_ERROR = "GET_MOVIES_ERROR";

export const GetMovies = () => ({
    "type":  GET_MOVIES,
});

export const GetMoviesSuccess = (data) => ({
    "type":  GET_MOVIES_SUCCESS,
    data: data,
});

export const GetMoviesError = (error) => ({
    "type":  GET_MOVIES_ERROR,
    error: error,
});