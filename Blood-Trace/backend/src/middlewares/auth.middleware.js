const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { replaceOne } = require('../models/user.model');

dotenv.config();

const authenticateToken = (req, res, next) => {
    const token = req.header["Authorization"]?.replace("Bearer ", "");

    if (!token) return res.status(401).json({
        message: "Unauthorized"
    });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) return res.status(403).json({
            message: "Unauthorized",
            user: user
        });
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;