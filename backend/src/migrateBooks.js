require('dotenv').config();
const { db } = require('./db');

function migrate() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Додаємо is_read, якщо колонки немає
      db.run(`
        ALTER TABLE books ADD COLUMN is_read INTEGER DEFAULT 0
      `, (err) => {
        if (err && !err.message.includes('duplicate column')) {
          console.error('Error adding is_read:', err);
        } else {
          console.log('Column is_read added or already exists');
        }
      });

      // Додаємо pages_read
      db.run(`
        ALTER TABLE books ADD COLUMN pages_read INTEGER DEFAULT 0
      `, (err) => {
        if (err && !err.message.includes('duplicate column')) {
          console.error('Error adding pages_read:', err);
        } else {
          console.log('Column pages_read added or already exists');
        }
      });

      // Додаємо total_pages
      db.run(`
        ALTER TABLE books ADD COLUMN total_pages INTEGER
      `, (err) => {
        if (err && !err.message.includes('duplicate column')) {
          console.error('Error adding total_pages:', err);
        } else {
          console.log('Column total_pages added or already exists');
        }
      });

      // Додаємо finished_at
      db.run(`
        ALTER TABLE books ADD COLUMN finished_at DATETIME
      `, (err) => {
        if (err && !err.message.includes('duplicate column')) {
          console.error('Error adding finished_at:', err);
          return reject(err);
        } else {
          console.log('Column finished_at added or already exists');
          resolve();
        }
      });
    });
  });
}

if (require.main === module) {
  migrate()
    .then(() => {
      console.log('Books migration completed');
      db.close();
      process.exit(0);
    })
    .catch((err) => {
      console.error('Migration failed:', err);
      db.close();
      process.exit(1);
    });
}

module.exports = { migrate };

