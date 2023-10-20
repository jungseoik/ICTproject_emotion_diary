// controllers/diariesController.js
const Diary = require('../models/Diary');

exports.getDiaries = async (req, res) => {
  try {
    // 최근에 저장된 순으로 정렬하고 상위 9개만 조회
    const diaries = await Diary.find().sort({ createdAt: -1 }).limit(9);

    if (!diaries || diaries.length === 0) {
      return res.status(404).json({ success:false, message:"Diaries not found!" });
    }
    
    // 찾은 일기들을 응답으로 보냄
    return res.json({
        success: true,
        data: diaries.map(diary => ({
          userid : diary.userid,
          _id: diary._id,
          title: diary.title,
          content: diary.content,
          createdAt: diary.createdAt,
          imageUrl: diary.imageUrl,
          emotionAnalysis : {
            joy :diary.emotionAnalysis.joy , 
            sadness :diary.emotionAnalysis.sadness , 
            anger :diary.emotionAnalysis.anger , 
            disgust :diary.emotionAnalysis.disgust
           }
        }))
      });
      
    
  } catch (err) {
     console.log(err);
     return res.status(500).json({ success:false, message:"Error retrieving the diaries!" });
   }
};
