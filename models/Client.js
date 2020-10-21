const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    resto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'resto'
    }
})

module.exports = Client = mongoose.model('client', ClientSchema);