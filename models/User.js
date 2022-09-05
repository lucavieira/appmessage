const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
    name: {
        type: String,
        require: true
    },

    message: {
        type: String,
        required: true
    }
})

mongoose.model('users', User)