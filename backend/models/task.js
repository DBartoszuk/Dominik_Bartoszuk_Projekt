const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskname: String,
    description: String,
    priority: Number,
    date: Date
})

module.exports = mongoose.model('Task', TaskSchema);