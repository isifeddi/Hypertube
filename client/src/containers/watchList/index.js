import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import WatchList from "../../components/watchList";
import { getSeenMovies } from '../../actions/moviesAction';
import { useHistory } from "react-router-dom";

const WatchListContainer = (props) => {
    let history = useHistory();
    const { watchList, getSeenMovies, user } = props;

    useEffect(() => {
        getSeenMovies(user.id)
    }, []);

    const handleMovie = (data) => {
        history.push(`/view/${data.imdb}`);
    }
    return (
        <>
            <WatchList
                movies={watchList}
                handleMovie={handleMovie}
            />
        </>
    )
}
const mapStateToProps = (state) => (
    {
        "user": state.user,
        "watchList": state.watchList
    });
const mapDispatchToProps = {
    "getSeenMovies": getSeenMovies
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchListContainer);