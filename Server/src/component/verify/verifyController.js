const VerifyService = require('./verifyService');

class VerifyController {
    static async verifyAccount(req, res) {
        try {
            const { token } = req.params;

            const result = await VerifyService.verifyAccount(token);
            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }
            return res.status(200).json({
                message: result.message,
                redirectUrl: '/login',
            });
        } catch (error) {
            console.error('Error during verification:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = VerifyController;
