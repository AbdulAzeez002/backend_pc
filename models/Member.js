const mongoose=require('mongoose')


const memberSchema=mongoose.Schema({
    MemeberID:{
        type:Number,
        require:true
    },
    MemberName:{
        type:String,
        require:true
    }
})

module.exports=mongoose.model('member',memberSchema)