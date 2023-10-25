const Diary = require('../models/Diary');
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