const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {type: String, require: true},
    description: {type: String, required: true},
    createdAt: {type: Date, default: Date.now}
})

const Project = mongoose.model('Projects', projectSchema);

module.exports = Project;