const userModel = require('../user/userModel')
const schoolModel = require('./schoolModel')
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    let validation = ""
    if (!req.body.name) {
        validation += "Name is Required"
    }
    if (!req.body.email) {
        validation += "Email is Required"
    }
    if (!req.body.password) {
        validation += "Password is Required"
    }
    if (!req.body.address) {
        validation += "Address is Required"
    }
    if (!req.body.principal) {
        validation += "Principal is Required"
    }
    if (!req.body.schoolDescription) {
        validation += "School Description is Required"
    }
    if (!req.file) {
        validation += "Logo is Required"
    }

    if (!!validation) {
        res.send({
            success: false,
            ststus: 400,
            message: "Validation Error:" + validation
        })
    }
    else {
        let prevUser = await userModel.findOne({ email: req.body.email })
        if (prevUser == null) {
            let totalUsers = await userModel.countDocuments()
            let userObj = new userModel()
            userObj.autoId = totalUsers + 1
            userObj.name = req.body.name
            userObj.email = req.body.email
            userObj.password = bcrypt.hashSync(req.body.password, 10)
            userObj.userType = 2
            userObj.save()
                .then(async (savedUser) => {
                    let totalSchools = await schoolModel.countDocuments()
                    let schoolObj = new schoolModel()
                    schoolObj.autoId = totalSchools + 1
                    schoolObj.name = req.body.name
                    schoolObj.email = req.body.email
                    schoolObj.address = req.body.address
                    schoolObj.principal = req.body.principal
                    schoolObj.schoolDescription = req.body.schoolDescription
                    schoolObj.userId = savedUser._id
                    schoolObj.logo = "school/" + req.file.filename
                    schoolObj.save()
                        .then(savedSchool => {
                            res.send({
                                success: true,
                                ststus: 200,
                                message: "New Account Created For School",
                                data: savedUser

                            })
                        })
                        .catch(err => {
                            res.send({
                                success: false,
                                ststus: 500,
                                message: err.message
                            })
                        })
                })
                .catch(err => {
                    res.send({
                        success: false,
                        ststus: 500,
                        message: err.message
                    })
                })
        }
        else {
            res.send({
                success: false,
                status: 400,
                message: "Email Already Exists "
            })
        }
    }

}


const all = (req, res) => {
    schoolModel.find(req.body)
        .populate('userId')
        .exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All School Account Loaded",
                data: result,
                total: result.length
            })
        })
        .catch((err) => {
            res.send({
                success: false,
                status: 500,
                message: err.message

            })
        })
}

const single = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation = "_id is Required"
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error:" + validation
        })
    }
    else {
        schoolModel.findOne({ userId: req.body._id })
            .populate('userId')
            .exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "School Account does not exist"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single School Account",
                        data: result
                    })
                }
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}


const update = async (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is Required"
    }

    if (!!validation) {
        res.send({
            success: false,
            ststus: 400,
            message: "Validation Error:" + validation
        })
    }
    else {

        let prevUser = await userModel.findOne({
            $and: [
                { email: req.body.email },
                { _id: { $ne: req.body._id } }
            ]
        })
        if (prevUser == null) {
            userModel.findOne({ _id: req.body._id }).exec()
                .then(userData => {
                    if (userData == null) {
                        res.send({
                            success: false,
                            ststus: 400,
                            message: "User does not exist "
                        })
                    }
                    else {
                        if (!!req.body.name) userData.name = req.body.name
                        if (!!req.body.email) userData.email = req.body.email
                        userData.save()
                            .then((updatedUser) => {
                                schoolModel.findOne({ userId: req.body._id }).exec()
                                    .then((schoolData) => {
                                        if (schoolData == null) {
                                            res.send({
                                                success: false,
                                                ststus: 400,
                                                message: "School Account does not exist "
                                            })
                                        }
                                        else {
                                            if (!!req.body.name) schoolData.name = req.body.name
                                            if (!!req.body.email) schoolData.email = req.body.email
                                            if (!!req.body.address) schoolData.address = req.body.address
                                            if (!!req.body.principal) schoolData.principal = req.body.principal
                                            if (!!req.body.schoolDescription) schoolData.schoolDescription = req.body.schoolDescription
                                            if (!!req.file) schoolData.logo = "school/" + req.file.filename
                                            schoolData.save()
                                                .then((updatedSchool) => {
                                                    res.send({
                                                        success: true,
                                                        ststus: 200,
                                                        message: "Data Updated",
                                                        data: updatedUser
                                                    })
                                                })
                                                .catch((err) => {
                                                    res.send({
                                                        success: false,
                                                        status: 500,
                                                        message: err.message
                                                    })
                                                })
                                        }
                                    })

                            })
                            .catch((err) => {
                                res.send({
                                    success: false,
                                    status: 500,
                                    message: err.message
                                })
                            })
                    }
                })
        }
        else {
            res.send({
                success: false,
                status: 400,
                message: "Email Already Exists "
            })
        }
    }

}

module.exports = { register, all, single, update }