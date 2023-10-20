const express = require('express');
const userController = require('../controllers/userController');
const diariesController = require('../controllers/diariesController');
const diariesListController = require('../controllers/diariesListController');
const diaryController = require('../controllers/diaryController');
const diaryWriteController = require('../controllers/diaryWriteController');
const router = express.Router();


router.post('/auth/login', userController.loginPostController);
router.post('/auth/signup',userController.signupPostController);

router.post('/diaryWrite', diaryWriteController.createDiary );//일기작성 페이지

router.get('/diaries', diariesController.getDiaryByDate); //날짜별 감정상태 조회
router.get('/diariesList', diariesListController.getDiaries); //홈 화면 일기목록 조회
router.get('/diary', diaryController.getDiaryById); //개별피드 조회, 한피드조회


module.exports = router;
