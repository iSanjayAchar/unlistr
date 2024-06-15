const database = require("../utils/database");
const {decode} = require("../utils/jwt");
const {response, handleError} = require("../utils/response");

function validate(req, res, next) {
    /** Fetching details */
    const token = req.header('Authorization')?.replace("Bearer ", "");

    if (!token) {
        return response(403, 'Token or role is missing to continue', res)
    }

    /** Decoding JWT */
    decode(token).then((payload) => {
        return database.find({
            selector: {
                table: "users",
                _id: payload.user_id,
            }
        })
    }).then(([user]) => {
        if (!user) {
            return response(403, "Unable to find any account associated with the token", res);
        }

        delete user.document.password
        req.user = user;
        return next();
    }).catch((err) => {
        return response(403, `Either the token is tampered or the session has been expired`, res)
    })
}

module.exports = validate;
