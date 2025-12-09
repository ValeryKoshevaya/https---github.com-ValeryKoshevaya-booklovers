require('dotenv').config();
const { db } = require('./db');

function runMigrations() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          name TEXT,
          username TEXT,
          bio TEXT,
          avatar_url TEXT,
          favorite_genres TEXT,
          reading_goal INTEGER DEFAULT 60,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Error creating users table:', err);
          return reject(err);
        }
        console.log('Users table created/verified');
      });

      db.run(`
        CREATE TABLE IF NOT EXISTS books (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          title TEXT NOT NULL,
          author TEXT,
          description TEXT,
          is_read INTEGER DEFAULT 0,
          pages_read INTEGER DEFAULT 0,
          total_pages INTEGER,
          finished_at DATETIME,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `, (err) => {
        if (err) {
          console.error('Error creating books table:', err);
          return reject(err);
        }
        console.log('Books table created/verified');
        resolve();
      });
    });
  });
}

async function initDb() {
  await runMigrations();
}

if (require.main === module) {
  initDb()
    .then(() => {
      console.log('DB initialized');
      process.exit(0);
    })
    .catch((err) => {
      console.error('DB init failed', err);
      process.exit(1);
    });
}

module.exports = { initDb };
