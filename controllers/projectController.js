const mongoose = require('mongoose');
const Project = require('../models/project.model');

mongoose.connect('mongodb://127.0.0.1:27017/miniProjet')
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.error('Connexion Error MongoDB :', error));

const [,, command, ...args] = process.argv;

async function addProject(title, description) {
    const project = new Project({title, description});
    await project.save();
    console.log("Project added:", project);
}

async function listProject() {
    const projects = await Project.find();

    if (projects.length === 0) {
       console.log("No project added");
       return;
    }
    console.log("Project liste's:"/* + projects*/);
    projects.forEach(p => {
        console.log(`- ${p.title} [${p.description}]`);
    });
}

async function updateProject(id, newTitle, newStatus) {
    const project = await Project.findByIdAndUpdate(
        id,
        {title: newTitle, status: newStatus},
        {new: true}
    );
    consol.log("Project Updated:", project);
}

async function deleteProject(title) {
    const result = await Project.findOneAndDelete( {title: title});
    if (result) {
        console.log(`Project "${title}" deleted`);
    } else {
        console.log(`No project found with the title "${title}".`);
    }
}

async function runProject() {
    try {
        if (command === 'add') {
            const [title, description] = args;
            await addProject(title, description);
        } else if (command === 'list') {
            await listProject();
        } else if (command === 'update') {
            const [id, newTitle, newStatus] = args;
            await updateProject(id, newTitle, newStatus);
        } else if (command === 'delete') {
            const [title] = args;
            await deleteProject(title);
        } else {
            console.log("Commande inconnue");
        }
    } catch (error) {
        console.error("Erreur:", error.message);
    } finally {
        mongoose.connection.close();
    }
}

runProject();

module.exports = runProject();