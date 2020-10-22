let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

function requireAuth(req, res, next)
{
    if(!req.isAuthenticated()){
        return res.redirect('/login');
    }
    next();
}

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* because the nav sets the data. */
router.get('/Home', indexController.displayHomePage);

/* GET About Us page. */
router.get('/About', indexController.displayAboutPage);

/* GET Products page. */
router.get('/Projects', indexController.displayProductsPage);

/* GET Services page. */
router.get('/Services', indexController.displayServicesPage);

router.get('/resume', requireAuth, indexController.displayResume);

/* GET Contact Us page. */
router.get('/Contact', indexController.displayContactPage);

//the extra stuff
router.get('/login', indexController.displayLoginPage);

router.post('/login', indexController.processLoginPage);

router.get('/register', indexController.displayRegisterPage);

router.post('/register', indexController.processRegisterPage);

router.get('/logout', indexController.performLogout);

module.exports = router;
