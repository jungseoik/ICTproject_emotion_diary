const Diary = require('../models/Diary');

exports.createDiary = (req, res) => {
  const newDiary = new Diary(req.body);

  newDiary.save()
    .then(diary => res.json(diary))
    .catch(err => res.status(500).json({ error: err.message }));
};

exports.getAllDiaries = (req, res) => {
  Diary.find({})
    .then(diaries => res.json(diaries))
    .catch(err => res.status(500).json({ error: err.message }));
};
