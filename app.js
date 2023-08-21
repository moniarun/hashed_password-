const app= require('express')()
//require body-parser connect with postman
const body= require('body-parser')

app.use(body.urlencoded({extended:true}))
//j.son format
app.use(body.json())
// connecting another file here to run te terminal
require('dotenv').config()
require('./config/db')
require('./routes')(app)

const port=3000
app.listen(port,()=>      
{
    console.log(`server listening on port:${port}`)
})
