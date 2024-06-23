const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');
const passport = require('passport');
const { storeReturnTo } = require('../middleware'); //place at the top, this is a passport.js update requirement.


router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(
    // use the storeReturnTo middleware to save the returnTo value from session to res.locals
    storeReturnTo,
    // passport.authenticate logs the user in and clears req.session
    passport.authenticate('local', 
        {failureFlash: true, 
        failureRedirect: '/login'}), 
        users.login)
    // Now we can use res.locals.returnTo to redirect the user after login

router.get('/logout', users.logout)

module.exports = router;