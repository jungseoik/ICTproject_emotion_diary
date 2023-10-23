// controllers/diariesController.js
const Diary = require('../models/Diary');

exports.getDiaryByDate = (req, res) => {
  const { year, month, date } = req.query;

  // 선택한 날짜의 시작과 끝을 설정
  const startDate = new Date(year, month - 1, date);
  startDate.setHours(0, 0, 0); // 해당 일의 시작 시간을 설정
  
  const endDate = new Date(year, month - 1, parseInt(date) + 1);

  Diary.find({ createdAt: { $gte: startDate , $lt: endDate } })
    .sort({ createdAt: 'asc' }) // 오름차순으로 정렬하여 가장 빠른 시간대에 생성된 Diary가 첫 번째로 오도록 함
    .limit(1) // 한 개의 결과만 반환하도록 제한
    .then(diaries => {
      if (diaries.length === 0) {
        return res.status(404).json({ error:'Diary not found' });
      }
      res.json(diaries[0]);
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error:'Internal server error' });
    });
};

//createdAt : 2023-10-20T14:21:39.434+00:00 Date