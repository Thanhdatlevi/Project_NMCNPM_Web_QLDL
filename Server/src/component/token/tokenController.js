const { getRefreshTokenFromDb } = require('./tokenModel');
const { generateAccessToken } = require('../../utils/generateTokensUtils');
const jwt = require('jsonwebtoken');


async function refreshAccessToken(req, res, next) {
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_NAME];
    if (!refreshToken) {
        return next();
    }
    try {
        const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        // Kiểm tra refreshToken từ DB
        const storedRefreshToken = await getRefreshTokenFromDb(refreshToken);

        if (storedRefreshToken) {

            // Tạo lại access token nếu refresh token hợp lệ
            const newAccessToken = generateAccessToken(decodedRefreshToken.accountId, decodedRefreshToken.accountName
                , decodedRefreshToken.accountRole, decodedRefreshToken.devideId);

            // Cập nhật cookie với access token mới
            res.cookie(process.env.ACCESS_TOKEN_NAME, newAccessToken,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'Lax'
                });
            res.locals.account = decodedRefreshToken;

        } else {
            res.locals.account = null;
        }

    } catch (err) {
        console.log("Error refresh:", err.message);
        res.clearCookie(process.env.REFRESH_TOKEN_NAME,
            {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Lax',
                path: '/'
            });
        res.locals.account = null;
    }
    return next();

}

module.exports = { refreshAccessToken };
