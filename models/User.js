const mongoose = require('mongoose')

// 1. Define the blueprint (Schema)
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    }
})

// 2. Compile the schema into a Model
const User = mongoose.model('User', userSchema);

module.exports = User
