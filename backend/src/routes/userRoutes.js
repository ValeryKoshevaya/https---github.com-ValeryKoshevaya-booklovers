const express = require("express");
const router = express.Router();

const { authRequired } = require("../middleware/authMiddleware");
const { getMe, updateMe, uploadAvatar } = require("../controllers/userController");

// GET /me - отримати дані користувача
router.get("/me", authRequired, getMe);

// PUT /me - оновити дані користувача
router.put("/me", authRequired, updateMe);

// POST /me/avatar - оновити аватар
// тут uploadMiddleware має бути перед uploadAvatar (multer)
const multer = require("multer");
const upload = multer({ dest: "uploads/avatars" });

router.post("/me/avatar", authRequired, upload.single("avatar"), uploadAvatar);

module.exports = router;
