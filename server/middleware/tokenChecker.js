const jwt = require('jsonwebtoken')
const SECRET = '1234567890'

const check = (req, res, next) => {
    let token = req.headers['authorization']
    if (!!token) {
        jwt.verify(token, SECRET, (err, data) => {
            if (err) {
                res.send({
                    success: false,
                    status: 403,
                    message: "Unauthorized Access"
                })
            }
            else {
                next()
            }
        })
    }
    else {
        res.send({
            success: false,
            status: 403,
            message: "No Token Found"
        })
    }
}

module.exports = check