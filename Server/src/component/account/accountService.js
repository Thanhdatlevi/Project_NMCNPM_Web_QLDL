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
    
    static async updateProfile(accountId, userFullname, userBirthday, userContact, userAddress) {
        try {
            const userProfile = await AccountModel.updateProfile(accountId, userFullname, userBirthday, userContact, userAddress);
            return userProfile;
        } catch (error) {
            console.error("Error in ProviderService.getPublicProfile:", error.message);
            throw error;
        }
    }
}

module.exports = AccountService;