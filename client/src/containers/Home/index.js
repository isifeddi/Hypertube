import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import Home from "../../components/Home";
import {GetMovies} from '../../actions/moviesAction';
import { useHistory } from "react-router-dom";
import {resetMoviesState} from '../../actions/resetStateAction';

const HomeContainer = (props) => {
    let history = useHistory();
    const {movies, getMovies, reset} = props;
    const [filter, setFilter] = useState({
        page: 1,
        title: null,
        sortBy: null,
        category: null,
    });
    useEffect(() => {
        getMovies(filter);
        return () => reset()
    }, []);
    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight){
            if(movies.status === 'success' && history.location.pathname === '/'){
                setFilter({...filter, page: filter.page + 1});
                getMovies({...filter, page: filter.page + 1});
            }
        }
    };
    const initializeFilter = () => {
        setFilter({
            page: 1,
            title: null,
            sortBy: null,
            category: null,
        })
    }
    const handleMovie = (data) => {
        document.documentElement.scrollTop = 0;
        if(data.imdb_id)
            history.push(`/view/${data.imdb_id}`);
        else
            history.push(`/view/${data.imdb_code}`);
    }
    const handleChangeSearch = (e) => {
        setFilter({
            page: 1,
            title: e.target.value,
            sortBy: null,
            category: null,
        })
    }
    const handleSubmitSearch = (e) => {
        filter.title && getMovies(filter);
    }
    const handleChangeCategory = (newValue) => {
        setFilter({
            page: 1,
            title: null,
            sortBy: filter.sortBy,
            category: newValue.value,
        })
        getMovies({page: 1, title: null, sortBy: filter.sortBy, category: newValue.value})
    }
    const handleChangeSort = (newValue) => {
        setFilter({
            page: 1,
            title: null,
            sortBy: newValue.value,
            category: filter.category,
        })
        getMovies({page: 1, title: null, sortBy: newValue.value, category: filter.category})
    }
    return (
        <div>
            <Home  
                    movies={movies}
                    handleChangeSearch={handleChangeSearch}
                    handleSubmitSearch={handleSubmitSearch}
                    handleChangeCategory={handleChangeCategory}
                    handleChangeSort={handleChangeSort}
                    handleMovie={handleMovie}    
                    initializeFilter={initializeFilter}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
            />
        </div>
    )
}
const mapStateToProps = (state) => (
{
    "user": state.user,
    "movies": state.movies,
});
const mapDispatchToProps = {
    "getMovies" : GetMovies,
    "reset": resetMoviesState,
};

export default connect(mapStateToProps,mapDispatchToProps)(HomeContainer);