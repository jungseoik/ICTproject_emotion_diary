const express = require('express');
const router = express.Router();
const diaryController = require('../controllers/diaryController');

// 일기 작성 
router.post('/', diaryController.createDiary);

// 일기 목록 조회 (홈화면)
router.get('/', diaryController.getAllDiaries);

// 피드 수정 
router.put('/:id', diaryController.updateDiary);

// 피드 삭제 
router.delete('/:id', diaryController.deleteDiary);

module.exports = router;