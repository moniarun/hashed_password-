const mongoose= require('mongoose')
// to process the .env in dburl
const dbURL= process.env.dbURL;

// mongoose is the module
mongoose.connect(dbURL,{
    useNewUrlParser :true,
    useUnifiedTopology :true,
    //useFindAndModify :false,
    //useCreateindex :true
});
mongoose.connection.on('connected',()=>{
    console.log('mongoose connected!');
});
mongoose.connection.on('disconnected',()=>{
    console.log('mongoose.dissconnected!');
});
mongoose.connection.on('error',(err)=>{
    console.log(`error while connecting ${err}`);
});