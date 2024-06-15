const jwt = require("jsonwebtoken");

function sign(ObjectID) {
    return new Promise((resolve) => {
        const secret = process.env.JWT_SECRET
        const payload = {
            user_id: ObjectID
        }

        const token = jwt.sign(payload, secret, {
            expiresIn: 30 * 24 * 60 * 60 // JWT expires in 30 days
        })
        resolve(token)
    })
}

function decode(token) {
    return new Promise((resolve, reject) => {
        const secret = process.env.JWT_SECRET

        jwt.verify(token, secret, (err, decoded) => {
            if (err)
                reject('Invalid token')
            else
                resolve(decoded)
        })
    })
}

module.exports = {sign, decode};
