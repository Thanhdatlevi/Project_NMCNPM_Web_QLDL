const AccountModel = require('./accountModel');

class AccountService {

    static async getPublicProfile(accountId) {
        try {
            const userProfile = await AccountModel.getPublicProfile(accountId);
            return userProfile;
        } catch (error) {
            console.error("Error in ProviderService.getPublicProfile:", error.message);
            throw error;
        }
    }
}

module.exports = AccountService;