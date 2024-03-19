const  mongoose=require('mongoose')
const shopSchema= new mongoose.Schema({
    name:{
        type:String
    },
    img:{
        type:String
    },
    price:{
        type:String
    },
    discount:{
        type:String
    }
})
const ShopItem=mongoose.model('ShopItem',shopSchema)
module.exports=ShopItem