const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const { authenticateToken, requireTourist, requireProvider, requireAdmin, checkout } = require('./src/middleware/authMiddleware');

const PORT = process.env.PORT || 3000;

// access static files
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const hotelRoutes = require('./src/routes/hotelRoutes'); // Điều hướng view
const restaurentoutes = require('./src/routes/restaurantRoutes');  // Điều hướng tour
const attractionRoutes = require('./src/routes/attractionRoutes'); // Điều hướng đến user
const locationRoutes = require('./src/routes/locationRoutes'); // Điều hướng đến location
const registerRoutes = require('./src/routes/registerRoutes.js');
const loginRoutes = require('./src/routes/loginRoutes.js');
const logoutRoutes = require('./src/routes/logout.Routes.js');
const verifyRoutes = require('./src/routes/verifyRoutes.js');
const authenticateRoutes = require('./src/routes/authenticateRoutes.js');
const adminRoutes = require('./src/routes/adminRoutes.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cookieParser());
app.use(authenticateToken);

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use('/authenticate', authenticateRoutes);
app.use('/restaurant', restaurentoutes);
app.use('/attraction', attractionRoutes);
app.use('/hotel', hotelRoutes);
app.use('/location', locationRoutes);
app.use('/register', registerRoutes);
app.use('/login', loginRoutes);
app.use('/logout', logoutRoutes);
app.use('/verify', verifyRoutes);

app.use('/admin', adminRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});