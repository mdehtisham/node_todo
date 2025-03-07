const Joi = require('joi');

// Validation schema for creating a todo
const createTodoSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required()
        .messages({
            'string.empty': 'Title cannot be empty',
            'string.min': 'Title must be at least {#limit} characters',
            'string.max': 'Title cannot exceed {#limit} characters',
            'any.required': 'Title is required'
        }),
    completed: Joi.boolean()
});

// Validation schema for updating a todo
const updateTodoSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100),
    completed: Joi.boolean()
}).min(1); // At least one field to update

const deleteMultipleSchema = Joi.object({
    ids: Joi.array()
        .items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
        .required()
        .messages({
            'array.base': 'IDs must be an array',
            'array.empty': 'At least one ID is required',
            'string.pattern.base': 'Invalid ID format'
        })
});

module.exports = {
    createTodoSchema,
    updateTodoSchema,
    deleteMultipleSchema
};