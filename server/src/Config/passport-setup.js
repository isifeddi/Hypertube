const passport = require("passport");
const FortyTwoStrategy = require('passport-42').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LinkedInStrategy = require('@sokratis/passport-linkedin-oauth2').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
const SpotifyStrategy = require('passport-spotify').Strategy;
const user = require('../models/user');
const bcrypt = require ('bcrypt');
const app = require('../app');
const cors = require("cors");
const tools = require('../tools/index');
const keys = require("./keys")
//////////////////////

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

/* FORTY TWO STRATEGY */

passport.use(
    new FortyTwoStrategy(
      {
        clientID: keys.FORTYTWO.clientID,
        clientSecret: keys.FORTYTWO.clientSecret,
        callbackURL: "http://localhost:5000/auth/42/redirect"
      },
      async (token,tokenSecret,profile, done) => {
          let omni_id = "ft" + profile._json.id;
          let currentUser = await  user.getUser('GetUserByOmni',omni_id);
        if (!currentUser) {
              let image_url =(profile._json.image_url).split('/')[4];
              let Password = tools.generate(profile._json.id,profile._json.login);
              
              let hashPassword = await bcrypt.hash(Password, 10);
              tools.download(profile._json.image_url,"./public/images/" + image_url ,function(){})
              user.Register(profile._json.last_name, profile._json.first_name, (profile._json.login).toLowerCase(), "intra"+profile._json.email, hashPassword, image_url, omni_id);
              let newuser = await  user.getUser('GetUserByOmni',omni_id);
              user.Confirmed(newuser.email);
              if(newuser)
                done(null,newuser);
          }
         else  {
          done(null, currentUser);}
        }
      )
    );

/* GOOGLE STRATEGY */


passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackURL: "http://localhost:5000/auth/google/redirect"
  },
  async (accessToken, refreshToken, profile, done) => {
    const [lastname, firstname, username, gmail, omni_id] = 
      [profile.name.familyName, profile.name.givenName, (profile.name.familyName.substr(0,2) + profile.name.givenName).toLowerCase(),
      "google"+profile.emails[0].value, "Google" + profile.id];
      let currentUser = await  user.getUser('GetUserByOmni',omni_id);
      if (!currentUser) {
        let image_name = new Date().toISOString() + username+".jpg";
        let Password = tools.generate(omni_id,username);
        let hashPassword = await bcrypt.hash(Password, 10);
        tools.download(profile.photos[0].value,"./public/images/" + image_name ,function(){})
        user.Register(lastname, firstname, username, gmail, hashPassword, image_name, omni_id);
        let newuser = await  user.getUser('GetUserByOmni',omni_id);
        user.Confirmed(newuser.email);
        if(newuser)
          done(null,newuser);
    }
   else  {
    done(null, currentUser);}
  }
));



/* LINKEDIN STRATEGY*/

passport.use(new LinkedInStrategy({
  clientID: keys.LINKEDIN.clientID,
  clientSecret: keys.LINKEDIN.clientSecret,
  callbackURL: "http://localhost:5000/auth/linkedin/redirect",
  scope: ['r_emailaddress', 'r_liteprofile'],
},
async (accessToken, refreshToken, profile, done) => {
  const [lastname, firstname, username, gmail, omni_id] = 
    [profile.name.familyName, profile.name.givenName, (profile.name.familyName.substr(0,2) + profile.name.givenName).toLowerCase(),
    "linkedin"+profile.emails[0].value, "Linkedin" + profile.id];
    let currentUser = await  user.getUser('GetUserByOmni',omni_id);
    if (!currentUser) {
      let image_name = new Date().toISOString() + username+".jpg";
      let Password = tools.generate(omni_id,username);
      let hashPassword = await bcrypt.hash(Password, 10);
      tools.download(profile.photos[0].value,"./public/images/" + image_name ,function(){})
      user.Register(lastname, firstname, username, gmail, hashPassword, image_name, omni_id);
      let newuser = await  user.getUser('GetUserByOmni',omni_id);
      user.Confirmed(newuser.email);
      if(newuser)
        done(null,newuser);
  }
 else  {
  done(null, currentUser);}
}
));

/* GITHUB STRATEGY*/
passport.use(new GitHubStrategy({
  clientID: keys.GITHUB.clientID,
  clientSecret: keys.GITHUB.clientSecret,
  callbackURL: "http://localhost:5000/auth/github/redirect"
},
async (accessToken, refreshToken, profile, done) => {
  const [lastname, firstname, username, gmail, omni_id] = 
    [profile.username, profile.username, profile.username.toLowerCase(),
    "github"+profile.username+"@gmail.com", "github" + profile.id];
    let currentUser = await  user.getUser('GetUserByOmni',omni_id);
    if (!currentUser) {
      let image_name = new Date().toISOString() + username+".jpg";
      let Password = tools.generate(omni_id,username);
      let hashPassword = await bcrypt.hash(Password, 10);
      tools.download(profile.photos[0].value,"./public/images/" + image_name ,function(){})
      user.Register(lastname, firstname, username, gmail, hashPassword, image_name, omni_id);
      let newuser = await  user.getUser('GetUserByOmni',omni_id);
      user.Confirmed(newuser.email);
      if(newuser)
        done(null,newuser);
  }
 else  {
  done(null, currentUser);}
}
));

/* SPOTIFY STRATEGY*/
passport.use(
  new SpotifyStrategy(
    {
      clientID: keys.SPOTIFY.clientID,
      clientSecret: keys.SPOTIFY.clientSecret,
      callbackURL: 'http://localhost:5000/auth/spotify/redirect'
    },
    async (accessToken, refreshToken, profile, done) => {
      const [lastname, firstname, username, gmail, omni_id] = 
        [(profile.displayName).split(' ')[1], (profile.displayName).split(' ')[0], "spo" + (profile.displayName).split(' ')[0].toLowerCase(),
        "spotify"+(profile.displayName).split(' ')[0]+"@gmail.com", "spotify" + profile.id];
        let currentUser = await  user.getUser('GetUserByOmni',omni_id);
        if (!currentUser) {
          let image_name = new Date().toISOString() + username+".jpg";
          let Password = tools.generate(omni_id,username);
          let hashPassword = await bcrypt.hash(Password, 10);
          tools.download(profile.photos[0],"./public/images/" + image_name ,function(){})
          user.Register(lastname, firstname, username, gmail, hashPassword, image_name, omni_id);
          let newuser = await  user.getUser('GetUserByOmni',omni_id);
          user.Confirmed(newuser.email);
          if(newuser)
            done(null,newuser);
      }
     else  {
      done(null, currentUser);}
    }
  ));

// set up cors to allow us to accept requests from our client
  app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true 
  })
); 