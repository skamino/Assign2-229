let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our Book Model
let Network = require('../models/network');

let networkController = require('../controllers/network');

/* GET Route for the Book List page - READ Operation */
router.get('/', networkController.displayNetList);

/* GET Route for displaying the Add page - CREATE Operation */
router.get('/add', networkController.displayAddPage);

/* POST Route for processing the Add page - CREATE Operation */
router.post('/add', networkController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', networkController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', networkController.processEditPage);

/* GET to perform  Deletion - DELETE Operation */
router.get('/delete/:id', networkController.performDelete);

module.exports = router;