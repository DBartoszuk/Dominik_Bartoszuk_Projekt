const { validationResult } = require('express-validator');
const Task = require('../models/task');

// Funkcja obsługująca dodanie nowego zadania
async function addTask(req, res) {
    // Sprawdzenie błędów walidacji
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {taskname, description, priority, date} = req.body;
    try{
        // Tworzenie nowego zadania
        const newTask = await Task.create({
            taskname: taskname,
            description: description,
            priority: priority,
            date: date
        });

        // Zwrot odpowiedzi z nowym zadaniem
        return res.status(201).json(newTask);
    } catch(error){
        console.log("Error when adding new task: ", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {addTask};
