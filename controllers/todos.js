const Todo = require('../models/Todo');

// Get all todos
exports.getAllTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteMultipleTodos = async (req, res) => {
    try {
        const { ids } = req.body;

        const result = await Todo.deleteMany({
            _id: { $in: ids }
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'No todos found to delete'
            });
        }

        res.json({
            success: true,
            message: `Deleted ${result.deletedCount} todos`
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: 'Server error during bulk deletion'
        });
    }
};

// Create new todo
exports.createTodo = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }

    try {
        const newTodo = new Todo({ title });
        const savedTodo = await newTodo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        // res.status(400).json({ message: err.message });
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// Get single todo
exports.getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update todo
exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        // res.status(400).json({ message: err.message });
        res.status(400).json({
            success: false,
            message: err.message
        });
    }
};

// Delete todo
exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json({ message: 'Todo deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};