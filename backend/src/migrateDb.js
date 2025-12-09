require('dotenv').config();
const { db } = require('./db');

function migrate() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Додаємо favorite_genres, якщо колонки немає
      db.run(`
        ALTER TABLE users ADD COLUMN favorite_genres TEXT
      `, (err) => {
        if (err && !err.message.includes('duplicate column')) {
          console.error('Error adding favorite_genres:', err);
        } else {
          console.log('Column favorite_genres added or already exists');
        }
      });

      // Додаємо reading_goal, якщо колонки немає
      db.run(`
        ALTER TABLE users ADD COLUMN reading_goal INTEGER DEFAULT 60
      `, (err) => {
        if (err && !err.message.includes('duplicate column')) {
          console.error('Error adding reading_goal:', err);
          return reject(err);
        } else {
          console.log('Column reading_goal added or already exists');
          resolve();
        }
      });
    });
  });
}

if (require.main === module) {
  migrate()
    .then(() => {
      console.log('Migration completed');
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

