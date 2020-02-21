import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StarIcon from '@material-ui/icons/Star';
import SearchSharpIcon from '@material-ui/icons/SearchSharp';
import FilterListSharpIcon from '@material-ui/icons/FilterListSharp';
import Fab from '@material-ui/core/Fab';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import Select from 'react-select';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Slider from '@material-ui/core/Slider';
import './home.css'

const useStyles = makeStyles(theme => ({
    upBtn : {
        zIndex: 99,
        position: 'fixed',
        bottom: '7%',
        right: '1%',
    },
    rating: {
        maxWidth:400
    },
}));

export default function Home(props) {
    const {movies} = props;
    const classes = useStyles();
    const [filter, setFilter] = React.useState(false);
    const [search, setSearch] = React.useState(false);
    return(
        <>
            <Grid className="filterCont" container justify="center" direction="row">
                
                    <Tooltip title="Search">
                        <IconButton aria-label="Search" onClick={() => {setSearch(!search); filter && setFilter(!filter)}}>
                            <SearchSharpIcon className="searchButton" color="primary" fontSize="large"/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Filter">
                        <IconButton aria-label="Filter" onClick={() => {search && setSearch(!search); setFilter(!filter)}}>
                            <FilterListSharpIcon className="filterButton" color="primary" fontSize="large"/>
                        </IconButton>
                    </Tooltip>
            </Grid>
            <Grid className="filterCont" container alignContent="center" direction="column">
                {search &&
                <Grid item xs={12}>
                    <TextField
                        placeholder="Find a movie ..."
                    />
                </Grid>}
                {filter &&
                <Grid item xs={12}>
                    <CardContent>
                        <Grid container justify="center" spacing={2} xs={12}>
                            <Grid item xs={6} className={classes.rating}>
                                <Tooltip title ="DESC">
                                    <IconButton aria-label="View"  >
                                        <KeyboardArrowDownIcon  color="primary"/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title ="ASC">
                                    <IconButton aria-label="View"  >
                                        <ExpandLessIcon  color="primary"/>
                                    </IconButton>
                                </Tooltip>
                                <Typography id="range-slider1" gutterBottom align="center">
                                    Rating
                                </Typography>
                                <Slider
                                    //value={rating}
                                    //onChange={handleChangeRating}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    step={0.2}
                                    //marks={marks}
                                    min={0}
                                    max={10}
                                />
                            </Grid>
                            <Grid item xs={6} className={classes.rating}>
                                <Tooltip title ="DESC">
                                    <IconButton aria-label="View" >
                                        <KeyboardArrowDownIcon  color="primary"/>
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title ="ASC">
                                    <IconButton aria-label="View">
                                        <ExpandLessIcon  color="primary"/>
                                    </IconButton>
                                </Tooltip>
                                <Typography id="range-slider2" gutterBottom align="center">
                                    Production year
                                </Typography>
                                <Slider
                                    //value={age}
                                    //onChange={handleChangeAge}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    step={1}
                                    min={1910}
                                    max={2020}
                                />
                            </Grid>
                            <Grid item xs={12} className={classes.rating}>
                                
                                <Typography id="range-slider5" gutterBottom align="center">
                                    Category
                                </Typography>
                                <Select
                                    isClearable={false}
                                    //onChange={handleChangeTags}
                                    options={[{'label': 'Action', 'label' : 'Animation'}]}
                                    //styles={customStyles}
                                    placeholder="Select a category"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                </Grid>}
            </Grid>
            <Grid container justify="center">
                <Fab    className={classes.upBtn}
                        color="primary"
                        size="medium"
                        onClick={() => {document.documentElement.scrollTop = 0}}
                >
                    <KeyboardArrowUpIcon />
                </Fab>
                {movies.movies && movies.movies.map((element, index) =>  (
                <React.Fragment key={index}>
                {((element.medium_cover_image) || (element.images.poster && element.images.poster !== 'N/A' && element.images.poster !== 'images/posterholder.png')) &&
                <Card className="card">
                    <div className="container">
                        <img
                            className="media"
                            src={(element.medium_cover_image && 'https://img.'+element.medium_cover_image.split('https://')[1] )|| (element.images.poster)} 
                            alt={element.title_long || element.title}
                        />
                        <div className="overlay">
                            <div className="text">
                                <h1>{element.title_long || element.title + (element.year && ` (${element.year})`)}</h1>
                                <Typography component="legend">
                                    <StarIcon style={{fill: 'yellow'}}/>({
                                    (element.rating.percentage && (element.rating.percentage * 10 / 100).toFixed(1)) || 
                                    (element.rating && (element.rating * 1).toFixed(1))}/10)
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Card>
                }
                </React.Fragment>
                ))}
            </Grid>
        
        </>
    );
}