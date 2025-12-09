const path = require('path');
const { db } = require('../db');

function mapUser(row, req) {
  if (!row) return null;

  let avatarUrl = row.avatar_url;
  if (avatarUrl && !avatarUrl.startsWith('http')) {
    const base = `${req.protocol}://${req.get('host')}`;
    avatarUrl = `${base}${avatarUrl.startsWith('/') ? '' : '/'}${avatarUrl}`;
  }

  let favoriteGenres = [];
  if (row.favorite_genres) {
    try {
      favoriteGenres = JSON.parse(row.favorite_genres);
    } catch (e) {
      favoriteGenres = [];
    }
  }

  return {
    id: row.id,
    email: row.email,
    name: row.name,
    username: row.username,
    bio: row.bio,
    avatarUrl,
    favoriteGenres,
    readingGoal: row.reading_goal || 60,
  };
}

function getMe(req, res, next) {
  const userId = req.user.id;
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.get(sql, [userId], (err, row) => {
    if (err) return next(err);
    if (!row) return res.status(404).json({ message: 'Користувача не знайдено' });
    res.json(mapUser(row, req));
  });
}

function updateMe(req, res, next) {
  const userId = req.user.id;
  const { name, username, bio, favoriteGenres, readingGoal } = req.body;

  // Конвертуємо масив жанрів в JSON
  let favoriteGenresJson = null;
  if (favoriteGenres && Array.isArray(favoriteGenres)) {
    favoriteGenresJson = JSON.stringify(favoriteGenres);
  }

  const sql = `
    UPDATE users
    SET name = COALESCE(?, name),
        username = COALESCE(?, username),
        bio = COALESCE(?, bio),
        favorite_genres = COALESCE(?, favorite_genres),
        reading_goal = COALESCE(?, reading_goal)
    WHERE id = ?
  `;

  db.run(sql, [name, username, bio, favoriteGenresJson, readingGoal, userId], function (err) {
    if (err) return next(err);

    db.get('SELECT * FROM users WHERE id = ?', [userId], (err2, row) => {
      if (err2) return next(err2);
      res.json(mapUser(row, req));
    });
  });
}

function uploadAvatar(req, res, next) {
  const userId = req.user.id;

  if (!req.file) {
    return res.status(400).json({ message: 'Файл аватарки не завантажено' });
  }

  const relativePath = path.join('uploads', 'avatars', req.file.filename);
  const dbPath = '/' + relativePath.replace(/\\/g, '/');

  const sql = 'UPDATE users SET avatar_url = ? WHERE id = ?';

  db.run(sql, [dbPath, userId], function (err) {
    if (err) return next(err);

    db.get('SELECT * FROM users WHERE id = ?', [userId], (err2, row) => {
      if (err2) return next(err2);

      const user = mapUser(row, req);
      res.json({
        message: 'Аватарку оновлено',
        user,
      });
    });
  });
}

module.exports = { getMe, updateMe, uploadAvatar };
