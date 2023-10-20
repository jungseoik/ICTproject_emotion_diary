// controllers/diariesController.js
const Diary = require('../models/Diary');

exports.getDiaryById = async (req, res) => {
  try {
    // req.params.diaryId로 라우트 파라미터 값을 가져옴
    const diary = await Diary.findById(req.params.diaryId);

    if (!diary) {
      return res.status(404).json({ success:false, message:"Diary not found!" });
    }

    // 찾은 일기를 응답으로 보냄
    return res.json({
      success:true,
      data:{
        userid : diary.userid,
        _id : diary._id ,
        title : diary.title ,
        content : diary.content ,
        createdAt : diary.createdAt ,
        imageUrl : diary.imageUrl , 
        emotionAnalysis : {
          joy:diary.emotionAnalysis.joy,
          sadness:diary.emotionAnalysis.sadness,
          anger:diary.emotionAnalysis.anger,
          disgust:diary.emotionAnalysis.disgust
         }
      }
      
    });
    
  } catch (err) {
     console.log(err);
     return res.status(500).json({ success:false, message:"Error retrieving the diary!" });
   }
};
