const { createTodoSchema, updateTodoSchema, deleteMultipleSchema } = require('../validators/todo.validator');

const validate = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.body, { abortEarly: false });
        next();
    } catch (err) {
        const errors = err.details.map((detail) => ({
            field: detail.context.label,
            message: detail.message
        }));

        res.status(400).json({
            success: false,
            errors
        });
    }
};

module.exports = {
    validateCreateTodo: validate(createTodoSchema),
    validateUpdateTodo: validate(updateTodoSchema),
    validateDeleteMultiple: validate(deleteMultipleSchema)
};