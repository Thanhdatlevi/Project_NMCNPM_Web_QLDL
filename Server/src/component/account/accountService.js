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

    /**
    * Lấy provider_id của một tài khoản.
    * @param {number} accountId - ID của tài khoản.
    * @returns {number|null} - ID của provider hoặc null nếu không tồn tại.
    */
    static async getProviderId(accountId) {
        try {
            return await AccountModel.getProviderId(accountId);
        } catch (error) {
            console.error('Error in AccountService.getProviderId:', error.message);
            throw error;
        }
    }

    /**
    * Lấy tourist_id của một tài khoản.
    * @param {number} accountId - ID của tài khoản.
    * @returns {number|null} - ID của tourist hoặc null nếu không tồn tại.
    */
    static async getTouristId(accountId) {
        try {
            return await AccountModel.getTouristId(accountId);
        } catch (error) {
            console.error('Error in AccountService.getTouristId:', error.message);
            throw error;
        }
    }

    /**
     * Lấy admin_id của một tài khoản.
     * @param {number} accountId - ID của tài khoản.
     * @returns {number|null} - ID của admin hoặc null nếu không tồn tại.
     */
    static async getAdminId(accountId) {
        try {
            return await AccountModel.getAdminId(accountId);
        } catch (error) {
            console.error('Error in AccountService.getAdminId:', error.message);
            throw error;
        }
    }

}

module.exports = AccountService;