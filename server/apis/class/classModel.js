const mongoose = require('mongoose')
const classSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
})

module.exports = mongoose.model('class', classSchema)