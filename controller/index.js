const service = require('./service')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')

 const savedata= async(req,res)=>
 {
    const salt = await bcrypt.genSalt(20)
    const hashedpassword=await bcrypt.hash(req.body.Password,salt)
    req.body.Password=hashedpassword
    const user= await service.saveuser(req.body)
    res.send('stored successfully')
 }

 const loginuser= async(req,res)=>
 {
   let email = req.body.Email
   const match= await service.login(email)
   //length==0 read & store if alreaday data stored  move to next step or else show that already mail id exist (match= get the match details)
   
   if (match.length==0)
   {
      // 400-error & 200- success code have to use for if else func
      res.send({
         code: 200,
         message: "Email not found"
      })
   }
   else{
      //[0]= will check whether password & mail id is correct
      const hashedpassword= match[0].Password
      const passwordmatch= await bcrypt.compare(req.body.Password,hashedpassword)
      const token= await jwt.sign({email},process.env.JWT_secretkey,{ expires: '30minutes'})
      if (passwordmatch)
      {
         res.send({
            code :200,
            message : "login successfull",
            Token: token 
         })
      }
      else{
         res.send({
            code :400,
            message: "password invalid"})
      }
   } 
}


   // [0]= same password will be given by some people so we have to check with the mail to while using the [0] it wont be repeat
   /*else if(req.body.Password==match[0].Password)
   {
    res.send("login success")
   }
   else{
      res.send("passward invalied")
   }
}*/

 module.exports=
 {
    savedata,
    loginuser
   
 }