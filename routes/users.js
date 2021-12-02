const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/Users')
const router = express.Router()

// Get all users
router.get('/', async (req, res) => {

  try {
    const users = await User.find({})
    res.json(users)
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      "success": false,
      "message": error.message
    })
  }

})


// Create new user
router.post('/add', async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  // TODO: validation goes here

  const cleanedEmail = email.trim().toLowerCase()
  const salt = bcrypt.genSaltSync(12)
  const hash = bcrypt.hashSync(password, salt)

  const newUser = new User({
    firstName,
    lastName,
    email: cleanedEmail,
    password: hash
  })

  try {
    const savedUser = await newUser.save()
    res.status(201).json({
      "success": true,
      "message": 'New user added to the database',
      "data": savedUser
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      "success": false,
      "message": error.message
    })
  }
})


module.exports = router