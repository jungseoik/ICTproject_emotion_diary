
const express = require('express');
const mongoose = require('mongoose');
const loginRouter = require('./routes/login');
const uri = "mongodb+srv://jungseoik:vxtC2QAllOvTi4B0@cluster0.jyjok.mongodb.net/?retryWrites=true&w=majority";
const bodyParser=require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

//몽고디비 아틀라스 연결
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


console.log("json : ", express.json());

app.use(express.json());


app.use('/login' , loginRouter);

app.get('/', (req, res) => {
  res.send(`
  <a href = "/login"> 로그인페이지로 </a>
  <h2>///</h2>
  <a href = "/login/signup">회원가입 </a>
  
      `)
})


app.listen(3000);

