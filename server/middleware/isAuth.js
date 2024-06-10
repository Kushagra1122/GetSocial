const JWT = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config("../../.env");
const isAuthenticated = async (req, res, next) => {
    try {

        const decode = JWT.verify(
            req.headers.authorization,
            process.env.JWT_SECRET
        );
        req.id = decode._id;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'Authentication failed' });
    }
};
module.exports = { isAuthenticated };
