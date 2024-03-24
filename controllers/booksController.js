// import Books from "../models/Books.js"
const Books=require('../models/Books')


const getAllBooks=async(req,res)=>{
    // tru

    // const books=await Books.find()
    // console.log(books,'hello')
    // // res.send('hello')
    // res.json(books)
    try {
        const books=await Books.find()
        if(books){
            res.json(books)
        }else{
            res.status(400).json({error:"something went wrong"})
        }
        
    } catch (error) {
        res.status(500).json({error:'Some thing went wrong'})
    }
}


module.exports={getAllBooks}