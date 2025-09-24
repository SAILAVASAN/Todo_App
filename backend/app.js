require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('../backend/db');
const todoRoutes = require('./routes/todoRoute');
const message = require('./constants/message')

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


connectDB(process.env.MONGO_URI);


app.use('/api/todos', todoRoutes);


app.get('/', (req, res) => {
  res.status(200).json({ success: true, message: message.ServerIsRunning });
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: message.serverError });
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
