const mongoose = require('mongoose');

// Diary 스키마 정의
const diarySchema = new mongoose.Schema({
   title: { type: String, required: true }, //required : true 옵션은 필수 데이터라는 의미임 -> 없으면 에러발생
   content: { type: String, required: true },
   userId : { type: String, require: true},
   imageUrl : {type:String},
   
   emotionAnalysis : {    
      joy:{type:Number},
      sadness:{type:Number},
      anger:{type:Number},
      disgust:{type:Number}
   },
}, {
      timestamps: true, // createdAt 및 updatedAt 필드를 자동으로 추가
   });

module.exports = mongoose.model('Diary', diarySchema);
