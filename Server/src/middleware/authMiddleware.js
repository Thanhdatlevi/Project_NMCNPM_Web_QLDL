const jwt = require('jsonwebtoken');
const { refreshAccessToken } = require('../component/token/tokenController');
require('dotenv').config();

/**
 * Middleware để xác thực token từ cookie.
 */
async function authenticateToken(req, res, next) {
    const accessToken = req.cookies[process.env.ACCESS_TOKEN_NAME];
    const refreshToken = req.cookies[process.env.REFRESH_TOKEN_NAME];

    if (accessToken) {
        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
            res.locals.account = decoded;
            return next();
        } catch (err) {
            console.log('Access token expired, trying to refresh:', err.message);
            if (refreshToken) {
                try {
                    await refreshAccessToken(req, res, next);
                    return;
                } catch (refreshErr) {
                    console.log("Error refreshing token:", refreshErr.message);
                }
            }
            res.locals.account = null;
            res.clearCookie(process.env.ACCESS_TOKEN_NAME, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'Strict',
            });
        }
    }

    if (!res.locals.account && refreshToken) {
        try {
            await refreshAccessToken(req, res, next);
            return;
        } catch (refreshErr) {
            console.log("Error refreshing token:", refreshErr.message);
        }
    }

    // Nếu không có accessToken hoặc refreshToken hoặc tất cả đều thất bại
    res.locals.account = null;
    return next();
}

/**
 * Middleware yêu cầu người dùng phải đăng nhập.
 */
function requireTourist(req, res, next) {
    if (!res.locals.account || res.locals.account.accountRole !== 3) {
        return res.status(401).json({
            message: 'Unauthorized access: You must be logged in as a tourist to access this resource.'
        });
    }
    next();
}

function requireProvider(req, res, next) {
    if (!res.locals.account || res.locals.account.accountRole !== 2) {
        return res.status(401).json({
            message: 'Unauthorized access: You must be logged in as a provider to access this resource.'
        });
    }
    next();
}

function requireAdmin(req, res, next) {
    if (!res.locals.account || res.locals.account.accountRole !== 1) {
        return res.status(401).json({
            message: 'Unauthorized access: You must be logged in as an admin to access this resource.'
        });
    }
    next();
}

function checkout(req, res, next) {
    if (res.locals.account) {
        const role = res.locals.account.accountRole;
        if (role === 1) {
            return res.redirect('/admin');
        } else if (role === 2) {
            return res.redirect('/provider');
        } else if (role === 3) {
            return res.redirect('/');
        }
    }
    return next();
}



module.exports = {
    authenticateToken,
    requireTourist,
    requireProvider,
    requireAdmin,
    checkout,
};
