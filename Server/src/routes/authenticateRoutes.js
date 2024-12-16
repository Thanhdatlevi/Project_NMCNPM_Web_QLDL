const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (res.locals.account) {
        const accountName = res.locals.account.accountName;
        let role;

        switch (res.locals.account.accountRole) {
            case 1:
                role = 'admin';  // Admin
                break;
            case 2:
                role = 'provider';  // Provider
                break;
            case 3:
                role = 'tourist';  // Tourist
                break;
            default:
                role = 'unknown';  // Nếu không có giá trị hợp lệ
                break;
        }
        return res.status(200).json({ accountName, role });
    }
    return res.status(401).json({ message: 'Unauthorized' });
});

module.exports = router;
