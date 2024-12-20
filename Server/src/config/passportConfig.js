const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const AccountModel = require('../component/account/accountModel');
const { hashPassword } = require('../utils/passwordUtils');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'Username_Email',
            passwordField: 'password',
        },
        async (username_email, password, done) => {
            try {
                username_email = username_email.trim();
                const pendingAccount = await AccountModel.checkAccountExistsInPendingAccounts(username_email, username_email);

                if (pendingAccount) {
                    return done(null, false, {
                        message: 'Tên đăng nhập hoặc email này đã được đăng ký và đang chờ xác minh qua email. Vui lòng kiểm tra email để xác minh tài khoản.'
                    });
                }

                const account = await AccountModel.checkAccountExistsInAccounts(username_email, username_email);

                if (!account) {
                    return done(null, false, { message: 'Tên đăng nhập/email hoặc mật khẩu không hợp lệ.' });
                }

                const hashedPassword = hashPassword(password, account.salt);
                if (hashedPassword !== account.accountPassword) {
                    return done(null, false, { message: 'Tên đăng nhập/email hoặc mật khẩu không hợp lệ.' });
                }

                return done(null, account);
            } catch (error) {
                return done(error);
            }
        }
    )
);

module.exports = passport;
