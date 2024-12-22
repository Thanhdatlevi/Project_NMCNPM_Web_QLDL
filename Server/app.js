const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const { authenticateToken, requireTourist, requireProvider, requireAdmin, requireLogin, checkIfLoggedIn } = require('./src/middleware/authMiddleware');

const PORT = process.env.PORT || 3000;

// access static files
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001'); // Chỉ cho phép localhost:3001
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH'); // Cho phép các phương thức HTTP
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Cho phép các header
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); // Trả về OK cho yêu cầu preflight
    } else {
        next(); // Chuyển sang middleware tiếp theo
    }
});


const hotelRoutes = require('./src/routes/hotelRoutes'); // Điều hướng view
const restaurantRoutes = require('./src/routes/restaurantRoutes');  // Điều hướng tour
const attractionRoutes = require('./src/routes/attractionRoutes'); // Điều hướng đến user
const locationRoutes = require('./src/routes/locationRoutes'); // Điều hướng đến location
const registerRoutes = require('./src/routes/registerRoutes.js');
const loginRoutes = require('./src/routes/loginRoutes.js');
const logoutRoutes = require('./src/routes/logout.Routes.js');

const reservationRoutes = require('./src/routes/reservationRoutes.js');

const verifyRoutes = require('./src/routes/verifyRoutes.js');
const authenticateRoutes = require('./src/routes/authenticateRoutes.js');

const adminRoutes = require('./src/routes/adminRoutes.js');
const providerRoutes = require('./src/routes/providerRoutes.js');
const touristRoutes = require('./src/routes/touristRoutes.js');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(cookieParser());
app.use(authenticateToken);

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use('/restaurant', restaurantRoutes);
app.use('/attraction', attractionRoutes);
app.use('/hotel', hotelRoutes);
app.use('/location', locationRoutes);

app.use('/logout', requireLogin, logoutRoutes);

app.use('/authenticate', authenticateRoutes);
app.use('/register', checkIfLoggedIn, registerRoutes);
app.use('/login', checkIfLoggedIn, loginRoutes);
app.use('/verify', checkIfLoggedIn, verifyRoutes);

app.use('reservation', reservationRoutes);

app.use('/provider', requireProvider, providerRoutes);
app.use('/admin', requireAdmin, adminRoutes);
app.use('/tourist', requireTourist, touristRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});