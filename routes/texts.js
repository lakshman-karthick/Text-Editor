const express = require('express')
const router = express.Router()
const textSS = require('../models/text')


router.get('/', async (req, res) => {
  try {
    const texts = await textSS.find()
    res.json(texts)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})


router.get('/:id', getText, (req, res) => {
  res.json(res.subscriber)
})


router.post('/', async (req, res) => {
  const texts = new textSS({
    Message: req.body.Message
  })
  try {
    // const newText = await Text.save()
    res.status(201).json(texts)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

router.patch('/:id', getText, async (req, res) => {
  if (req.body.Message != null) {
    res.textC.name = req.body.name
  }
  
  try {
    const updatedText = await res.textC.save()
    res.json(updatedText)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})


router.delete('/:id', getText, async (req, res) => {
  try {
    await res.textC.remove()
    res.json({ message: 'Deleted Subscriber' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getText(req, res, next) {
  let textC
  try {
    textC = await Text.findById(req.params.id)
    if (textC == null) {
      return res.status(404).json({ message: 'Cannot find subscriber' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.textC = textC
  next()
}

module.exports = router