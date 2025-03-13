const Router = require('express');
const router = new Router();
const controller = require('./authController')


router.post('/registration', controller.registration);
router.post('/verificationCode', controller.vereficationCode);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

if  (router.post) { 
    console.log("router.post('/registration', controller.registration);");
}


module.exports = router;
