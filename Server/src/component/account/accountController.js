const AccountService = require('./accountService');

class AccountController {
    static async getPublicProfile(req, res) {
        try {
            const { accountId } = res.locals.account;
            const userProfile = await AccountService.getPublicProfile(accountId);
            if (!userProfile) {
                return res.status(404).json({ message: "Không tìm thấy thông tin người dùng" })
            }
            return res.status(200).json({ userProfile });
        } catch (error) {
            console.error("Error in ProviderController.getPublicProfile:", error.message);
            throw error;
        }
    }

    static async updateProfile(req, res) {
        try {
            const { accountId } = res.locals.account;
            const { userFullname, userBirthday, userContact, userAddress } = req.body;
            if (!userFullname || !userBirthday || !userContact || !userAddress) {
                return res.status(400).json({ message: "Tất cả các trường thông tin đều phải được cung cấp." });
            }
            const userProfile = await AccountService.updateProfile(accountId, userFullname, userBirthday, userContact, userAddress);
            if (!userProfile) {
                return res.status(404).json({ message: "Không tìm thấy thông tin người dùng" })
            }
            return res.status(200).json({ userProfile });
        } catch (error) {
            console.error("Error in ProviderController.updateProfile:", error.message);
            throw error;
        }
    }
}

module.exports = AccountController;