const User = require('../models/User');

exports.loginGetController = (req, res) => {
    const formHTML=`
    <form action="/login" method="POST">
        <ul>
            <li><label for="userId">User ID:</label></li>
            <li><input type="text" id="userId" name="userId"></li>
            <li><label for="password">Password:</label></li>
            <li><input type="password" id="password" name="password"></li>
            <li></br></br><button>Login</button></br></br> </li>
        </ul>
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