const VerifyModel = require('./verifyModel');

class VerifyService {
    static async verifyAccount(token) {
        try {
            const account = await VerifyModel.findAccountByToken(token);
            if (!account) {
                return {
                    success: false,
                    message: `The verification link is invalid or has expired.
                Please try again or request a new one.`
                };
            }

            // Chuyển người dùng vào bảng `accounts`
            await VerifyModel.moveAccountToVerified(account);

            // Xóa người dùng khỏi bảng `pending_accounts`
            await VerifyModel.deleteAccountFromPending(token);

            return { success: true, message: 'Account verified successfully.' };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = VerifyService;
