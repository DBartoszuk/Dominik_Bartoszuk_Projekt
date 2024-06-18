const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    taskname: String,
    description: String,
    priority: Number,
    date: Date,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
})

module.exports = mongoose.model('Task', TaskSchema);