import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    img: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '200px',
        height: '200px',
    },
    typo: {
        marginLeft: 'auto'
    },
}));

const Profile = (props) => {
    const { user } = props;
    const classes = useStyles();

    return (
        <div className={classes.img} style={{ width: "250px", height: "250px", }} >
            <Avatar className={classes.img}>
                <img style={{ width: "250px", height: "250px", }} src={`http://localhost:5000/images/${user.image}`} alt="" />
            </Avatar>
            <Typography className={classes.typo}>
                <strong>@{user.username}</strong>
            </Typography>
            <Typography className={classes.typo}>
                <strong>{user.firstname} {user.lastname}</strong>
            </Typography>
        </div>
    )
}

export default Profile;