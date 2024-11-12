const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    fileDescription: { type: String, default: '' },
    image: { type: String, default: 'post/NoImg.jpg' },
    schoolId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
})

module.exports = mongoose.model('post', postSchema)