const express = require('express');
const userController = require('../controllers/userController');
const homeController = require('../controllers/homeController');

const router = express.Router();


router.post('/auth/login', userController.loginPostController);
router.post('/auth/signup',userController.signupPostController);
router.post('/diaries', homeController.)
router.post('/diaries/:diaryid', )
module.exports = router;
