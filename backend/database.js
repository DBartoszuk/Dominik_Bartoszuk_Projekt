const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const mongoURI = /*process.env.MONGODB_URI || */'mongodb://localhost:27017/baza_zadan';

        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('Połączono z MongoDB...');
    } catch (err) {
        console.error(err.message);
        console.log("Połączenie z MongoDB zawiodło!")
        process.exit(1);
    }
};

module.exports = connectDB;
