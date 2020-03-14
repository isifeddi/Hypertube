const router = require("express").Router();
const passport = require("passport");
var jwt =  require('jsonwebtoken');

const authCheck = (req, res, next) => {
    next();
  };
  
  router.get("/", authCheck, (req, res) => {
    res.status(200)
  });
/* 42 Router */ 
  router.get('/auth/42',passport.authenticate('42'));
  
  router.get('/auth/42/redirect',
      passport.authenticate('42', { failureRedirect: 'http://localhost:3000/login' }),
      function(req, res) {
          res.redirect(`http://localhost:3000/omniAuth/${req.user.token}`)
      });
    
/* Google Router */
router.get('/auth/google',passport.authenticate('google', { scope: 
  ['https://www.googleapis.com/auth/userinfo.email','profile' ] }
));

router.get('/auth/google/redirect', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(`http://localhost:3000/omniAuth/${req.user.token}`);
  });
  

/* Linkedin Router*/

  router.get('/auth/linkedin',
  passport.authenticate('linkedin'));

router.get('/auth/linkedin/redirect', 
  passport.authenticate('linkedin', { failureRedirect: 'http://localhost:3000/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(`http://localhost:3000/omniAuth/${req.user.token}`);
  },
  (error, req, res, next) => {
    // Handle the error when the user cancelled the authorization
    res.redirect('http://localhost:3000/login');
}
  );

/* Github Routers*/
router.get('/auth/github',
  passport.authenticate('github'));

  router.get('/auth/github/redirect', 
  passport.authenticate('github', { failureRedirect: 'http://localhost:3000/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect(`http://localhost:3000/omniAuth/${req.user.token}`);
  });

  /* SPOTIFY Routers*/
router.get('/auth/spotify',
passport.authenticate('spotify'));

router.get('/auth/spotify/redirect', 
passport.authenticate('spotify', { failureRedirect: 'http://localhost:3000/login' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect(`http://localhost:3000/omniAuth/${req.user.token}`);
});


module.exports = router;