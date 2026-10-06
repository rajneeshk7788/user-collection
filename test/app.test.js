const assert = require('node:assert/strict');
const test = require('node:test');
const request = require('supertest');
const app = require('../server');

test('GET /health returns the API status', async () => {
  const response = await request(app).get('/health');

  assert.equal(response.status, 200);
  assert.deepEqual(response.body, { status: 'ok' });
});

test('unknown routes return 404', async () => {
  const response = await request(app).get('/not-a-route');

  assert.equal(response.status, 404);
  assert.deepEqual(response.body, { error: 'Route not found' });
});

test('POST /api/tasks without a body returns a validation error', async () => {
  const response = await request(app).post('/api/tasks');

  assert.equal(response.status, 400);
  assert.equal(response.body.error, 'Validation failed');
});

test('POST /api/users without required details returns a validation error', async () => {
  const response = await request(app).post('/api/users').send({});

  assert.equal(response.status, 400);
  assert.equal(response.body.error, 'Validation failed');
});

test('user routes reject malformed ids', async () => {
  const response = await request(app).get('/api/users/not-an-id');

  assert.equal(response.status, 400);
  assert.deepEqual(response.body, { error: 'Invalid user id' });
});