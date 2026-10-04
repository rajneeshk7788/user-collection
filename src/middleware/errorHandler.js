function errorHandler(error, request, response, next) {
  if (response.headersSent) return next(error);

  if (error instanceof SyntaxError && error.status === 400 && 'body' in error) {
    return response.status(400).json({ error: 'Invalid JSON body' });
  }

  if (error.code === 11000) {
    return response.status(409).json({ error: 'A user with this email already exists' });
  }

  if (error.name === 'ValidationError') {
    const details = Object.values(error.errors).map((item) => item.message);
    return response.status(400).json({ error: 'Validation failed', details });
  }

  if (error.name === 'CastError') {
    return response.status(400).json({ error: 'Invalid value' });
  }

  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
}

module.exports = errorHandler;