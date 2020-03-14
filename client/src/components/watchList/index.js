import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import Grid from '@material-ui/core/Grid';
import './index.css';

const useStyles = makeStyles(theme => ({
    loading: {
        position: 'fixed',
        top: '50%',
    }
}));

export default function Home(props) {
    const { movies, handleMovie } = props;
    const classes = useStyles();
    return (
        <>
            <Grid container justify="center">
                {movies && movies !== 'loading' && movies.length > 0 && movies.map((element, index) => (
                    <React.Fragment key={index}>
                        <Card className="card">
                            <div className="container">
                                <img
                                    className="media"
                                    src={(element.poster)}
                                    alt={element.title}
                                />
                                <button onClick={(e) => handleMovie(element)} >
                                    <div className="overlay">
                                        <div className="text">
                                            <h1>{element.title + ` (${element.year})`}</h1>
                                            <Typography component="legend">
                                                <StarIcon style={{ fill: 'yellow' }} />
                                                ({element.rating})
                                        </Typography>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </Card>
                    </React.Fragment>
                ))}
                {movies && movies !== 'loading' && movies.length === 0 && <p className="noMovies">No movies found</p>}
            </Grid>
        </>
    );
}