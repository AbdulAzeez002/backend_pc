const express = require("express");
const { getAllBooks } = require("../controllers/booksController");
const router=express.Router()


router.get('/',getAllBooks)


module.exports=router