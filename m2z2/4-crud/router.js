const express = require('express')
const router = express.Router()

let tasks = [
    { id: 1, title: 'Work', text: 'Go to work', done: false },
]

router.get('/tasks', (req, res) => {
    res.json({
        tasks,
        taskCount: tasks.length
    })
})

router.get('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(task => task.id === id);
    if(!task) {
        res.status(404).json({
            message: 'Task no found.'
        })
        return;
    }
    res.json(task)
})

router.delete('/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const newTasks = tasks.filter(task => task.id !== id)
    tasks = [...newTasks]
    res.status(204).json('')
})

router.post('/tasks', (req, res) => {
    const {title, text} = req.body;
    const id = tasks.length + 1;
    const newTask = {
        id,
        title,
        text,
        done: false,
    }
    tasks.push(newTask)
    res.status(201).json({
        message: `Task id: ${id} created`
    })
})

router.put('/tasks/:id', (req, res) => {
    const {id} = req.params;
    const {title, text} = req.body;
    const task = tasks.find(task => task.id === parseInt(id));

    if(task) {
        task.title = title
        task.text = text
        res.status(200).json(task)
    } else {
        const newTask = {
            id: parseInt(id),
            title,
            text,
            done: false,
        }
        tasks.push(newTask)
        res.status(201).json(id)
    }
})

router.patch('/tasks/:id/status', (req, res) => {
    const {id} = req.params;
    const {done} = req.body;
    const task = tasks.find(task => task.id === parseInt(id))


    if(task){
        task.done = done;
        res.status(200).json({message: 'updated'})
    } else {
        res.status(404).json({
            message: "Task not found"
        })
    }
})

module.exports = router;