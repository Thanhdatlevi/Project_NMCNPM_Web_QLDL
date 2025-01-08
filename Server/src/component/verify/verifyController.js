const VerifyService = require('./verifyService');

class VerifyController {
    static async verifyAccount(req, res) {
        try {
            const { token } = req.params;

            const result = await VerifyService.verifyAccount(token);
            if (!result.success) {
                return res.status(400).json({ message: result.message });
            }
            const ENV_URL = process.env.NODE_ENV === 'development'
                ? 'http://localhost:3001'  // URL local development
                : process.env.PRODUCTION_URL; // URL production
            res.redirect(`${ENV_URL}/login?message=${encodeURIComponent(result.message)}`);
        } catch (error) {
            console.error('Error during verification:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = VerifyController;
