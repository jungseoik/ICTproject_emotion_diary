
const express = require('express');
const connectDb = require('./config/db');
const userRouter = require('./routes/userRouter');
const diaryRouter = require('./routes/diaryRouter');

//몽고디비 URL
const path = require('path'); //이미지 경로, 정적파일 저장 디렉토리 지정

const bodyParser=require("body-parser");
connectDb();
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.use('/images', express.static(path.join(__dirname, './public/images')));//이미지 폴더 경로 지정해줌

app.use(express.json());
app.use('/api/diaries', diaryRouter);
app.use('/api/users' , userRouter);

app.get('/', (req, res) => {
  res.send(`
  <a href = "/login"> 로그인페이지로 </a>
  <h2>///</h2>
  <a href = "/login/signup">회원가입 </a>
  
      `)
})


app.listen(3000);

