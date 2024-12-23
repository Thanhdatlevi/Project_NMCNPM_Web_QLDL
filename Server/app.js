const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');
const { authenticateToken, requireTourist, requireProvider, requireAdmin, requireLogin, checkIfLoggedIn } = require('./src/middleware/authMiddleware');

const PORT = process.env.PORT || 3000;
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

const hotelRoutes = require('./src/routes/hotelRoutes'); // Điều hướng view
const restaurantRoutes = require('./src/routes/restaurantRoutes');  // Điều hướng tour
const attractionRoutes = require('./src/routes/attractionRoutes'); // Điều hướng đến user
const locationRoutes = require('./src/routes/locationRoutes'); // Điều hướng đến location
const registerRoutes = require('./src/routes/registerRoutes.js');
const loginRoutes = require('./src/routes/loginRoutes.js');
const logoutRoutes = require('./src/routes/logout.Routes.js');
const verifyRoutes = require('./src/routes/verifyRoutes.js');
const authenticateRoutes = require('./src/routes/authenticateRoutes.js');

const adminRoutes = require('./src/routes/adminRoutes.js');
const providerRoutes = require('./src/routes/providerRoutes.js');
const touristRoutes = require('./src/routes/touristRoutes.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cookieParser());
app.use(authenticateToken);

app.use('/restaurant', restaurantRoutes);
app.use('/attraction', attractionRoutes);
app.use('/hotel', hotelRoutes);
app.use('/location', locationRoutes);

app.use('/logout', requireLogin, logoutRoutes);

app.use('/authenticate', authenticateRoutes);
app.use('/register', checkIfLoggedIn, registerRoutes);
app.use('/login', checkIfLoggedIn, loginRoutes);
app.use('/verify', checkIfLoggedIn, verifyRoutes);


app.use('/provider', requireProvider, providerRoutes);
app.use('/admin', requireAdmin, adminRoutes);
app.use('/tourist', touristRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});