let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Book Model
let Network = require('../models/network');

let networkController = require('../controllers/network');

function requireAuth(req, res, next)
{
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}

router.get('/', requireAuth, networkController.displayNetList);

router.get('/add', requireAuth, networkController.displayAddPage);

router.post('/add', requireAuth, networkController.processAddPage);

router.get('/edit/:id', requireAuth, networkController.displayEditPage);

router.post('/edit/:id', requireAuth, networkController.processEditPage);

router.get('/delete/:id', requireAuth, networkController.performDelete);

module.exports = router;