const userModel = require('./userModel')

const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')
const SECRET = '1234567890'

const login = (req, res) => {
    let validation = ""
    if (!req.body.email) {
        validation += "Email is Required"
    }
    if (!req.body.password) {
        validation += "Password is Required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error" + validation
        })
    }
    else {
        userModel.findOne({ email: req.body.email }).exec()
            .then(userData => {
                if (userData == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "User does not exist"
                    })
                }
                else {
                    if (bcrypt.compareSync(req.body.password, userData.password)) {
                        if (userData.status) {

                            let payload = {
                                _id: userData._id,
                                name: userData.name,
                                email: userData.email,
                                userType: userData.userType
                            }
                            let token = jwt.sign(payload, SECRET, { expiresIn: '24h' })

                            res.send({
                                success: true,
                                status: 200,
                                message: "Login Successful",
                                data: userData,
                                token: token
                            })
                        }
                        else {
                            res.send({
                                success: false,
                                status: 400,
                                message: "Account Inactive, Contact Admin"
                            })
                        }
                    }
                    else {
                        res.send({
                            success: false,
                            status: 400,
                            message: "Invalid Credentials"
                        })
                    }
                }
            })
            .catch(err => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}


const changePassword = (req, res) => {
    let validation = ""

    if (!req.body._id) {
        validation += "_id is Required"
    }
    if (!req.body.currentPassword) {
        validation += "Current Password is Required"
    }
    if (!req.body.newPassword) {
        validation += "New Password is Required"
    }


    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error" + validation
        })
    }
    else {
        userModel.findOne({ _id: req.body._id }).exec()
            .then(userData => {
                if (userData == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "User does not exist"
                    })
                }
                else {
                    if (bcrypt.compareSync(req.body.currentPassword, userData.password)) {
                        userData.password = bcrypt.hashSync(req.body.newPassword, 10)
                        userData.save()
                            .then((updatedData) => {
                                res.send({
                                    success: true,
                                    ststus: 200,
                                    message: "Password Changed",
                                    data: updatedData
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
                    else {
                        res.send({
                            success: false,
                            status: 400,
                            message: "Current Password does not Match"
                        })
                    }
                }

            })
            .catch(err => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}


const changeStatus = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is Required"
    }
    if (!req.body.status) {
        validation += "Status is Required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error:" + validation
        })
    }
    else {
        userModel.findOne({ _id: req.body._id }).exec()
            .then((userData) => {
                if (userData == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "User does not exist"
                    })
                }
                else {
                    userData.status = req.body.status
                    userData.save()
                        .then((updatedUser) => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Status Changed",
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
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: err.message
                })
            })
    }
}
module.exports = { changeStatus, login, changePassword } 