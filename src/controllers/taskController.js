const mongoose = require('mongoose');
const Task = require('../models/Task');

async function listTasks(request, response) {
  const filter = {};

  if (request.query.completed !== undefined) {
    if (!['true', 'false'].includes(request.query.completed)) {
      return response.status(400).json({ error: 'completed must be true or false' });
    }
    filter.completed = request.query.completed === 'true';
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  response.status(200).json({ data: tasks });
}

async function getTask(request, response) {
  const task = await Task.findById(request.params.id);
  if (!task) return response.status(404).json({ error: 'Task not found' });
  response.status(200).json({ data: task });
}

async function createTask(request, response) {
  const body = request.body ?? {};
  const task = await Task.create({
    title: body.title,
    description: body.description,
  });
  response.status(201).json({ data: task });
}

async function updateTask(request, response) {
  const updates = {};
  const body = request.body ?? {};
  for (const field of ['title', 'description', 'completed']) {
    if (Object.hasOwn(body, field)) updates[field] = body[field];
  }

  if (Object.keys(updates).length === 0) {
    return response.status(400).json({ error: 'Provide at least one field to update' });
  }

  const task = await Task.findByIdAndUpdate(request.params.id, updates, {
    new: true,
    runValidators: true,
  });
  if (!task) return response.status(404).json({ error: 'Task not found' });
  response.status(200).json({ data: task });
}

async function deleteTask(request, response) {
  const task = await Task.findByIdAndDelete(request.params.id);
  if (!task) return response.status(404).json({ error: 'Task not found' });
  response.status(204).end();
}

function validateTaskId(request, response, next) {
  if (!mongoose.isValidObjectId(request.params.id)) {
    return response.status(400).json({ error: 'Invalid task id' });
  }
  next();
}

module.exports = {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  validateTaskId,
};