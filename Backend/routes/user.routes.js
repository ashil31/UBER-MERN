const express = require('express');
const router = express.Router();
const { body } = require('express-validator');

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', [

    body('email').isEmail().withMessage('Email is not valid'),
    body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')

],userController.registerUser);

router.post('/login', [

    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')

],userController.loginUser);

router.get('/profile', authMiddleware.authUser ,userController.getUserProfile);
router.get('/logout', authMiddleware.authUser ,userController.logoutUser);



module.exports = router;