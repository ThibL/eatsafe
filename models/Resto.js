const mongoose = require('mongoose');

const RestoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        //required: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'client'
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Restp = mongoose.model("resto", RestoSchema)