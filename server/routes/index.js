let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/Home', indexController.displayHomePage);

/* GET About Us page. */
router.get('/About', indexController.displayAboutPage);

/* GET Products page. */
router.get('/Projects', indexController.displayProductsPage);

/* GET Services page. */
router.get('/Services', indexController.displayServicesPage);

/* GET Contact Us page. */
router.get('/Contact', indexController.displayContactPage);

//the extra stuff
router.get('/login', indexController.displayLoginPage);

router.post('/login', indexController.processLoginPage);

router.get('/register', indexController.displayRegisterPage);

router.post('/register', indexController.processRegisterPage);

router.get('/logout', indexController.performLogout);

module.exports = router;
