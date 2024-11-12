const mongoose = require('mongoose')
const feeStructureSchema = new mongoose.Schema({
    autoId: { type: Number, default: 0 },
    schoolId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'user' },
    addmissionFee: { type: String, default: 0 },
    yearlyFee: { type: String, default: 0 },
    monthlyFee: { type: String, default: 0 },
    extra: { type: String, default: '' },
    classId: { type: mongoose.Schema.Types.ObjectId, default: null, ref: 'class' },
    createdAt: { type: Date, default: Date.now },
    status: { type: Boolean, default: true },
})

module.exports = mongoose.model('feeStructure', feeStructureSchema)