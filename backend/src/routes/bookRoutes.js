const express = require("express");
const router = express.Router();

const { authRequired } = require("../middleware/authMiddleware");
const { getMyBooks, createBook, updateBook, getReadingStats } = require("../controllers/bookController");

// отримати всі книги користувача
router.get("/", authRequired, getMyBooks);

// отримати статистику читання
router.get("/stats", authRequired, getReadingStats);

// створити нову книгу
router.post("/", authRequired, createBook);

// оновити книгу (прогрес, статус)
router.put("/:id", authRequired, updateBook);

module.exports = router;
