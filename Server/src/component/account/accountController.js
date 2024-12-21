const AccountService = require('./accountService');

class AccountController {
    static async getPublicProfile(req, res) {
        try {
            const { accountId } = res.locals.account;
            const userProfile = await AccountService.getPublicProfile(accountId);
            if (!userProfile) {
                return res.status(400).json({ message: "Không tìm thấy thông tin người dùng" })
            }
            return res.status(200).json({ userProfile });
        } catch (error) {
            console.error("Error in ProviderController.getPublicProfile:", error.message);
            throw error;
        }
    }
}

module.exports = AccountController;