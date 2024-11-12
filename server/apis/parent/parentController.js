const userModel = require('../user/userModel')
const parentModel = require('./parentModel')
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
    if (!req.body.contact) {
        validation += "Contact is Required"
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
            userObj.save()
                .then(async (savedUser) => {
                    let totalParents = await parentModel.countDocuments()
                    let parentObj = new parentModel()
                    parentObj.autoId = totalParents + 1
                    parentObj.name = req.body.name
                    parentObj.email = req.body.email
                    parentObj.contact = req.body.contact
                    parentObj.userId = savedUser._id
                    parentObj.save()
                        .then(savedparent => {
                            res.send({
                                success: true,
                                ststus: 200,
                                message: "New Account Created For Parent",
                                data: savedUser

                            })
                        })
                        .catch(err => {
                            res.send({
                                success: false,
                                status: 500,
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
    parentModel.find(req.body)
        .populate('userId')
        .exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All Parent Account Loaded",
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
        parentModel.findOne({ userId: req.body._id })
            .populate('userId')
            .exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Parent Account does not exist"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single Parent Account",
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
                                parentModel.findOne({ userId: req.body._id }).exec()
                                    .then((parentData) => {
                                        if (parentData == null) {
                                            res.send({
                                                success: false,
                                                ststus: 400,
                                                message: "Parent Account does not exist "
                                            })
                                        }
                                        else {
                                            if (!!req.body.name) parentData.name = req.body.name
                                            if (!!req.body.email) parentData.email = req.body.email
                                            if (!!req.body.contact) parentData.contact = req.body.contact
                                            parentData.save()
                                                .then((updatedparent) => {
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