const express = require('express');
const router = express.Router();
const LoginController = require('../component/login/loginController');


// router.get('/forgetpassword', (req, res) => {
//     res.render('forgetpassword', {
//         layout: false,
//         title: 'Forget Password Page',
//     })
// });


router.post('/api/postLogin', LoginController.loginAccount);

module.exports = router;