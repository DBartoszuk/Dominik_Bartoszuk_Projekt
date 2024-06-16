const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Funkcja obsługująca rejestrację użytkownika
async function registerUser(req, res) {
    // Sprawdzenie błędów walidacji
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password, email } = req.body;

    try {
        console.log("W controlerze, początek try")
        // Haszowanie hasła przed zapisaniem do bazy danych
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tworzenie użytkownika w bazie danych
        const user = await User.create({
            username: username,
            password: hashedPassword,
            email: email
        });
        console.log("W kontrolerze, po utworzeniu nowego uzytkownika")

        const token = jwt.sign({id: user._id}, 'secret_token', { expiresIn: '1h' });
        console.log("W kontrolerze, po utworzeniu tokenu")
        return res.json({user, token});
    } catch (error) {
        console.error(`Błąd podczas rejestracji nowego użytkownika: ${error.message}`);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Eksport funkcji registerUser
module.exports = {registerUser};
