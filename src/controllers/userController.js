const mongoose = require('mongoose');
const User = require('../models/User');

async function listUsers(request, response) {
  const users = await User.find().sort({ createdAt: -1 });
  response.status(200).json({ data: users });
}

async function getUser(request, response) {
  const user = await User.findById(request.params.id);
  if (!user) return response.status(404).json({ error: 'User not found' });
  response.status(200).json({ data: user });
}

async function createUser(request, response) {
  const body = request.body ?? {};
  const user = await User.create({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    phone: body.phone,
    age: body.age,
  });
  response.status(201).json({ data: user });
}

async function updateUser(request, response) {
  const body = request.body ?? {};
  const updates = {};
  for (const field of ['firstName', 'lastName', 'email', 'phone', 'age']) {
    if (Object.hasOwn(body, field)) updates[field] = body[field];
  }

  if (Object.keys(updates).length === 0) {
    return response.status(400).json({ error: 'Provide at least one field to update' });
  }

  const user = await User.findByIdAndUpdate(request.params.id, updates, {
    new: true,
    runValidators: true,
  });
  if (!user) return response.status(404).json({ error: 'User not found' });
  response.status(200).json({ data: user });
}

async function deleteUser(request, response) {
  const user = await User.findByIdAndDelete(request.params.id);
  if (!user) return response.status(404).json({ error: 'User not found' });
  response.status(204).end();
}

function validateUserId(request, response, next) {
  if (!mongoose.isValidObjectId(request.params.id)) {
    return response.status(400).json({ error: 'Invalid user id' });
  }
  next();
}

module.exports = {
  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  validateUserId,
};