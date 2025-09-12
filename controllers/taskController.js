const mongoose = require('mongoose');
const Task = require('../models/task.model');

mongoose.connect('mongodb://127.0.0.1:27017/miniProjet')
.then(() => console.log("Connected to MongoDB"))
.catch(error => console.error('Connexion Error MongoDB :', error));

const [,, command, ...args] = process.argv;

async function addTask(title, description, status, priority) {
    const task = new Task({title, description, status, priority});
    await task.save();
    //console.log("helooooooooooooooooo9");
    console.log("Task added:", task);
}

async function listTasks() {
    const tasks = await Task.find();
    console.log("Tasks liste's:"/* + tasks*/);
    tasks.forEach(t => {
        console.log(`- ${t.title} [${t.description}] [${t.status}] (Priorite: ${t.priority})`);
        //console.log(tasks);
    });
}

async function updateTask(id, newTitle, newStatus) {
    const task = await Task.findByIdAndUpdate(
        id,
        {title: newTitle, status: newStatus},
        {new: true}
    );
    consol.log("Task Updated:", task);
}

async function deleteTask(title) {
    const result = await Task.findOneAndDelete( {title: title});
    if (result) {
        console.log(`Tache "${title}" suprimee.`);
    } else {
        console.log(`Acune tache trouvee ayant pour titre "${title}".`);
    }
}

//console.log("helooooooooooooooooo2");

async function runTask() {
    try {
        if (command === 'add') {
            const [title, description, status, priority] = args;
//            console.log("helooooooooooooooooo3");
            await addTask(title, description, status, priority);
//            console.log("helooooooooooooooooo4");
        } else if (command === 'list') {
            await listTasks();
        } else if (command === 'update') {
            const [id, newTitle, newStatus] = args;
            await updateTask(id, newTitle, newStatus);
        } else if (command === 'delete') {
            const [title] = args;
            await deleteTask(title);
        } else {
            console.log("Commande inconnue");
        }
    } catch (error) {
        console.error("Erreur:", error.message);
    } finally {
        mongoose.connection.close();
    }
}

runTask();

module.exports = runTask();
