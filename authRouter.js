// routes/authRouter.js

const express = require('express');
const router = express.Router();
const controller = require('./authController');

// Припустимо, що ваш authController має відповідні методи:
router.post('/registration', controller.registration);
router.post('/verificationCode', controller.verificationCode); // або vereficationCode, якщо так називається метод
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

module.exports = router;
