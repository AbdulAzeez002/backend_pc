const mongoose=require('mongoose')

const circulationSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:'member'
    },
    book:{
        type:mongoose.Schema.ObjectId,
        require:true,
        ref:'book'
    },
    checkout:{
        type:Date,
        require:true,

    },
    return:{
        type:Date
    },
    isReturned:{
        type:Boolean
    }


})

module.exports=mongoose.model('circulation',circulationSchema)