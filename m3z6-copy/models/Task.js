const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        minLength: 2,
        maxLength: 100,
    },
    text: {
        type: String,
        required: [true, 'Text is required'],
        minLength: 2,
        maxLength: 1000,
    },
    done: {
        type: Boolean,
        default: false,
    },
}, {
    versionKey: false,
    timestamps: true,
});

taskSchema.index({ title: 1, text: -1 });
// taskSchema.index({ orderId: 1, orderDate: -1, price: 1 });
// find({orderId: 1}, price: {$gte: 100, $lte: 200}).sort({orderDate: -1});

taskSchema.statics.getAll = function () {
    return Task.find().lean();
}

taskSchema.methods.htmlify = function () {
    return `<h3>${this.title}</h3><p>${this.text}</p>`;
}

const Task = mongoose.model('task', taskSchema, 'tasks');

module.exports = Task;