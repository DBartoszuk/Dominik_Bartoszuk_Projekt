const { validationResult } = require('express-validator');
const Task = require('../models/task');

async function editTask(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {id, taskname, description, priority, date} = req.body;
    try{
        const updatedTask = await Task.findByIdAndUpdate(id, 
            {taskname, description, priority, date}, 
            { new: true });

        if (!updatedTask) {
            return res.status(404).send('Task not found');
        }
        // Zwrot odpowiedzi z nowym zadaniem
        return res.status(201).json(updatedTask);
    } catch(error){
        console.log("Error when adding new task: ", error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {editTask};