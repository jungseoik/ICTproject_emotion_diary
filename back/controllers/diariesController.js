// controllers/diariesController.js
const Diary = require('../models/Diary');

exports.getDiaryByDate = async (req, res) => {
    try {
      const dateParam = req.query.date; // 쿼리 파라미터에서 날짜 추출

      // yyyy-mm-dd 형식의 날짜로 검색 범위 설정
      const startDate = new Date(dateParam);
      const endDate = new Date(dateParam);
      endDate.setDate(endDate.getDate() + 1);

      // 해당 날짜의 일기 조회
      const diary = await Diary.findOne({ createdAt: { $gte: startDate, $lt: endDate } });

      if (!diary) {
        return res.status(404).json({ success:false, message:"Diary not found!" });
        
        }
        
        // 찾은 일기를 응답으로 보냄
        return res.json({
          success: true,
          data: {
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
          }
        });
        
        
    } catch (err) {
       console.log(err);
       return res.status(500).json({ success:false, message:"Error retrieving the diary!" });
    }
  };
