const Task = require("../../models/Task");
const fetchTasks = () => {
    return Task.getAll();
}

const fetchTask = (id) => {
    return Task.findById({ _id: id })
}

const insertTask = ({ title, text }) => {
    return Task.create({ title, text });
}

// const updateTask = async ({ id, toUpdate }) => {
//     const task = await Task.findById({ _id: id });
//     if(!task) return null;
//
//     Object.keys(toUpdate).forEach((value) => {
//         task[value] = toUpdate[value];
//     });
//
//     await task.save();
//
//     return task;
// }

const updateTask = async ({ id, toUpdate, upsert = false }) => {
    return Task.findByIdAndUpdate(
        {_id: id },
        {$set: toUpdate},
        { new: true, runValidators: true, strict: 'throw', upsert}
    );
}

const removeTask = (id) => Task.deleteOne({ _id: id })


module.exports = { fetchTasks, fetchTask, insertTask, updateTask, removeTask };