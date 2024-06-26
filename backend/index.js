const express = require('express')
const dotenv = require('dotenv')
const restaurantRouter = require('./routes/restaurant.route.js')
const packageRouter = require('./routes/package.route.js')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

dotenv.config()
mongoose.connect(process.env.MONGODB_CONNECTION).then(() => console.log('Database connected...')).catch((err) => {
    console.log(err);
})

const app = express()
// app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())


app.listen(5000, () => {
    console.log('Server is running on port 5000');
})

app.use('/api/restaurant', restaurantRouter)
app.use('/api/package', packageRouter)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal server error'
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})