const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        reuired: true
    },
    roll:{
        type: String,
        reuired: true
    },
    cgpa:{
        type: Number,
        reuired: true
    }
})

module.exports = mongoose.model('Student', studentSchema)