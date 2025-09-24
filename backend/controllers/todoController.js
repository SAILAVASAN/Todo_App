const Todo = require('../models/todo');
const status = require('../constants/httpscodes');
const message = require('../constants/message');

const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find().sort({ createdAt: -1 });
        return res.status(status.HTTP_OK).json({ success: true, data: todos });
    } catch (error) {
        console.error(error);
        return res.status(status.HTTP_INTERNAL_SERVER_ERROR).json({ success: false, message: message.serverError });
    }
};

const createTodo = async (req, res) => {
    try {
        const { text } = req.body;
        if (!text) {
            return res.status(status.HTTP_BAD_REQUEST).json({ success: false, message: message.textRequired });
        }

        const todo = await Todo.create({ text });
        return res.status(status.HTTP_CREATED).json({ success: true, data: todo, message: message.todoCreated });
    } catch (error) {
        console.error(error);
        return res.status(status.HTTP_INTERNAL_SERVER_ERROR).json({ success: false, message: message.serverError });
    }
};

const toggleTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.query.id)
        if (!todo) {
            return res.status(status.HTTP_NOT_FOUND).json({ success: false, message: message.todoNotFound });
        }

        todo.completed = !todo.completed;
        await todo.save();
        return res.status(status.HTTP_OK).json({ success: true, data: todo, message: message.todoUpdated });
    } catch (error) {
        console.error(error);
        return res.status(status.HTTP_INTERNAL_SERVER_ERROR).json({ success: false, message: message.serverError });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.query.id)
        if (!todo) {
            return res.status(status.HTTP_NOT_FOUND).json({ success: false, message: message.todoNotFound });
        }

        return res.status(status.HTTP_OK).json({ success: true, message: message.todoDeleted });
    } catch (error) {
        console.error(error);
        return res.status(status.HTTP_INTERNAL_SERVER_ERROR).json({ success: false, message: message.serverError });
    }
};

module.exports = {
    getTodos,
    createTodo,
    toggleTodo,
    deleteTodo,
};
