const exp= require('express')
const router= exp.Router()
const functions= require('./controller/index')
let routes=(app)=>
{
    router.post('/saveuser',functions.savedata)
    router.post('/login',functions.loginuser)
    app.use('/api',router)
}
module.exports=
routes