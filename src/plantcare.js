const mongoose=require('mongoose')
const plantcareSchema=new mongoose.Schema(
    {
    weather:{
        type:String,
        required:true
    },
    temperature:{
        type:String,
        required:true
    },
    watered:{
        type:String,
        required:true
    },
    fertilized:{
        type:String,
        required:true
    },
    height:{
        type:String,
        required:true
    },
    healthCondition:{
        type:String,
        required:true

    },
    diseases:{
        type:String,
        required:true
    },
    pruning:{
        type:String,
        required:true
    },
    repotting:{
        type:String,
        required:true
    },userId:{
        type:String
    }

   }
)
const plantCaretrack=mongoose.model('plantCaretrack',plantcareSchema)
module.exports=plantCaretrack