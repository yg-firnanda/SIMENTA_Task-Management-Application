const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');

router.get('/daftar', authController.getSignup);
router.post('/daftar', authController.postSignup)
router.get('/masuk', authController.getLogin);
router.post('/masuk', authController.postLogin);
router.post('/keluar', authController.postLogout);

module.exports = router;