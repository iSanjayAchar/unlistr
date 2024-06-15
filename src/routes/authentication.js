const database = require("../utils/database");
const jwt = require("../utils/jwt");
const { handleError, response } = require("../utils/response");
const {encrypt, compare} = require("../utils/hash");
const auth = require("../middleware/auth");

const router = require("express").Router();

router.post("/register", async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return response(400, "Email & Password are required to register", res);
        }
        
        const result = await database.find({
            selector: {
                table: "users",
                document: {
                    email,
                }
            },
        });

        if (result.length > 0) {
            return response(400, `${email} is already registered`, res);
        }

        const userId = await database.write("users", {
            email, 
            password: encrypt(password),
        });

        const token = await jwt.sign(userId);
        return response(200, {
            token,
            user: {
                uid: userId,
                email,
            }
        }, res);
    } catch (err) {
        return handleError(500, err, res);
    }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return response(400, "Email & Password are required to login", res);
        }
        
        const [user] = await database.find({
            selector: {
                table: "users",
                document: {
                    email,
                }
            },
        });

        if (!user) {
            return response(400, `${email} is not registered`, res);
        }

        if (!compare(user.document.password.hash, user.document.password.salt, password)) {
            return response(403, "Invalid password, please try again", res);
        }

        const token = await jwt.sign(user._id);
        return response(200, {
            token,
            user: {
                uid: user._id,
                email,
            }
        }, res);        

    } catch (err) {
        console.error(err);
        return handleError(500, err, res);
    }
});

router.get("/me", auth, (req, res) => {
    const user = {
        token: req.header("Authorization"),
        user: {
            uid: req.user._id,
            email: req.user.document.email,
        }
    }

    return response(200, user, res);
    
});

module.exports = router;
