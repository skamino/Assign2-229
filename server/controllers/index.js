let express = require('express');
let router = express.Router();
let mogoose = require('mongoose');
let passport = require('passport');

let userModel = require('../models/user');
let User = userModel.User;

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayname: req.user ? req.user.displayname : "Welcome"});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', { title: 'About', displayname: req.user ? req.user.displayname : "Welcome"});
}

module.exports.displayProductsPage = (req, res, next) => {
    res.render('index', { title: 'Projects', displayname: req.user ? req.user.displayname : "Welcome"});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', { title: 'Services', displayname: req.user ? req.user.displayname : "Welcome"});
}

module.exports.displayResume = function(req, res, next) {
    let options = {
        root: './',
        dotfiles: 'allow',
        headers: {
          'x-timestamp': Date.now(),
          'x-sent': true
        }
      }
      res.sendFile('/public/TestResume.pdf', options);
};

module.exports.displayContactPage = (req, res, next) => {
    res.render('index', { title: 'Contact', displayname: req.user ? req.user.displayname : "Welcome"});
}
module.exports.displayLoginPage = (req, res, next) => {
    console.log(req.user);
    if(!req.user)
    {
        console.log("this just ran");
        res.render('./auth/login',{
        title: 'Login',
        message: req.flash("User already logged in"),
        displayname: req.user ? req.user.displayname : "Welcome"
    })
    } else {
        console.log(req.err);
        if(req.err)
        {
            return res.redirect('./auth/login');
        }
        console.log(req.user);
        return res.redirect('/netList');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local', 
    (err, user, info) => {
        if(err)
        {
            return next(err);
        }
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            if(err){
                return next(err);
            }
            return res.redirect('/netList');
        });
    })(req, res, next);
}

//add registration
module.exports.displayRegisterPage = (req, res, next) => {
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('register'),
            displayName: req.user ? req.user.displayname: ''
        });
    } else {
        return res.redirect('auth/login');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    let tempUser = User({
        username: req.body.username,
        //password
        email: req.body.email,
        displayname: req.body.displayname,
    });
    User.register(tempUser, req.body.password, (err) => {
        if(err)
        {
            if(err.name == "UserExistsError"){
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log("Error: User Already Exists");
            }
            return res.render('auth/register', {
                title: 'Register',
                messages: req.flash('register'),
                displayName: req.user ? req.user.displayname: ''
            });
        }
        else
        {
            //successful registration to the real network page
            return passport.authenticate('local')(req, res, ()=>{
                res.redirect('/netList')
            })
        }
    });
    
}

module.exports.performLogout = (req, res, next) => {
    console.log("logging out");
    req.logout();
    res.redirect('/');
}