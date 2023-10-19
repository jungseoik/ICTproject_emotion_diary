const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Diary 스키마 정의
const DiarySchema = new Schema({
   
   title: { type: String, required: true }, //required : true 옵션은 필수 데이터라는 의미임 -> 없으면 에러발생
   content: { type: String, required: true },
   createdAt: { type: Date, default: Date.now },

   imageUrl : {type:String},

   emotionAnalysis : {    
      joy:{type:Number},
      sadness:{type:Number},
      anger:{type:Number},
      disgust:{type:Number}
   }
});

module.exports = mongoose.model('Diary', DiarySchema);
