require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users')
const imageRoutes = require('./routes/images')

const app = express()

// variables
const PORT = process.env.PORT || 5000

// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/images', imageRoutes)

// listen
mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log('Connection to the DB was successful!')
  app.listen(PORT, () => console.log(`Great work team! Your app is listening on http://localhost:${PORT}`))
})
.catch((error) => {
  console.log(error)
})
