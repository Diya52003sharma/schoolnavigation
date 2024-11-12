const bookingModel = require('./bookingModel')
const add = async (req, res) => {
    let validation = ""
    if (!req.body.schoolId) {
        validation += " SchoolId is Required"
    }
    if (!req.body.userId) {
        validation += "UserId is Required"
    }
    if (!req.body.purpose) {
        validation += "Purpose is Required"
    }
    if (!req.body.bookingDate) {
        validation += "Booking Date is Required"
    }
    // if (!req.body.bookingTime) {
    //     validation += "Booking Time Required"
    // }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error:" + validation
        })
    }
    else {
        let total = await bookingModel.countDocuments()
        let obj = new bookingModel()
        obj.autoId = total + 1
        obj.schoolId = req.body.schoolId
        obj.userId = req.body.userId
        obj.purpose = req.body.purpose
        obj.bookingDate = req.body.bookingDate
        obj.bookingTime = req.body.bookingTime

        obj.save()
            .then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "New Booking Added",
                    data: result
                })
            })
            .catch((err) => {
                res.send({
                    success: false,
                    status: 500,
                    message: "Error Occured:" + err.message

                })
            })
    }
}


const all = (req, res) => {
    bookingModel.find(req.body)
        .populate('schoolId')
        .populate('userId')
        .sort({createdAt:-1})
        .exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All Booking Loaded",
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
        bookingModel.findOne({ _id: req.body._id })
            .populate('schoolId')
            .populate('userId')
            .exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Booking does not exist"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single Booking",
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


const update = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is required"
    }
    if (!req.body.status) {
        validation += "Status is required"
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    }
    else {
        bookingModel.findOne({ _id: req.body._id }).exec()
            .then(bookingData => {
                if (bookingData == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Booking does not exist"
                    })
                }
                else {
                    bookingData.status = req.body.status

                    bookingData.save()
                        .then(updatedData => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Data updated",
                                data: updatedData
                            })
                        })
                        .catch(err => {
                            res.send({
                                success: false,
                                status: 500,
                                message: err.message
                            })
                        })
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

module.exports = { add, all, single, update }