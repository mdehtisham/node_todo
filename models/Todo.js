const mongoose = require('mongoose');

// models/Todo.js
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, 'Title must be at least 3 characters'],
        maxLength: [100, 'Title cannot exceed 100 characters'],
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
});

module.exports = mongoose.model('Todo', todoSchema);