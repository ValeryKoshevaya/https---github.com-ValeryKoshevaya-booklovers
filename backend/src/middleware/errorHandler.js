function errorHandler(err, req, res, next) {
  console.error('Error handler:', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({
    message: err.message || 'Внутрішня помилка сервера',
  });
}

module.exports = { errorHandler };
