const Diary = require('../models/diaryModel'); // Diary 모델 불러오기

// 일기 작성
// @end-point : /api/diaries/
// @method : post
exports.createDiary = (req, res) => {
  const newDiary = new Diary(req.body);

  newDiary.save()
    .then(diary => res.status(200).json(diary))
    .catch(err => res.status(500).json({ error: err.message }));
};


// 일기 목록 조회 (홈화면)
// @end-point : /api/diaries/
// @method : get
exports.getAllDiaries = (req, res) => {
  Diary.find({})
    .then(diaries => res.json(diaries))
    .catch(err => res.status(500).json({ error: err.message }));
};

// 피드 수정 (Update)
// @end-point : /api/diaries/:id
// @method : put
exports.updateDiary = async (req, res) => {
  try {
    const diaryId = req.params.id;
    const { title, content } = req.body;
    const updatedDiary = await Diary.findByIdAndUpdate(diaryId, { title, content }, { new: true });
    if (!updatedDiary) {
      return res.status(404).json({ error: '해당 ID의 일기를 찾을 수 없습니다.' });
    }
    res.status(200).json(updatedDiary);
  } catch (error) {
    res.status(500).json({ error: '게시물을 수정하는 중에 오류가 발생했습니다.' });
  }
};

// 피드 삭제 (Delete)
// @end-point : /api/diaries/:id
// @method : delete
exports.deleteDiary = async (req, res) => {
try {
  const diaryId = req.params.id;
  const deletedDiary = await Diary.findByIdAndDelete(diaryId);
  if (!deletedDiary) {
    return res.status(404).json({ error: '해당 ID의 일기를 찾을 수 없습니다.' });
  }
  res.status(204).send();
} catch (error) {
  res.status(500).json({ error: '일기를 삭제하는 중에 오류가 발생했습니다.' });
}
};
