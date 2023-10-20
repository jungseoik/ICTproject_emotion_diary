
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const apiRouter = require('./routes/api');
const pathRouter = require('./routes/path');



// const bodyParser=require("body-parser");
// app.use(bodyParser.urlencoded({extended:true}));


const path = require('path'); //이미지 경로, 정적파일 저장 디렉토리 지정
app.use('/images', express.static(path.join(__dirname, './public/images'))); //이미지 폴더 경로 지정해줌
app.use(express.json()); // JSON 형식의 요청 본문(body)을 파싱하는 역할


const uri = "mongodb+srv://jungseoik:vxtC2QAllOvTi4B0@cluster0.jyjok.mongodb.net/?retryWrites=true&w=majority"; //몽고디비 URL
//몽고디비 아틀라스 연결
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));



app.use('/api', apiRouter);
app.use('/', pathRouter);


app.use(express.static(path.join(__dirname, 'tp')));
app.get('/c', function(req, res){
  res.sendFile(path.join(__dirname, 'tp', 'dairyWritePage.html'));
});

app.use('/public', express.static(path.join(__dirname, 'public')));
app.get('/cr', function(req, res){
  res.sendFile(path.join(__dirname, 'tp', 'Homepage.html'));
});


app.use('/create' , pathRouter);


app.listen(3000);

