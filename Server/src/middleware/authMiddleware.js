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
                sameSite: 'Lax',
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

function requireLogin(req, res, next) {
    if (!res.locals.account) {
        return res.status(401).json({
            message: 'Truy cập bị từ chối: Bạn chưa đăng nhập.'
        });
    }
    next();
}

function requireTourist(req, res, next) {
    if (!res.locals.account || res.locals.account.accountRole !== 3) {
        return res.status(401).json({
            message: 'Truy cập bị từ chối: Bạn phải đăng nhập với vai trò khách du lịch để truy cập tài nguyên này.'
        });
    }
    next();
}

function requireProvider(req, res, next) {
    if (!res.locals.account || res.locals.account.accountRole !== 2) {
        return res.status(401).json({
            message: 'Truy cập bị từ chối: Bạn phải đăng nhập với vai trò nhà cung cấp để truy cập tài nguyên này.'
        });
    }
    next();
}

function requireAdmin(req, res, next) {
    if (!res.locals.account || res.locals.account.accountRole !== 1) {
        return res.status(401).json({
            message: 'Truy cập bị từ chối: Bạn phải đăng nhập với vai trò quản trị viên để truy cập tài nguyên này.'
        });
    }
    next();
}

function checkIfLoggedIn(req, res, next) {
    if (res.locals.account) {
        return res.status(400).json({
            message: "Bạn đã đăng nhập rồi, cần đăng xuất."
        });
    }
    next();
}


module.exports = {
    authenticateToken,
    requireLogin,
    requireTourist,
    requireProvider,
    requireAdmin,
    checkIfLoggedIn,
};
