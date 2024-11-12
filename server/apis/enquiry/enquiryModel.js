const mongoose = require('mongoose')
const enquirySchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    contact: { type: Number, default: 0 },
    message: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
})

module.exports = mongoose.model('enquiry', enquirySchema)