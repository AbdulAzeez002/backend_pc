
const Users = require('../models/Member')
const Books = require('../models/Books')
const Circulation = require('../models/Circulation')

const getAllUsers = async (req, res) => {

    try {
        const users = await Users.find()
        if (users) {
            res.json(users)
        } else {
            res.status(400).json({ error: "something went wrong" })
        }

    } catch (error) {
        res.status(500).json({ error: 'Some thing went wrong' })
    }
}

const checkOutBookByUser = async (req, res) => {
    try {
        const { bookId, memberId, date } = req.body
        const bookNeeded = await Books.findOne({ _id: bookId })


        if (bookNeeded && bookNeeded?.NumberOfCopies > 0) {

            const newCirculation = new Circulation({
                user: memberId,
                book: bookId,
                checkout: date ?? new Date(),
                isReturned: false

            })
            const updateBook = await Books.findByIdAndUpdate(bookId, { NumberOfCopies: bookNeeded.NumberOfCopies - 1 })
            newCirculation.save()
            res.json(newCirculation)
        } else {
            res.json({ error: "No copies left" })
        }


    } catch (error) {
        res.status(500).json({ error: 'Some thing went wrong' })
    }
}


const returnBookByUser = async (req, res) => {
    try {
        const { bookId, memberId, circulationId } = req.body
        const bookNeeded = await Books.findOne({ _id: bookId })
        const circulation = await Circulation.findById(circulationId)
        if (bookNeeded && circulation) {
            const updateCirculation = await Circulation.findByIdAndUpdate(circulationId, { return: new Date(), isReturned: true })
            res.status(200).json(updateCirculation)
        } else {
            res.status(400).json({ error: 'Something went wrong' })
        }


    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}

const checkFineOfUserByBook = async (req, res) => {
    try {
        const {  userId, bookId } = req.body
        console.log(userId,bookId,'reached')
        const circulation = await Circulation.find({ book: bookId, user: userId })
        if (!circulation) {
            return res.status(200).json({
                checkOutstatus: false, status: false,
                fineAmount: 0
            })
        }
        const fineObj = {
            checkoutStatus: true,
            status: false,
            fineAmount: 0
        }
        if (!circulation[0].isReturned) {
            const checkoutDate = circulation[0].checkout
            const dateDifference = Math.round((new Date().getTime() - checkoutDate.getTime()) / (1000 * 3600 * 24))
            if (dateDifference > 7) {
                const fineAmount = (dateDifference - 7) * 50
                fineObj.status = true
                fineObj.fineAmount = Math.round(fineAmount)
            }


        }

        res.status(200).json(fineObj)

    } catch (error) {
        res.status(500).json({ error: 'Something went wrong' })
    }
}




module.exports = { getAllUsers, checkOutBookByUser, returnBookByUser, checkFineOfUserByBook }