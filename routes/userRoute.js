const express = require("express");
const { getAllUsers,checkOutBookByUser,returnBookByUser,checkFineOfUserByBook } = require("../controllers/userController");
const router = express.Router()


router.get('/', getAllUsers)
router.post('/checkout',checkOutBookByUser)
router.post('/return',returnBookByUser)
router.post('/checkFine',checkFineOfUserByBook)


module.exports = router