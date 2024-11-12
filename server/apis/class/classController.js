const classModel = require('./classModel')
const add = async (req, res) => {
    let validation = ""
    if (!req.body.name) {
        validation += "Name is Required"
    }
    if (!!validation) {
        res.send({
            success: false,
            status: 400,
            message: "Validation Error:" + validation
        })
    }
    else {
        let prevClass = await classModel.findOne({ name: req.body.name })
        if (prevClass == null) {
            let total = await classModel.countDocuments()
            let obj = new classModel()
            obj.autoId = total + 1
            obj.name = req.body.name

            obj.save()
                .then((result) => {
                    res.send({
                        success: true,
                        status: 200,
                        message: "New Class Added",
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
        else {
            res.send({
                success: false,
                status: 400,
                message: "Class Already Exists with same Name "
            })
        }
    }
}


const all = (req, res) => {
    req.body.status = true
    classModel.find(req.body).exec()
        .then((result) => {
            res.send({
                success: true,
                status: 200,
                message: "All Class Loaded",
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
        classModel.findOne({ _id: req.body._id }).exec()
            .then((result) => {
                if (result == null) {
                    res.send({
                        success: false,
                        status: 400,
                        message: "Class does not exist"
                    })
                }
                else {
                    res.send({
                        success: true,
                        status: 200,
                        message: "Single Class",
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
        let prevClass = await classModel.findOne({
            $and: [
                { name: req.body.name },
                { _id: { $ne: req.body._id } }
            ]
        })
        if (prevClass == null) {
            classModel.findOne({ _id: req.body._id }).exec()
                .then(classData => {
                    if (classData == null) {
                        res.send({
                            success: false,
                            status: 400,
                            message: "Class does not exist"
                        })
                    }
                    else {
                        if (!!req.body.name) classData.name = req.body.name
                        classData.save()
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
        else {
            res.send({
                success: false,
                status: 400,
                message: "Class Already Exists with same Name "
            })
        }
    }
}


const del = (req,res)=>{
    validationErrors=[]
    if(!req.body._id)[
        validationErrors.push("id is required")
    ]

    if(validationErrors.length>0){
        res.json({
            status:422,
            success:false,
            message:"validation errors",
            errors:validationErrors
        })
    }
    else{
        classModel.findOne({_id:req.body._id})
        .then((classModelData)=>{
            if(!classModelData){
                res.json({
                    status:404,
                    success:false,
                    message:"data not found",
                })
            }
            else{
                classModel.deleteOne({_id:req.body._id})
                .then(()=>{
                    res.json({
                        status:200,
                        success:true,
                        message:"data deleted successfully",
                        data:classModelData
                    })
                })
                .catch((err)=>{
                    res.json({
                        status:500,
                        success:false,
                        message:"internal server error",
                        errors:err.message
                    })
                })
            }
        })
        .catch((err)=>{
            res.json({
                status:500,
                success:false,
                message:"internal server error",
                errors:err.message
            })
        })
    }
}

module.exports = { add, all, single, update, del }