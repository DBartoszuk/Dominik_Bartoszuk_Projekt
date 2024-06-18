const express = require("express");
const path = require('path');
const { registerUser } = require('../controllers/AddUserController');
const { addTask } = require('../controllers/AddTaskController');
const { deleteTask } = require('../controllers/DeleteTaskController');
const { editTask } = require('../controllers/EditTaskController');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const Task = require('../models/task');
const bcrypt = require('bcryptjs');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Proba!')
})

//Middlewares
// Walidacja danych wejściowych dla rejestracji użytkownika
const validateUser = [
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 5 characters long.'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 6 characters long.'),
    body('email').isEmail().withMessage('Invalid email address.')
];
// Sprawdzenie czy użytkownik już istnieje w bazie
const checkIfUserExist = async (username, email) => {
    const nameCheck = await User.findOne({username});
    const emailCheck = await User.findOne({email});
    if(nameCheck || emailCheck) return true;
    else return false;
}
//Pobieranie ID zalogowanego użytkownika
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).send({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'secret_token');
        req.userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
};

// Endpoint rejestracji nowego użytkownika
router.post('/register', validateUser, async (req, res) => {
    const {username, email} = req.body;
    const userExists = await checkIfUserExist(username, email);
    if(!userExists){
        await registerUser(req, res);
    }
    else{
        res.status(500).send({message: "This username is already in use"})
    }
  });

router.post('/login', async (req, res) => {
    const {username, password} = req.body;
    try{
        // Znajdź użytkownika po username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).send({ message: 'Invalid username or password' });
        }
        // Sprawdź hasło
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({ message: 'Invalid username or password' });
        }
        //Zwrócenie sukcesu i tokena
        const token = jwt.sign({id: user._id}, 'secret_token', { expiresIn: '1h' });
        res.status(200).send({ token });


    } catch(error){
        console.log(error);
        res.status(500).send({message: "Error when logging in"});
    }
})

// Trasa do pobierania danych użytkownika
// router.get('/user', verifyToken, async (req, res) => {
//     try {
//         const userId = req.userId;
        
//         // Wyszukujemy użytkownika w bazie danych
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).send({ message: 'User not found' });
//         }
//         res.status(200).json({ username: user.username });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ message: 'Internal Server Error' });
//     }
// });

router.get('/tasks', authenticateToken, async (req, res) => {
    try {
      //Pobieranie danych z bazy
      const tasks = await Task.find({ userID: req.userId });
      //const tasks = await Task.find({});
      // Wysłanie odpowiedzi z danymi
      res.json(tasks);
    } catch (error) {
      console.error('Błąd podczas pobierania zadań:', error.message);
      // Wysłanie odpowiedzi z błędem
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/tasks', async (req, res) => {
    // Kod do tworzenia nowego zadania
    try{
        const {taskname, description} = req.body;
        if(taskname == "") res.status(400).send({message: "No name"});
        if(description == "") res.status(400).send({message: "No description"});
        await addTask(req, res);
    } catch(errors){
        console.log(errors);
        res.status(500).send({message: "Error when adding new task"});
    }
});

router.put('/tasks/:id', async (req, res) => {
    // Kod do aktualizacji zadania
    try {
        const {taskname, description} = req.body;
        if(taskname == "") res.status(400).send({message: "No name"});
        if(description == "") res.status(400).send({message: "No description"});
        await editTask(req, res); 
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete('/tasks', async (req, res) => {
    // Kod do usuwania zadania
    try {
        await deleteTask(req, res);  // Pobierz ID z parametrów URL
        //res.status(200).json({ message: `Zadanie o ID ${req.params.id} usunięte` });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;