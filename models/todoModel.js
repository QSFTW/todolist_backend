const mongoose = require('mongoose')

const todoSchema = mongoose.Schema({
    Subject: {
        type: String,
        required: true
    },
    Description: String,
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('TodoItem', todoSchema)