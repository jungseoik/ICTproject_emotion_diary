const express = require('express');
const userController = require('../controllers/userController');
const diariesController = require('../controllers/diariesController');
const diariesListController = require('../controllers/diariesListController');
const diaryController = require('../controllers/diaryController');
const diaryWriteController = require('../controllers/diaryWriteController');
const diaryCalendar = require('../controllers/diaryCalendarController');
const router = express.Router();
const diaryDeleteController = require('../controllers/diaryDeleteController')
const diaryUpdateController = require('../controllers/diaryUpdateController')


router.post('/auth/login', userController.loginPostController);
router.post('/auth/signup',userController.signupPostController);
router.post('/diaryWrite', diaryWriteController.createDiary );//일기작성 페이지

router.get('/diaries', diariesController.getDiaryByDate); //날짜별 감정상태 조회
router.get('/diariesList', diariesListController.getDiaries); //홈 화면 일기목록 조회
router.get('/diary', diaryController.getDiaryById); //개별피드 조회, 한피드조회
router.get('/diaryCalendar', diaryCalendar.getDiaryByDate); //달력기반 피드조회 한피드조회

// 피드 수정 
router.put('/:id', diaryUpdateController.updateDiary);
// 피드 삭제 
router.delete('/:id', diaryDeleteController.deleteDiary);


module.exports = router;
