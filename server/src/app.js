const express = require('express');
const logger = require('morgan');
const bodyparser = require('body-parser');
const OffSession = require('./routes/OffSession');
const OnSession = require('./routes/OnSession');
const authRoutes = require('./routes/auth-routes');
const session = require('express-session');
const passport = require("passport");
const cors = require('cors')
const register = require('./controllers/User/register')
const upload = require('./controllers/User/upload')
const app = express();

app.use(express.static('public'));
// ------------- DB Connection  ------------- //
const connection = require('./Config/db_connection');

// ------------- Middlewares  ------------- //
app.use(logger('dev'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended : true}));

app.use(cors());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'bla bla bla' 
  }));
// ------------- Routes  ------------- //
app.use(OffSession);
app.use(register)
app.use(passport.initialize());
app.use(passport.session());
app.use(authRoutes);
app.use(upload)
app.use(OnSession);


// ------------- ERR  ------------- //

app.use((req,res,next) =>{
    var err = new Error('not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log(err)
    const status = err.status || 500;
    const error = err.message || 'Error processing your request';

    res.status(status).send({
        error
    })

});

module.exports = app;