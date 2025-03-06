const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todos');
const {
    validateCreateTodo,
    validateUpdateTodo
} = require('../middlewares/validate');

router.get('/', todoController.getAllTodos);
router.post('/', validateCreateTodo, todoController.createTodo);
router.get('/:id', todoController.getTodo);
router.put('/:id', validateUpdateTodo, todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;