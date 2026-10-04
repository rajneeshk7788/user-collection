require('dotenv').config();

const mongoose = require('mongoose');
const app = require('./app');

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

start();