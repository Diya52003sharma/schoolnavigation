const userModel = require('../apis/user/userModel')
const bcrypt = require('bcrypt')

userModel.findOne({ email: "admin@gmail.com" }).exec()
    .then(adminData => {
        if (adminData == null) {
            let admin = new userModel()
            admin.autoId = 1
            admin.name = "Admin"
            admin.email = "admin@gmail.com"
            admin.password = bcrypt.hashSync("123", 10)
            admin.userType = 1

            admin.save()
                .then(() => {
                    console.log("Admin Created")
                })
                .catch((err) => {
                    console.log("Error Occured", err)
                })
        }
        else {
            console.log("Admin Already Exists")
        }
    })
    .catch(err => {
        console.log("Error Occured", err)
    })