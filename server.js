const express = require('express')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const cors = require('cors');

const app = express()
dotenv.config()

const bookRoute = require('./routes/bookRoute')
const userRoute=require('./routes/userRoute')

app.use(express.json())  // middleware to print json data
app.use(express.urlencoded({ extended: false }))

// Use cors middleware
app.use(cors());

app.use('/api/books',bookRoute)
app.use('/api/users',userRoute)

app.listen(4000, () => {
    console.log('server running on port 4000')
})

