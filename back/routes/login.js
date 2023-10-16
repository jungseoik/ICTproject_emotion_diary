const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// router.get('/', (req, res) => {
//     res.send('login');
// });


module.exports = router;


router.get('/', userController.loginGetController);
router.post('/', userController.loginPostController);

router.get('/signup',userController.signupGetController);
router.post('/signup',userController.signupPostController);

module.exports = router;
