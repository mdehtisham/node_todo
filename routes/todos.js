const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todos');
const {
    validateCreateTodo,
    validateUpdateTodo,
    validateDeleteMultiple
} = require('../middlewares/validate');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/', todoController.getAllTodos);
router.post('/', validateCreateTodo, todoController.createTodo);
router.get('/:id', todoController.getTodo);
router.put('/:id', validateUpdateTodo, todoController.updateTodo);
router.delete('/:id', todoController.deleteTodo);
router.delete('/',
    validateDeleteMultiple,
    todoController.deleteMultipleTodos
);

module.exports = router;