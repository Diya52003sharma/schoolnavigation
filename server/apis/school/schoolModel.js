const mongoose = require('mongoose')
const schoolSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    address: { type: String, default: '' },
    logo: { type: String, default: 'school/NoImg.jpg' },
    principal: { type: String, default: '' },
    schoolDescription: { type: String, default: '' },
    userId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' },
})

module.exports = mongoose.model('school', schoolSchema)