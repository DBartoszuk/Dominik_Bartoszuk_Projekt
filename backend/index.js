const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const connectDB = require('./database');

const app = express();
const PORT = 8080;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

//Korzystanie z routera
app.use('/api', routes);

// Połączenie z bazą danych MongoDB
connectDB().then(() => {
    // Połączenie udane, uruchomienie serwera
    app.listen(PORT, () => {
        console.log(`Serwer dziala na porcie ${PORT}`);
    });
}).catch(err => {
    console.error('Nie połączono z bazą danych', err);
    process.exit();
});

// app.listen(PORT, () => {
//     console.log(`Serwer dziala na porcie ${PORT}`);
//   });
