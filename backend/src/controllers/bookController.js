const { db } = require('../db');

function mapBook(row) {
  if (!row) return null;
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    author: row.author,
    description: row.description,
    isRead: row.is_read === 1,
    pagesRead: row.pages_read || 0,
    totalPages: row.total_pages || null,
    finishedAt: row.finished_at,
    createdAt: row.created_at,
    progress: row.total_pages ? Math.round((row.pages_read / row.total_pages) * 100) : 0,
  };
}

function getMyBooks(req, res, next) {
  const userId = req.user.id;
  const sql = 'SELECT * FROM books WHERE user_id = ? ORDER BY created_at DESC';

  db.all(sql, [userId], (err, rows) => {
    if (err) return next(err);
    res.json(rows.map(mapBook));
  });
}

function createBook(req, res, next) {
  const userId = req.user.id;
  const { title, author, description, totalPages } = req.body;

  if (!title) {
    return res.status(400).json({ message: 'Назва книги обовʼязкова' });
  }

  const sql = 'INSERT INTO books (user_id, title, author, description, total_pages) VALUES (?, ?, ?, ?, ?)';

  db.run(sql, [userId, title, author || null, description || null, totalPages || null], function (err) {
    if (err) return next(err);

    const bookId = this.lastID;
    db.get('SELECT * FROM books WHERE id = ?', [bookId], (err2, row) => {
      if (err2) return next(err2);
      res.status(201).json(mapBook(row));
    });
  });
}

function updateBook(req, res, next) {
  const userId = req.user.id;
  const bookId = req.params.id;
  const { pagesRead, totalPages, isRead } = req.body;

  // Перевіряємо, чи книга належить користувачу
  db.get('SELECT * FROM books WHERE id = ? AND user_id = ?', [bookId, userId], (err, book) => {
    if (err) return next(err);
    if (!book) return res.status(404).json({ message: 'Книгу не знайдено' });

    let finishedAt = book.finished_at;
    if (isRead && !book.finished_at) {
      finishedAt = new Date().toISOString();
    } else if (!isRead) {
      finishedAt = null;
    }

    const sql = `
      UPDATE books 
      SET pages_read = COALESCE(?, pages_read),
          total_pages = COALESCE(?, total_pages),
          is_read = COALESCE(?, is_read),
          finished_at = ?
      WHERE id = ? AND user_id = ?
    `;

    db.run(sql, [pagesRead, totalPages, isRead ? 1 : 0, finishedAt, bookId, userId], function (err2) {
      if (err2) return next(err2);

      db.get('SELECT * FROM books WHERE id = ?', [bookId], (err3, row) => {
        if (err3) return next(err3);
        res.json(mapBook(row));
      });
    });
  });
}

function getReadingStats(req, res, next) {
  const userId = req.user.id;

  db.get(`
    SELECT 
      COUNT(*) as totalBooks,
      SUM(CASE WHEN is_read = 1 THEN 1 ELSE 0 END) as readBooks,
      SUM(pages_read) as totalPagesRead
    FROM books 
    WHERE user_id = ?
  `, [userId], (err, row) => {
    if (err) return next(err);
    res.json({
      totalBooks: row.totalBooks || 0,
      readBooks: row.readBooks || 0,
      totalPagesRead: row.totalPagesRead || 0,
    });
  });
}

module.exports = { getMyBooks, createBook, updateBook, getReadingStats };
