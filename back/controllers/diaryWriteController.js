// controllers/diaryController.js

const Diary = require('../models/Diary');

const analyzeSentiment = require('./emotion');
exports.createDiary = async (req, res) => {
  try {
    const diaryData = req.body;
    
    // // 유저 인증 확인 로직 추가 (예시)
    // if (!req.user || req.user.id !== diaryData.userId) {
    //   return res.status(401).json({ message:"로그인 필요" });
    // }



    // const EV = await analyzeSentiment(diaryData.content);
    // joy: EV.positive,
    // sadness: EV.negative,
    //호출방법

    const newDiary = new Diary({
      userid:"jsi6452",
      // userid: diaryData.userid,
      title: diaryData.title,
      content: diaryData.content,
      createdAt: Date.now(),
      imageUrl : "", // 이미지 URL은 별도로 업데이트해야 할 것으로 보입니다.
      emotionAnalysis : { // 감정 분석 결과는 별도로 업데이트해야 할 것으로 보입니다.
        joy: 1,
        sadness: 1,
        anger:0,
        disgust:0
       }
    });

    await newDiary.save();

    return res.status(200).json(newDiary);

  } catch (err) {
    
    console.error(err);
    
    return res.status(500).json({ message:"작성 실패, 서버 오류" });
  }
};
