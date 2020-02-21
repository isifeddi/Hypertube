const express = require('express');
const router = express.Router();
const checkToken = require('../controllers/User/checkToken');

const logout = require('../controllers/User/logout');
const editProfile = require('../controllers/User/editProfile');
// const getMovies = require('../controllers/Library/getMovies');

router.use(async function (req,res,next) {
    const token = req.headers.authorization;
    if(token !== 'undefined')
    {
        const isValid = await checkToken(token);
        if(isValid)
            next();
        else
            console.log('Token is invalid');
    }
    else
        console.log('token is undefined')
})

router.post('/logout', logout);
router.post('/editProfile', editProfile);
// router.post('/getMovies', getMovies);

module.exports = router;