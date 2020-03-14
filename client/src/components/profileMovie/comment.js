import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { Button, IconButton } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import InputAdornment from "@material-ui/core/InputAdornment";
import './index.css'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
  },
  inline: {
    display: 'inline',
  },
  input: {
    width: 360,
  }
}));

const Comments = (props) => {
  const { comments, handleAddComment, handleChangeComment, handleVp } = props;
  const classes = useStyles();
  return (
    <>
      <Typography color="textSecondary" variant="h4" >Comments </Typography>
      <List className={classes.root}>
        {comments && comments.length > 0 && comments.map((tile, index) => (
          <ListItem alignItems="flex-start" key={index}>
            <ListItemAvatar >
              <IconButton onClick={(e) => handleVp(tile)}>
                <Avatar alt={tile.username} src={`http://localhost:5000/images/${tile.image}`} />
              </IconButton>
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6">{tile.username}</Typography>}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body1"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {tile.content}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        ))}
      </List>
      {comments && comments.length === 0 && <p>No comments found</p>}
      <form onSubmit={handleAddComment}>
        <TextField
          className={classes.input}
          placeholder="Add comment ..."
          InputProps={{
            'aria-label': 'description',
            'endAdornment': (
              <InputAdornment>
                <Button type="submit">ADD</Button>
              </InputAdornment>
            )
          }}
          onChange={handleChangeComment}
          variant='outlined'
        />
      </form>
    </>
  )
}

export default Comments;