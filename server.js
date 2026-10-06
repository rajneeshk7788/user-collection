require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./src/routes/taskRoutes');
const userRoutes = require('./src/routes/userRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

app.use(express.json({ limit: '10kb' }));

app.get('/health', (request, response) => {
  response.status(200).json({ status: 'ok' });
});

app.use('/api/tasks', taskRoutes);
app.use('/api/users', userRoutes);

app.use((request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);

const port = Number(process.env.PORT) || 3000;
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/tasks_api';

async function start() {
  try {
    await mongoose.connect(mongoUri);
    app.listen(port, () => {
      console.log(`API listening on port ${port}`);
    });
  } catch (error) {
    console.error('Could not connect to MongoDB:', error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  start();
}

module.exports = app;