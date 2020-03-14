import React from 'react';
import { Field } from 'redux-form';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MyFlash from '../commun/flash';
import renderField from '../commun/TextField';
import FacebookIcon from '@material-ui/icons/Facebook';
import { MDBIcon } from "mdbreact";
import GitHubIcon from '@material-ui/icons/GitHub';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { Divider } from '@material-ui/core';

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
    margin: theme.spacing(3, 0, 2),
    backgroundColor: theme.palette.secondary.main
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: '#3E51B5',
  },
  img: {
    width: 50,
    height: 50,
  },
  divider:{
    margin: 15,
  }
}));

const Login = (props) => {
  const { handleSubmit, status, errors, registredStatus } = props;
  const classes = useStyles();
  const handleAuth2 = async () => {
    window.open("http://localhost:5000/auth/github", '_parent');
  }
  const handleAuth3 = async () => {
    window.open("http://localhost:5000/auth/linkedin", '_parent');
  }
  const handleAuth4 = async () => {
    window.open("http://localhost:5000/auth/google", '_parent');
  }
  const handleAuth5 = async () => {
    window.open("http://localhost:5000/auth/42", '_parent');
  }
  const handleAuth1 = async () => {
    window.open("http://localhost:5000/auth/spotify", '_parent');
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      {registredStatus === 'success' && <MyFlash variant="success" msg={['Registred successfully, check your e-mail']} />}
      {status === "errorField" && <MyFlash variant="error" msg={[errors]} />}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockRoundedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" color="primary">
          Sign in
        </Typography>

        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                name="username"
                label="Username"
                type="text"
                component={renderField}
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                name="password"
                type="password"
                component={renderField}
                rows='1'
                label="Password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={handleSubmit} fullWidth variant="contained" type="submit" color="primary" name="submit" value="ok" >Submit</Button>
            </Grid>
          </Grid>
        </form>
        <Grid container justify="flex-end">
          <Grid item xs>
            <Link to="/forgotPassword" style={{ textDecoration: 'none', color: '#3f51b5' }}>
              Forgot password?
              </Link>
          </Grid>
          <Grid item>
            <Link to="/register" style={{ textDecoration: 'none', color: '#3f51b5' }}>
              Don't have an account? Sign Up
              </Link>
          </Grid>
        </Grid>
        <div>

          <Divider className={classes.divider}/>


          <Button onClick={handleAuth2}><GitHubIcon style={{ width: '50', height: '50' }} /></Button>
          <Button onClick={handleAuth3} ><LinkedInIcon style={{ width: '50', height: '50' }} /></Button>
          <Button onClick={handleAuth4}><img className={classes.img} alt="" src='https://cdn2.iconfinder.com/data/icons/font-awesome/1792/google-512.png' /></Button>
          <Button onClick={handleAuth5}><img className={classes.img} alt="" src='https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/1200px-42_Logo.svg.png' /></Button>
          <MDBIcon fab icon="google" />
          <Button onClick={handleAuth1}><img className={classes.img} alt="" src='https://image.flaticon.com/icons/png/512/49/49097.png' /></Button>
        </div>
      </div>
    </Container>
  );
}

export default Login;