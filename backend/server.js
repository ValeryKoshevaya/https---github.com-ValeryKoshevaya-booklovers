require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const multer = require("multer");
const upload = multer();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Логування запитів для дебагу
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

const { initDb } = require('./src/initDb');
const { db } = require('./src/db');
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const bookRoutes = require('./src/routes/bookRoutes');
const { errorHandler } = require('./src/middleware/errorHandler');

const PORT = process.env.PORT || 3001;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';



// CORS configuration - для розробки дозволяємо всі джерела
app.use(cors({
  origin: true, // Дозволяє всі джерела в розробці
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// Root endpoint для тестування
app.get('/', (req, res) => {
  res.json({ 
    message: 'BookLovers Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login'
      },
      users: {
        me: 'GET /api/users/me',
        update: 'PUT /api/users/me',
        avatar: 'POST /api/users/me/avatar'
      },
      books: {
        list: 'GET /api/books',
        create: 'POST /api/books'
      }
    }
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);

app.use(errorHandler);

initDb()
  .then(() => {
    console.log('Database initialized successfully');
    
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
      console.log(`✅ Server also accessible on http://127.0.0.1:${PORT}`);
      console.log(`✅ CORS enabled for: ${CLIENT_ORIGIN}`);
      console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use!`);
        console.error(`   Try changing PORT in .env file or kill the process using port ${PORT}`);
      } else {
        console.error('❌ Server error:', err);
      }
      process.exit(1);
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        db.close((err) => {
          if (err) console.error('Error closing database:', err);
          else console.log('Database connection closed');
          process.exit(0);
        });
      });
    });

    process.on('SIGINT', () => {
      console.log('SIGINT signal received: closing HTTP server');
      server.close(() => {
        console.log('HTTP server closed');
        db.close((err) => {
          if (err) console.error('Error closing database:', err);
          else console.log('Database connection closed');
          process.exit(0);
        });
      });
    });
  })
  .catch((err) => {
    console.error('Failed to initialize database:', err);
    console.error('Server will not start without database');
    process.exit(1);
  });
