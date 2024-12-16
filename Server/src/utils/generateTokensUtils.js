const jwt = require('jsonwebtoken');
require('dotenv').config();

// Hàm tạo accessToken
const generateAccessToken = (accountId, accountName, accountRole, deviceId) => {
    return jwt.sign(
        { accountId, accountName, accountRole, deviceId },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION }
    );
};

// Hàm tạo refreshToken
const generateRefreshToken = (accountId, accountName, accountRole, deviceId) => {
    return jwt.sign(
        { accountId, accountName, accountRole, deviceId },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION }
    );
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
};
