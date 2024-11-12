const postModel = require('./postModel')

const add = async (req, res) => {
    let validation = ""
    if (!req.body.fileDescription) {
        validation += "File Description is Required"
    }
    if (!req.body.schoolId) {
        validation += "SchoolId is Required"
    }
    if (!req.file) {
        validation += "Image is Required"
    }

    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error:" + validation
        })
    }
    else {
        let total = await postModel.countDocuments()
        let obj = new postModel()
        obj.autoId = total + 1
        obj.fileDescription = req.body.fileDescription
        obj.schoolId = req.body.schoolId
        obj.image = "post/" + req.file.filename
        obj.save()
            .then((result) => {
                res.send({
                    success: true,
                    status: 200,
                    message: "New Post Added",
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
    postModel.find(req.body)
        .populate('schoolId')
        .exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All Post Loaded",
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
        postModel.findOne({ _id: req.body._id })
            .populate('schoolId')
            .exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Post does not exist"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single Post",
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
        postModel.findOne({ _id: req.body._id }).exec()
            .then(postData => {
                if (postData == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Post does not exist"
                    })
                }
                else {
                    if (!!req.body.fileDescription) postData.fileDescription = req.body.fileDescription
                    if (!!req.body.schoolId) postData.schoolId = req.body.schoolId
                    if (!!req.file) postData.image = "post/" + req.file.filename
                    postData.save()
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
        postModel.findOne({ _id: req.body._id }).exec()
            .then(postData => {
                if (postData == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Post does not exist"
                    })
                }
                else {
                    postData.status = false

                    postData.save()
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