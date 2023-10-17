const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Post 스키마 정의
const PostSchema = new Schema({
   title: { type: String, required: true }, //required : true 옵션은 필수 데이터라는 의미임 -> 없으면 에러발생
   content: { type: String, required: true },
   createdAt: { type: Date, default: Date.now }
});

// Feed 스키마 정의
const FeedSchema = new Schema({
   image_url : {type:String, required:true}
});

// EmotionAnalysis 스키마 정의
const EmotionAnalysisSchema = new Schema({
    joy:{type:Number},
    sadness:{type:Number},
    anger:{type:Number},
    disgust:{type:Number}
});

// Diary 스키마 정의
const DiarySchema = new Schema({
   post : [PostSchema],
   feed : [FeedSchema],
   emotionAnalysis : EmotionAnalysisSchema,
});

module.exports = mongoose.model('Diary', DiarySchema);
