const RegisterModel = require('./registerModel');
const AccountModel = require('../account/accountModel');
const crypto = require('crypto');
const { sendVerificationEmail } = require('../../utils/emailUtils');
const { generateSalt, hashPassword } = require('../../utils/passwordUtils');

class RegisterService {

    static async registerAccount(accountName, email, password, role) {
        try {

            const [existingAccounts, pendingAccounts] = await Promise.all([
                AccountModel.checkAccountExistsInAccounts(accountName, email),
                AccountModel.checkAccountExistsInPendingAccounts(accountName, email)
            ]);

            if (existingAccounts) {
                return { success: false, message: 'Tên người dùng hoặc tài khoản đã tồn tại.' };
            }
            if (pendingAccounts) {
                return { success: false, message: 'Tài khản nãy đã đăng ký và đang chờ xác nhận email.' };
            }

            const salt = generateSalt();
            const encryptedPassword = hashPassword(password, salt);
            const verificationToken = crypto.randomBytes(20).toString('hex');

            await RegisterModel.createPendingAccount(accountName, email, encryptedPassword, verificationToken, role, salt);
            await sendVerificationEmail(email, verificationToken);
            return { success: true, message: 'Đăng ký thành công. Vui lòng xác nhận email!' };

        } catch (error) {
            console.error('Error registerAccount in RegisterService :', error); // Ghi lại lỗi cho mục đích debug
            throw error;
        }
    }
}

module.exports = RegisterService;
