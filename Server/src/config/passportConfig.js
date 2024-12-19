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
                        message: 'This username or email is already registered and awaiting email verification. Please check your email to verify your account.'
                    });
                }

                const account = await AccountModel.checkAccountExistsInAccounts(username_email, username_email);

                if (!account) {
                    return done(null, false, { message: 'Invalid username/email or password.' });
                }

                // Kiểm tra mật khẩu
                const hashedPassword = hashPassword(password, account.salt);
                if (hashedPassword !== account.accountPassword) {
                    return done(null, false, { message: 'Invalid username/email or password.' });
                }

                return done(null, account);
            } catch (error) {
                return done(error);
            }
        }
    )
);

module.exports = passport;
