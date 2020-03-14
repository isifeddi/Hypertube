import React from 'react'
import './index.css';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import YouTubeIcon from '@material-ui/icons/YouTube';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import Button from '@material-ui/core/Button';
import Comment from './comment'
import Modal from '../commun/modal';
import { Redirect } from "react-router-dom";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { LinearProgress } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  gridList: {
    flexWrap: 'nowrap',
    height: 320,
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  button: {
    margin: 10,
    position: "flex",

  },
  button1: {
    margin: 10,
    position: "flex",

  },
  size: {
    width: '100%',
    height: '150px',
    display: 'flex',
  },
  center: {
    position: 'relative',
    left: '25px',
  },
  loading: {
    position: 'fixed',
    top: '10%',
    width: '100%',
    height: '30%'
  }
}));
const sub = (subtitles) => {
  let subt = {
    ar: null,
    fr: null,
    en: null
  };
  if (subtitles) {
    for (var i = 0; i < subtitles.length; i++) {
      if (subtitles[i].langShort == 'ar')
        subt.ar = "data:text/vtt;base64," + subtitles[i].fileName
      if (subtitles[i].langShort == 'fr')
        subt.fr = "data:text/vtt;base64," + subtitles[i].fileName
      if (subtitles[i].langShort == 'en')
        subt.en = "data:text/vtt;base64," + subtitles[i].fileName
    }
  }

  return subt;
}
const ViewMovie = (props) => {

  const { user, movieDetails, hash, handleWatch, isOpen, handleClose, similarMovies, handleMovie, comments, handleAddComment, handleChangeComment, handleVp } = props;
  const subtitles = sub(movieDetails.subtitles);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const quality = movieDetails.torrents;
  const classes = useStyles();

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClosee = () => {
    setAnchorEl(null);
  };
  return (
    <>
      {movieDetails !== 'loading' && movieDetails !== 'error' &&
        <div className="root">
          <Grid container spacing={2}>
            <Grid item container justify="center" xs={12} sm={4} >
              {movieDetails.trailer && <Button href={movieDetails.trailer} target="_blank" className={classes.button1} variant="contained" color="primary" startIcon={<YouTubeIcon />}>Trailer</Button>}
              {movieDetails.torrents && <Button className={classes.button} variant="contained" color="primary" startIcon={<PlayCircleFilledIcon />} onClick={handleClick}>Watch</Button>}
              <img src={movieDetails.Poster} className="image" alt="" />
              {isOpen && <Modal isOpen={isOpen} handleClose={handleClose}>
                <video controls width="100%" height="500px">
                  <source src={"http://localhost:5000/streaming/" + hash} type="video/mp4" />
                  {subtitles.ar && <track kind="subtitles" src={subtitles.ar} srcLang="ar" default={user.langue === "ar" ? true : false} />}
                  {subtitles.fr && <track kind="subtitles" src={subtitles.fr} srcLang="fr" default={user.langue === "fr" ? true : false} />}
                  {subtitles.en && <track kind="subtitles" src={subtitles.en} srcLang="en" default={user.langue === "en" ? true : false} />}
                </video>
              </Modal>}

              <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClosee}>

                {quality && Object.keys(quality).map((tile, index) => (
                  <MenuItem key={index} onClick={() => { handleWatch(tile) }}>{tile}</MenuItem>
                ))}

              </Menu>
            </Grid>
            <Grid item xs={12} sm={6}>
              <List>
                <Typography color="textSecondary" variant="h2" align="center">{movieDetails.Title}</Typography>
                <Divider />
                <ListItem  >
                  <Typography color="textSecondary" variant="h4" >Description </Typography>
                </ListItem>
                <ListItem >
                  <Typography variant="h6">{movieDetails.Plot}</Typography>
                </ListItem>
                <Divider light />
                <ListItem  >
                  <Typography color="textSecondary" variant="h4" >Genres </Typography>
                </ListItem>
                <ListItem >
                  <Typography variant="h6">{movieDetails.Genre}</Typography>
                </ListItem>
                <Divider light />
                <ListItem  >
                  <Typography color="textSecondary" variant="h4" >Year </Typography>
                </ListItem>
                <ListItem >
                  <Typography variant="h5"  >{movieDetails.Year}</Typography>
                </ListItem>
                <Divider light />
                <ListItem  >
                  <Typography color="textSecondary" variant="h4" >Country </Typography>
                </ListItem>
                <Divider light />
                <ListItem  >
                  <Typography variant="h5" >{movieDetails.Country} </Typography>
                </ListItem>
                <ListItem  >
                  <Typography color="textSecondary" variant="h4" >Duration </Typography>
                </ListItem>
                <Divider light />
                <ListItem  >
                  <Typography variant="h5" >{movieDetails.Runtime} </Typography>
                </ListItem>
                <ListItem  >
                  <Typography color="textSecondary" variant="h4" >Actors</Typography>
                </ListItem>
                <Divider light />
                <ListItem  >
                  <Typography variant="h5" >{movieDetails.Actors} </Typography>
                </ListItem>

              </List>
            </Grid>
            
            <Grid item xs={12}>
              {similarMovies && <Typography color="textSecondary" variant="h4" >Similar movies</Typography>}
              <GridList className={classes.gridList} cols={6}>
                {similarMovies && similarMovies.map((tile, index) => (
                  <div  key={Math.random() + index}>
                    <GridListTile >
                      <button onClick={(e) => handleMovie(tile.id)}>
                        <img style={{ height: '310px' }} src={`http://image.tmdb.org/t/p/w185/${tile.poster_path}`} alt="s" />
                      </button>
                    </GridListTile>
                  </div>
                ))}
              </GridList>
            </Grid>
            <Grid item xs={12}>
              <Comment handleVp={handleVp} handleChangeComment={handleChangeComment} handleAddComment={handleAddComment} comments={comments} />
            </Grid>
          </Grid>
        </div>
      }

      {movieDetails === 'loading' &&
        <Grid className={classes.loading} container justify="center">
          <img src={`https://media.giphy.com/media/UpDq7PzULQYhlIZKMC/giphy.gif`} alt="s" />
        </Grid>}
      {movieDetails === 'error' && Redirect(`http://localhost:3000/`)}
    </>
  )
}
export default ViewMovie;
