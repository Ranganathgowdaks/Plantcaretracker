const mongoose=require('mongoose')
const plantSchema=new mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
   
    name:{
        type:String,
        required:true
    },
    img:{
        type:String
    }
})
//model
const plant=mongoose.model('plant',plantSchema)
module.exports=plant