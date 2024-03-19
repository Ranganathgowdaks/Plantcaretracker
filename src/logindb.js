const mongoose=require('mongoose')
//schema
const signupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})
const signup=mongoose.model('login',signupSchema)
module.exports=signup;