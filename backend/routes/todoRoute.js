const express = require('express');
const router = express.Router();
const { getTodos, createTodo, toggleTodo, deleteTodo } = require('../controllers/todoController');

router.get('/getTodo', getTodos);
router.post('/create', createTodo);
router.put('/update', toggleTodo);
router.delete('/delete', deleteTodo);

module.exports = router;
