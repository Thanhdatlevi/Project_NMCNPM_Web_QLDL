const verifyModel = require('./verifyModel');

async function verifyAccount(req, res) {
    const { token } = req.params;

    try {
        // Kiểm tra token có hợp lệ không
        const user = await verifyModel.findUserByToken(token);

        if (!user) {
            return res.json({
                success: false,
                message: 'Invalid or expired token.'
            })
        }

        // Chuyển người dùng vào bảng `users` 
        await verifyModel.moveUserToVerified(user);

        // Xóa người dùng khỏi bảng `pending_users`
        await verifyModel.deleteUserFromPending(token);

        return res.json({
            success: true,
            message: 'Account verified successfully, you can now login.',
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error in verification', error: error.message });
    }
}

module.exports = {
    verifyAccount,
};
