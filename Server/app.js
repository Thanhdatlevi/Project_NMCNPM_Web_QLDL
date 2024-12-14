const express = require('express');
// const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// access static files
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

const holRoutes = require('./src/routes/holRoutes'); // Điều hướng view
const resRoutes = require('./src/routes/resRoutes');  // Điều hướng tour
const attractionRoutes = require('./src/routes/attractionRoutes') // Điều hướng đến user
const userRoutes = require('./src/routes/userRoutes') // Điều hướng đến user
const locRoutes = require('./src/routes/locationRoutes') // Điều hướng đến user
const feedbackRoutes = require('./src/routes/feedbackRoutes');



app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
// app.engine('hbs', exphbs.engine({
//     extname: '.hbs',
//     defaultLayout: 'main' // Layout chính
// }));

// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'src', 'views'))

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use('/res', resRoutes);

app.use('/attraction', attractionRoutes);

app.use('/hotel', holRoutes);

app.use('/user', userRoutes);

app.use('/location', locRoutes);

app.use('/feedback',feedbackRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});