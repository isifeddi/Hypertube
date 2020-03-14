import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import { Field } from 'redux-form';
import renderField from '../commun/TextField'
import { Avatar } from '@material-ui/core';
import RadioGroup from '../commun/RadioGroup';

const useStyles = makeStyles(theme => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%'
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(2, 0, 2),
        backgroundColor: '#3E51B5'
    },
    avatar: {
        width: 50,
        height: 50,
    },
    input: {
        display: 'none',
    },
    button: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    img: {
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '200px',
        height: '200px',
    },
    spacing: {
        margin: theme.spacing(4, 0, 4),
    }
}));

const Profile = (props) => {
    const { handleSubmit, fileChangedHandler, user } = props;
    const classes = useStyles();

    return (
        <div >
            <div className={classes.img} style={{ width: "250px", height: "250px", }} >
                <Avatar className={classes.img} src={`http://localhost:5000/images/${user.image}`} alt="" />
                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={event => fileChangedHandler(event)} />
                <label htmlFor="icon-button-file">
                    <Button color="primary" aria-label="upload picture" component="span">
                        Modifier
                        </Button>
                </label>
            </div>
            <form className={classes.spacing}>
                <Grid container justify="center" spacing={2}>
                    <Grid item xs={5}>
                        <FormLabel component="legend">Firstname</FormLabel>
                        <Field
                            name="firstname"
                            component={renderField}
                            type="text"
                            rows='1'
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <FormLabel component="legend">Lastname</FormLabel>
                        <Field
                            name="lastname"
                            component={renderField}
                            type="text"
                            rows='1'
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <FormLabel component="legend">Username</FormLabel>
                        <Field
                            name="username"
                            component={renderField}
                            type="text"
                            rows='1'
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <FormLabel component="legend">Email</FormLabel>
                        <Field
                            name="email"
                            component={renderField}
                            type="email"
                            rows='1'
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <FormLabel component="legend">New password</FormLabel>
                        <Field
                            name="password"
                            component={renderField}
                            type="password"
                            rows='1'
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <FormLabel component="legend">Confirm new password</FormLabel>
                        <Field
                            name="confirmPassword"
                            component={renderField}
                            type="password"
                            rows='1'
                        />
                    </Grid>
                    <Grid item xs={10}>
                        <FormLabel component="legend">Langue</FormLabel>
                        <Field component={RadioGroup} name="langue" required={true} options={[
                            { title: 'English', value: 'en' },
                            { title: 'French', value: 'fr' },
                            { title: 'Arab', value: 'ar' }
                        ]}
                        />
                    </Grid>
                    <Grid item container justify='center' xs={3}>
                        <Button onClick={handleSubmit} className={classes.submit} fullWidth variant="contained" type="submit" color="primary" name="submit" value="ok" >Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    )
}

export default Profile;