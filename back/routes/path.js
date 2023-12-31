const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.send(`
    <a href = "/login"> 로그인페이지로 </a>
    <h2>///</h2>
    <a href = "/signup">회원가입 </a>
        `);
});

router.get('/login', (req,res)=>{
    const formHTML=`
    <form action="/api/auth/login" method="POST">
        <ul>
            <li><label for="userId">User ID:</label></li>
            <li><input type="text" id="userId" name="userId"></li>
            <li><label for="password">Password:</label></li>
            <li><input type="password" id="password" name="password"></li>
            <li></br></br><button>Login</button></br></br> </li>
        </ul>
    </form>`
    res.send(formHTML);
});

router.get('/signup', (req,res)=>{

    const formHTML2 =`
    <form id="signupForm">
    <label for="userId">User ID:</label>
    <input type="text" id="userId" name="userId"><br>
    
    <label for="password">Password:</label>
    <input type="password" id="password" name="password"><br>
    
    <label for="confirmPassword">Confirm Password:</label>
    <input type="password" id="confirmPassword" name="confirmPassword"><br>
    
    <label for=name>Name:</label>
    <input type=text id=name name=name><br>
    
     <label for=phoneNumber>Phone Number:</label>
     <input type=text id=phoneNumber name=phoneNumber><br>
     
     <label for=email>Email:</label>
     <input type=text id=email name=email><br> 
     
    <button type="submit">Submit</button>
</form>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<script>
document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var userId = document.getElementById('userId').value;
  var password = document.getElementById('password').value;
  var name = document.getElementById('name').value;
  var phoneNumber = document.getElementById('phoneNumber').value;
  var email = document.getElementById('email').value;

  var userData = {
    userId: userId,
    password: password,
    name: name,
    phoneNumber: phoneNumber,
    email : email
  };

  axios.post('/api/auth/signup', userData)
    .then(response => {
      if (response.data.success) {
        // 서버에서 받은 이름으로 알림 메시지 생성
        alert(response.data.data.name + '님 회원가입 완료되었습니다');

        // 로그인 페이지로 이동
        window.location.href = '/login';
      } else {
        // 실패 시 오류 메시지 표시 등의 처리...
      }
    });
});
</script>
    `
    res.send(formHTML2);

});

router.get('/home',(req, res) => {
    const Html = `
    <div class="grid-container">
        <div class="grid-item"><a href = "/home/feedcheck"><img src="/images/001.jpg" alt="Image 1"></a></div>
        <div class="grid-item"><img src="/images/001.png" alt="Image 2"></div>
        <div class="grid-item"><img src="/images/002.jpg" alt="Image 3"></div>
        <div class="grid-item"><img src="image3.jpg" alt="Image 3"></div>
        <div class="grid-item"><img src="image4.jpg" alt="Image 4"></div>
        <div class="grid-item"><img src="image3.jpg" alt="Image 3"></div>
        <div class="grid-item"><img src="image4.jpg" alt="Image 4"></div>
        <div class="grid-item"><img src="image3.jpg" alt="Image 3"></div>
        <div class="grid-item"><img src="image4.jpg" alt="Image 4"></div>
        <!-- 추가 이미지 -->
    </div>
    <style>
    .grid-container {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 10px;
    }
    .grid-item {
        width: 300px;
        height: 300px;
        overflow: hidden; 
    }
    .grid-item img {
        width:100%;
        object-fit: cover; 
    }

    </style>
    `
    res.send(Html);
});


module.exports = router;