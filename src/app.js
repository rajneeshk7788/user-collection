const express = require('express');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');

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

module.exports = app;