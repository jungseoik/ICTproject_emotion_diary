const User = require('../models/User');

exports.loginGetController = (req, res) => {
    const formHTML=`
    <form action="/login" method="POST">
        <label for="userId">User ID:</label>
        <input type="text" id="userId" name="userId">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password">
        </br></br><button>Login</button></br></br> 
    </form>`
    res.send(formHTML);
}


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



exports.signupGetController=(req,res)=>{
    const formHTML=`
    <form action="/login/signup" method="POST">
        <label for="userId">User ID:</label>
        <input type="text" id="userId" name="userId">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword">
        <label for=name>Name:</label>
        <input type=text id=name name=name>
         <label for=phoneNumber>Phone Number:</label>
         <input type=text id=phoneNumber name=phoneNumber>
          <label for=email>Email:</label>
          <input type=text id=email name=email> 
         </br></br><button>Submit</button></br></br> 
    </form>`
    res.send(formHTML);
}

exports.signupPostController= async (req,res)=>{
    const {userId,password,name,phoneNumber,email}=req.body;
    
   try{
       const user=new User({userId,password,name,phoneNumber,email});
       await user.save();
       res.send("Signup Success!")
   }catch(err){
      console.log(err)
      return res.status(500).send("Error saving new user!");
   }
}