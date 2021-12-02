const express = require('express')
const Image = require('../models/Images')
const router = express.Router()

// Get all users
router.get('/', async (req, res) => {

  try {
    const images = await Image.find({}).populate('user')
    res.json(images)
    
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
  const { user, url } = req.body
  // TODO: validation goes here

  const newImage = new Image({
    user, url
  })

  try {
    const savedImage = await newImage.save()
    res.status(201).json({
      "success": true,
      "message": 'New image added to the database',
      "data": savedImage
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