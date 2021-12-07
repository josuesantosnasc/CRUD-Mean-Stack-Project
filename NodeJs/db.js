const mongoose=require('mongoose');


mongoose.connect('mongodb://localhost:27017/JoshDatabase',(err)=>{
    if(!err){
        console.log("MongoDB connected");
    }else{
        console.log(`Error in Db connection ${err}`)
    }
})




module.exports=mongoose;