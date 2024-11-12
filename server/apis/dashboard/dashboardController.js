const userModel = require('../user/userModel')
const classModel = require('../class/classModel')
const postModel = require('../post/postModel')
const feeStructureModel = require('../feeStructure/feeStructureModel')
const bookingModel = require('../booking/bookingModel')
const enquiryModel = require('../enquiry/enquiryModel')

const adminDashboard = async (req, res) => {
   
    let totalSchool = await userModel.find({ userType: 2, status: true })
    let totalParent = await userModel.find({ userType: 3, status: true })
    let totalClass = await classModel.countDocuments()
    let totalPost = await postModel.countDocuments()
    let totalFeeStructure = await feeStructureModel.countDocuments()
    let totalBooking = await bookingModel.countDocuments()
    let totalEnquiry = await enquiryModel.countDocuments()

    res.send({
        success: true,
        status: 200,
        message: "Dashboard Loaded", 
        totalUser: totalSchool.length+totalParent.length,
        totalSchool: totalSchool.length,
        totalParent: totalParent.length,
        totalClass: totalClass,
        totalPost: totalPost,
        totalFeeStructure: totalFeeStructure,
        totalBooking: totalBooking,
        totalEnquiry: totalEnquiry
    })
}
module.exports = { adminDashboard }