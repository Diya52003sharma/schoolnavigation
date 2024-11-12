const enquiryModel = require('./enquiryModel')
const add = async (req, res) => {
    let validation = ""
    if (!req.body.name) {
        validation += "Name is Required"
    }
    if (!req.body.email) {
        validation += "Email is Required"
    }
    if (!req.body.contact) {
        validation += "Contact is Required"
    }
    if (!req.body.message) {
        validation += "Message is Required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error:" + validation
        })
    }
    else {
        let total = await enquiryModel.countDocuments()
        let obj = new enquiryModel()
        obj.autoId = total + 1
        obj.name = req.body.name
        obj.email = req.body.email
        obj.contact = req.body.contact
        obj.message = req.body.message

        obj.save()
            .then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "Enquiry Send Successfully",
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
    enquiryModel.find(req.body).exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All Enquries Loaded",
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
        enquiryModel.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Enquiry does not exist"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single Enquiry",
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
        validation += "status is required"
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    }
    else {
        enquiryModel.findOne({ _id: req.body._id }).exec()
            .then(enquiryData => {
                if (enquiryData == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Enquiry does not exist"
                    })
                }
                else {
                    enquiryData.status = req.body.status

                    enquiryData.save()
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