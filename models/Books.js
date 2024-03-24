const mongoose=require('mongoose')

const bookSchema=mongoose.Schema({
    BookID:{
        type:Number,
        require:true
    },
    BookName:{
        type:String,
        require:true
    },   
    NumberOfCopies:{
    type:Number,
    require:true
   }
})

module.exports=mongoose.model('book',bookSchema)