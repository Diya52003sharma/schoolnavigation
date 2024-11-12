const router = require('express').Router()

const classController = require('../apis/class/classController')

const enquiryController = require('../apis/enquiry/enquiryController')

const postController = require('../apis/post/postController')

const feeStructureController = require('../apis/feeStructure/feeStructureController')

const bookingController = require('../apis/booking/bookingController')

const userController = require('../apis/user/userController')

const schoolController = require('../apis/school/schoolController')

const parentController = require('../apis/parent/parentController')

const dashboardController = require('../apis/dashboard/dashboardController')

const tokenChecker = require('../middleware/tokenChecker')

const multer = require('multer')

//login routes
router.post("/login", userController.login)
//login routes

// category routes
router.post("/class/all", classController.all)
router.post("/class/single", classController.single)
// category routes



router.post("/school/all", schoolController.all)
router.post("/school/single", schoolController.single)
//school routes


//post routes
router.post("/post/all", postController.all)
router.post("/post/single", postController.single)
//post routes

//----------------------------------middleware------------------------------
router.use(require('../middleware/tokenChecker'))
//----------------------------------middleware------------------------------
const schoolStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/public/school/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const schoolUpload = multer({ storage: schoolStorage })
router.post("/school/add", schoolUpload.single('logo'), schoolController.register)
//dashboard
router.post("/dashboard", dashboardController.adminDashboard)
//dashboard

//change password routes
router.post("/changePassword", userController.changePassword)
//change password routes

//user routes
router.post("/user/changeStatus", userController.changeStatus)
//user routes


//parent routes
router.post("/parent/all", parentController.all)
router.post("/parent/single", parentController.single)
//parent routes


//class routes
router.post("/class/add", classController.add)
router.post("/class/update", classController.update)
router.post("/class/delete", classController.del)
//class routes

//enquiry routes
router.post("/enquiry/all", enquiryController.all)
router.post("/enquiry/single", enquiryController.single)
router.post("/enquiry/update", enquiryController.update)
//enquiry routes

//feeStructure routes
router.post("/feeStructure/all", feeStructureController.all)
router.post("/feeStructure/single", feeStructureController.single)
//feeStructure routes

//booking routes
router.post("/booking/all", bookingController.all)
router.post("/booking/single", bookingController.single)
//booking routess

router.all("*", (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})

module.exports = router