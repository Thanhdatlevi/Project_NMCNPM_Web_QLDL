class VerifyService {
    static async verifyAccount(token) {
        try {
            const account = await VerifyModel.findAccountByToken(token);
            if (!account) {
                return {
                    success: false,
                    message: `Liên kết xác minh không hợp lệ hoặc đã hết hạn.
                    Vui lòng thử lại hoặc yêu cầu một liên kết mới.`
                };
            }

            // Chuyển người dùng vào bảng `accounts`
            await VerifyModel.moveAccountToVerified(account);

            // Xóa người dùng khỏi bảng `pending_accounts`
            await VerifyModel.deleteAccountFromPending(token);

            return { success: true, message: 'Tài khoản đã được xác minh thành công.' };
        } catch (error) {
            throw error;
        }
    }
}

module.exports = VerifyService;
