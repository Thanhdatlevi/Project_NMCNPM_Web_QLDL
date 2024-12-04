const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../component/user/userModel');
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
                const pendingUser = await userModel.checkUserExistsInPendingUsers(username_email, username_email);

                if (pendingUser) {
                    return done(null, false, {
                        message: 'This username or email is already registered and awaiting email verification. Please check your email to verify your account.'
                    });
                }

                const user = await userModel.checkUserExistsInUsers(username_email, username_email);

                if (!user) {
                    return done(null, false, { message: 'Invalid username/email or password.' });
                }

                // Kiểm tra mật khẩu
                const hashedPassword = hashPassword(password, user.getSalt());
                if (hashedPassword !== user.getHashPassword()) {
                    return done(null, false, { message: 'Invalid username/email or password.' });
                }

                // Nếu xác thực thành công

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);

module.exports = passport;
