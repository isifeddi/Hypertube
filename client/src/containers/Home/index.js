import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import Home from "../../components/Home";
import {GetMovies} from '../../actions/moviesAction';

const HomeContainer = (props) => {
    const {movies, getMovies} = props;
    const [page, setPage] = useState(1);
    // const [page, setPage] = useState({
    //     page: 1
    // });
    useEffect(() => {
        getMovies(page);
        setPage(page + 1);
    }, []);
    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            if(movies.status === 'success'){
                getMovies(page);
                setPage(page + 1);
            }
        }
    };
    return (
        <div>
            <Home movies={movies} />
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
};

export default connect(mapStateToProps,mapDispatchToProps)(HomeContainer);