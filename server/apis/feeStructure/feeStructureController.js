const feeStructureModel = require('./feeStructureModel')
const add = async (req, res) => {
    let validation = ""
    if (!req.body.schoolId) {
        validation += " SchoolId is Required"
    }
    if (!req.body.addmissionFee) {
        validation += "Addmission Fee is Required"
    }
    if (!req.body.yearlyFee) {
        validation += "Yearly Fee is Required"
    }
    if (!req.body.monthlyFee) {
        validation += "Monthly Fee is Required"
    }
    if (!req.body.extra) {
        validation += "Extra Information is Required"
    }
    if (!req.body.classId) {
        validation += "ClassId is Required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error:" + validation
        })
    }
    else {
        let total = await feeStructureModel.countDocuments()
        let obj = new feeStructureModel()
        obj.autoId = total + 1
        obj.schoolId = req.body.schoolId
        obj.addmissionFee = req.body.addmissionFee
        obj.yearlyFee = req.body.yearlyFee
        obj.monthlyFee = req.body.monthlyFee
        obj.extra = req.body.extra
        obj.classId = req.body.classId

        obj.save()
            .then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "Fee Structure Information",
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
    req.body.status = true
    feeStructureModel.find(req.body)
        .populate('schoolId')
        .populate('classId')
        .exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All Fee Structure Loaded",
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
        feeStructureModel.findOne({ _id: req.body._id })
            .populate('schoolId')
            .populate('classId')
            .exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Fee Structure does not exist"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single Fee Structure",
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

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    }
    else {
        feeStructureModel.findOne({ _id: req.body._id }).exec()
            .then(feeStructureData => {
                if (feeStructureData == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Fee Structure does not exist"
                    })
                }
                else {
                    if (!!req.body.schoolId) feeStructureData.schoolId = req.body.schoolId
                    if (!!req.body.addmissionFee) feeStructureData.addmissionFee = req.body.addmissionFee
                    if (!!req.body.yearlyFee) feeStructureData.yearlyFee = req.body.yearlyFee
                    if (!!req.body.monthlyFee) feeStructureData.monthlyFee = req.body.monthlyFee
                    if (!!req.body.extra) feeStructureData.extra = req.body.extra
                    if (!!req.body.classId) feeStructureData.classId = req.body.classId

                    feeStructureData.save()
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


const del = (req, res) => {
    let validation = ""
    if (!req.body._id) {
        validation += "_id is required"
    }


    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error : " + validation
        })
    }
    else {
        feeStructureModel.findOne({ _id: req.body._id }).exec()
            .then(feeStructureData => {
                if (feeStructureData == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Fee Structure does not exist"
                    })
                }
                else {
                    feeStructureData.status = false

                    feeStructureData.save()
                        .then(updatedData => {
                            res.send({
                                success: true,
                                status: 200,
                                message: "Data deleted",
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

module.exports = { add, all, single, update, del }