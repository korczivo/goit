const {fetchTasks, fetchTask, insertTask, updateTask, removeTask} = require("./services");
const getAllTasks = async (req, res, next) => {
    try{
        const tasks = await fetchTasks();
        res.json(tasks);
    } catch (error) {
        next(error)
    }
}

const getTask = async (req, res, next) => {
    try {
        const task = await fetchTask(req.params.id);
        if(task){
            res.json({
                ...task.toObject(),
                html: task.htmlify(),
            });
        } else {
            next()
        }
    } catch (error) {
        next(error)
    }
}

const createTask = async (req, res, next) => {
    const { title, text } = req.body;
    try {
        const result = await insertTask({ title, text });
        res.status(201).json(result);
    } catch (error) {
        next(error)
    }
}

const putTask = async (req, res, next) => {
    const {id} = req.params;
    try {
        const result = await updateTask({id, toUpdate: req.body, upsert: true })
        res.json(result);
    } catch (error) {
        next(error)
    }
}
const patchTask = async (req, res, next) => {
    const {id} = req.params;
    try {
        const result = await updateTask({id, toUpdate: req.body})
        if(!result) {
            next()
        } else {
            res.json(result);
        }
    } catch (error) {
        next(error)
    }
}

const deleteTask = async (req, res, next) => {
    const {id} = req.params;
    try {
        await removeTask(id)
        res.status(204).send({message: 'Task deleted'});
    } catch (error) {
        next(error)
    }
}

module.exports = { getAllTasks, getTask, createTask, patchTask, putTask, deleteTask };