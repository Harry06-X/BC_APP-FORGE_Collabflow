const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {type: String, require: true},
    description: {type: String, required: true},
    status: {type: String, default: "en cours"},
    priority: {type: String, default: "basse"},
    createdAt: {type: Date, default: Date.now}
})

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;
