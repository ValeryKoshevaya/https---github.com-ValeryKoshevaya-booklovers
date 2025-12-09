const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbFile = path.join(process.cwd(), 'backenddb.sqlite');

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error('Could not connect to sqlite database', err);
  } else {
    console.log('Connected to sqlite database');
  }
});

module.exports = { db };
