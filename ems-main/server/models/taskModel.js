const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String },
    description: String,
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    dueDate: String,
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do',
    },
}, { timestamps: true });

module.exports = mongoose.model('Tasks', taskSchema);
