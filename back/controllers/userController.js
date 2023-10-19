const User = require('../models/User');


exports.loginPostController = async (req,res)=>{
    const {userId,password} = req.body;
    
    // MongoDB에서 일치하는 userId와 password 찾기
   const user= await User.findOne({userId,password});
   
   if(user){
        return res.redirect('/home');
   }else{
       res.send("Invalid userId or password");
   }
}


exports.signupPostController = async (req, res) => {
    try {
      const user = new User({
        userId: req.body.userId,
        password: req.body.password,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email
      });
  
      await user.save();
  
      // API 명세서에 따른 응답 형식으로 변경
      res.json({
        success: true,
        message: "회원가입 성공",
        data: {
          _id: user._id, // MongoDB에서 자동 생성된 _id 값
          userId: user.userId,
          name :user.name,
          phoneNumber :user.phoneNumber
         }
      });

    } catch (err) {
       console.log(err);
       return res.status(500).json({ 
         success:false, 
         message:"Error saving new user!" 
       });
    }
  }
  