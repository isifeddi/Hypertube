import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import Typography from '@material-ui/core/Typography';
import './home.css'

const useStyles = makeStyles(theme => ({
    root: {
        height: 310,
        width: 250,
        maxHeight : 350,
        margin : 5,
        boxShadow: 3,
      },
      media: {
        display: 'block',
        width: '100%',
        height: 310,
      },
}));

export default function Home(props) {
    const {movies} = props;
    const classes = useStyles();
    return(
        <>
        <Grid container justify="center">
            {movies.movies && movies.movies.map(element =>  (
            <Card className={classes.root} key={element.id || element._id}>
                <div className="container">
                    <img
                        className={classes.media}
                        src={(element.medium_cover_image && 'https://img.'+element.medium_cover_image.split('https://')[1] )|| (element.images.poster)} 
                        alt={element.title_long || element.title}
                    />
                    <div className="overlay">
                        <div className="text">
                            <h1>{element.title_long || element.title + (element.year && ` (${element.year})`)}</h1>
                            <Typography component="legend">Rating ({
                                (element.rating.percentage && (element.rating.percentage * 10 / 100).toFixed(1)) || 
                                (element.rating && (element.rating * 1).toFixed(1))
                                })
                            </Typography>
                            <Rating 
                                name="read-only" 
                                value={(element.rating.percentage && element.rating.percentage * 10 / 100) || 
                                (element.rating && element.rating)}
                                precision={0.1}
                                readOnly
                                max={10}
                            />
                        </div>
                    </div>
                </div>
            </Card>
            ))}
        </Grid>
        </>
    );
}