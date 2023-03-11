const mongoose = require('mongoose')

const textSchema = new mongoose.Schema({
  Message:String
})

module.exports = mongoose.model('texts', textSchema)

