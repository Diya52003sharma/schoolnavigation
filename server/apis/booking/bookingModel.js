const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    schoolId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' },
    userId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' },
    bookingDate: { type: Date, default: Date.now },
    bookingTime: { type: String, default: "" },
    purpose: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
    status: { type: String, default: "Pending" }, //Approved, Declined, Cancelled, Completed
})

module.exports = mongoose.model('booking', bookingSchema)