const router = require('express').Router()

const postController = require('../apis/post/postController')

const feeStructureController = require('../apis/feeStructure/feeStructureController')

const classController = require('../apis/class/classController')

const bookingController = require('../apis/booking/bookingController')

const schoolController = require('../apis/school/schoolController')

const parentController = require('../apis/parent/parentController')

const userController = require('../apis/user/userController')

const tokenChecker = require('../middleware/tokenChecker')

const multer = require('multer')

//school routes

router.post("/school/single", schoolController.single)

//login routes
router.post("/login", userController.login)
//login routes

//class routes
router.post("/class/all", classController.all)
router.post("/class/single", classController.single)
//class routes


// post routes
router.post("/post/all", postController.all)
router.post("/post/single", postController.single)
// post routes

//----------------------------------middleware------------------------------
router.use(require('../middleware/tokenChecker'))
//----------------------------------middleware------------------------------

//change password routes
router.post("/changePassword", userController.changePassword)
//change password routes
const schoolStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/public/school/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const schoolUpload = multer({ storage: schoolStorage })

router.post("/update", schoolUpload.single('logo'), schoolController.update)
//school routes

//parent routes
router.post("/parent/single", parentController.single)
//parent routes

//post routes
const postStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/public/post/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const postUpload = multer({ storage: postStorage })
router.post("/post/add", postUpload.single('image'), postController.add)
router.post("/post/update", postUpload.single('image'), postController.update)
router.post("/post/delete", postController.del)
//post routes

//feeStructure routes
router.post("/feeStructure/add", feeStructureController.add)
router.post("/feeStructure/all", feeStructureController.all)
router.post("/feeStructure/single", feeStructureController.single)
router.post("/feeStructure/update", feeStructureController.update)
router.post("/feeStructure/delete", feeStructureController.del)
//feeStructure routes


//booking routes
router.post("/booking/all", bookingController.all)
router.post("/booking/single", bookingController.single)
router.post("/booking/update", bookingController.update)
//booking routes


router.all("*", (req, res) => {
    res.send({
        success: false,
        status: 404,
        message: "Invalid Address"
    })
})

module.exports = router