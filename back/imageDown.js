const https = require('https');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Diary = require('./models/Diary'); // Diary 모델의 경로를 적절하게 수정

const generateImageUrl= require('./dalle');

// MongoDB 연결 설정
mongoose.connect('mongodb+srv://jungseoik:vxtC2QAllOvTi4B0@cluster0.jyjok.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

async function main() {
  const imageUrl = 'https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/06/urban-20230613083156911235.jpg';
  // const imageUrl= await generateImageUrl(); 

  const userId = 'user1'; // 실제 유저 ID로 교체
  
  let diaryEntry = new Diary({
    userid: userId,
    title: 'Diary Title',
    content: 'Diary Content',
    emotionAnalysis : {    
      joy:0.5,
      sadness:0.2,
      anger:0.1,
      disgust:0.2
    }
  });

  try {
    let result = await diaryEntry.save();
    
    // 이미지 다운로드 및 저장
    const filePathDir = `./public/images/${userId}`;
    const filePathFull= `${filePathDir}/${result._id}.jpg`; 
   
   if (!fs.existsSync(filePathDir)){
        fs.mkdirSync(filePathDir);
   }
   return new Promise((resolve, reject) => {
    https.get(imageUrl, function(response) {
      const fileStream = fs.createWriteStream(filePathFull);
      response.pipe(fileStream);

      fileStream.on('finish', async function() {

        result.imageUrl=filePathFull;
        await result.save();

        console.log(`Saved to DB successfully! ID is ${result._id}`);
        // Add this line
        mongoose.connection.close();
        console.log('Mongoose connection disconnected');
        resolve();
      });

      fileStream.on('error', (err) => {
        console.error(`Error while writing the image - ${err}`);
        reject(err);
      });
    }).on("error", (err) => {
      console.error(`Error while downloading the image - ${err}`);
      reject(err);
    });
  });
  
 } catch(err) {
    console.error(`Error while saving to DB - ${err}`);
 }
}

main();
