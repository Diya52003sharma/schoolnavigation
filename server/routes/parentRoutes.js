const router = require('express').Router()

const bookingController = require('../apis/booking/bookingController')

const enquiryController = require('../apis/enquiry/enquiryController')

const classController = require('../apis/class/classController')

const postController = require('../apis/post/postController')

const feeStructureController = require('../apis/feeStructure/feeStructureController')

const parentController = require('../apis/parent/parentController')

const schoolController = require('../apis/school/schoolController')

const userController = require('../apis/user/userController')

const tokenChecker = require('../middleware/tokenChecker')

//login routes
router.post("/login", userController.login)
//login routes


//school routes
router.post("/school/all", schoolController.all)
router.post("/school/single", schoolController.single)
//school routes

router.post("/enquiry/add", enquiryController.add)
router.post("/register", parentController.register)
router.post("/feeStructure/all", feeStructureController.all)
//----------------------------------middleware------------------------------
router.use(require('../middleware/tokenChecker'))
//----------------------------------middleware------------------------------

//change password routes
router.post("/changePassword", userController.changePassword)
//change password routes

//parent routes
router.post("/parent/single", parentController.single)
router.post("/parent/update", parentController.update)
//parent routes

//booking routes
router.post("/booking/add", bookingController.add)
router.post("/booking/all", bookingController.all)
router.post("/booking/single", bookingController.single)
router.post("/booking/update", bookingController.update)
//booking routes

//enquiry routes
//enquiry routes


//class routes
router.post("/class/all", classController.all)
router.post("/class/single", classController.single)
//class routes

//post routes
router.post("/post/all", postController.all)
router.post("/post/single", postController.single)
//post routes

//feeStructure routes
router.post("/feeStructure/single", feeStructureController.single)
//feeStructure routes

router.all("*", (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})

module.exports = router