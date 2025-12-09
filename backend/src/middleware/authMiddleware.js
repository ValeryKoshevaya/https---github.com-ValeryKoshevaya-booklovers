const jwt = require('jsonwebtoken');

function authRequired(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Необхідна авторизація' });
  }

  const secret = process.env.JWT_SECRET || 'dev_secret';

  try {
    const payload = jwt.verify(token, secret);
    req.user = { id: payload.id };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Недійсний або прострочений токен' });
  }
}

module.exports = { authRequired };
