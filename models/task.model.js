const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    
    description: {
        type: String,
        required: true
    },
    
    status: {
        type: String,
        eunum: ["en cours", "terminer", "a faire"],
        default: "en cours"
    },
    
    priority: {
        type: String,
        eunum: ["basse", "moyenne", "haute"],
        default: "basse"
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Projects",
        required: true
    }
});

const Task = mongoose.model('Tasks', taskSchema);

module.exports = Task;
