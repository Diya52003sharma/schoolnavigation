const mongoose = require('mongoose')
const parentSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    name: { type: String, default: '' },
    email: { type: String, default: '' },
    userId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' },
    contact: { type: Number, default: 0 },
})

module.exports = mongoose.model('parent', parentSchema)