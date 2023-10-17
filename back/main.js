
const express = require('express');
const mongoose = require('mongoose');
const loginRouter = require('./routes/login');
const homeRouter = require('./routes/home');

const uri = "mongodb+srv://jungseoik:vxtC2QAllOvTi4B0@cluster0.jyjok.mongodb.net/?retryWrites=true&w=majority";
//몽고디비 URL
const path = require('path'); //이미지 경로, 정적파일 저장 디렉토리 지정

const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.use('/images', express.static(path.join(__dirname, './public/images')));//이미지 폴더 경로 지정해줌

//몽고디비 아틀라스 연결
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


console.log("json : ", express.json());
app.use(express.json());



app.use('/login' , loginRouter);
app.use('/home', homeRouter);

app.get('/', (req, res) => {
  res.send(`
  <a href = "/login"> 로그인페이지로 </a>
  <h2>///</h2>
  <a href = "/login/signup">회원가입 </a>
  
      `)
})


app.listen(3000);

