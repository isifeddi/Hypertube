import React, {useEffect} from 'react'
import {connect} from "react-redux";
import Home from "../../components/Home";
import {GetMovies} from '../../actions/moviesAction';

const HomeContainer = (props) => {
    const {movies, getMovies} = props;
    useEffect(() => {
        getMovies();
    }, []);
    return (
        <div>
            <Home movies={movies}/>
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