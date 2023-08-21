const mongoose = require('mongoose')
const userschema= new mongoose .Schema(
   { 
     Email:String,
     Password:String
   })
const collect=new mongoose.model('user',userschema)

const saveuser= async(data)=>
{
    const saveuser= new collect(data)
    const user= await saveuser.save()
    return user

}

const login= async (data)=>
{
  const loginuser= await collect.aggregate([{$match:{Email:data.Email}}])
  return loginuser
}

module.exports=
{
    saveuser,
    login
}