const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    Name: String,
    Department: String,
    Rollno: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('posts',PostSchema)