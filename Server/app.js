const express = require('express');
// const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


const holRoutes = require('./src/routes/holRoutes'); // Điều hướng view
const resRoutes = require('./src/routes/resRoutes');  // Điều hướng tour
const attractionRoutes = require('./src/routes/attractionRoutes') // Điều hướng đến user

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

//Handlebars
// app.engine('hbs', exphbs.engine({
//     extname: '.hbs',
//     defaultLayout: 'main' // Layout chính
// }));

// app.set('view engine', 'hbs');
// app.set('views', path.join(__dirname, 'src', 'views'))

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use('/', resRoutes);

app.use('/', attractionRoutes);

app.use('/', holRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});