import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CardContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const useStyles = makeStyles(theme => ({
    root: {
        width: 250,
        height: 300,
        maxHeight : 500,
        margin : 5,
        boxShadow: 3,
      },
      media: {
        height: 300,
        width:400
      },
      content: {
        width : 400,
        maxHeight: 180,
      },
      actions: {
        width : 400,
        maxHeight: 20,
      },
  
}));

export default function Home(props) {
    const {movies} = props;
    const classes = useStyles();
    const [over, setOver] = React.useState(null);
    return (
        <>
        <Grid container justify="center">
            {movies.movies && movies.movies.map(element => 
                <Card key={element.id} className={classes.root}>
                    {/* <CardHeader
                        className={classes.header}
                        title={element.title_long}
                        subheader={"Genres: " + element.genres.map(e => `${e}` + ' ')}
                    /> */}
                    <CardMedia
                        className={classes.media}
                        image={element.background_image_original}
                        onMouseOver={() => {setOver(true)
                            console.log(over)}}
                    />
                    { over === true && <CardContent className={classes.content}>
                        <Typography variant="body2" color="textSecondary" component="p">
                        {element.summary ? element.summary : 'No summary'}
                        </Typography>
                    </CardContent> }
                    
                </Card>
            )}

        </Grid>
        </>
    );
    // return(
    //     <>
    //     <Grid container justify="center">
    //         <GridList>
    //             {movies.movies && movies.movies.map(element =>  (
    //             <GridListTile className={classes.root} key={element.id} onMouseOver={() => setOver(true)} onMouseOut={() => setOver(false)}>
    //                 <img 
    //                     className={classes.media} 
    //                     src={element.background_image_original} 
    //                     alt={element.title} 
                        
    //                 />
    //                 {over === true && <GridListTileBar
    //                     title={element.title_long}
    //                     subtitle={<span>{element.summary}</span>}
    //                 />}
    //             </GridListTile>
    //             ))}
    //         </GridList>
    //     </Grid>
    //     </>
    // );
}