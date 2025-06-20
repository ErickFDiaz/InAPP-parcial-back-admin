const mongoose = require('mongoose')

const QuoteScheme = new mongoose.Schema({
    brand: {
        type: String,
        required: true,
    },
    document: {
        type: String,
        required: true,
    },
    hasPlate: {
        type: Boolean,
        default: false
    },
    model: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    plate: {
        type: String,
        required: false,
    },
    usage: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    }
},
    {
        timestamps: true,
        versionKey: false
    })

module.exports = mongoose.model('quotes', QuoteScheme)