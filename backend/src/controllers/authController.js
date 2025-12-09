const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { db } = require("../db");

exports.register = (req, res) => {
  const { email, password, name } = req.body;
  console.log("Registering user:", email);
  console.log("With name:", name);
  console.log("And password:", password ? "****" : "(no password)");

  if (!email || !password)
    return res.status(400).json({ error: "Email and password required" });

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "DB error" });
    }
    
    if (user) return res.status(409).json({ error: "User already exists" });

    const hash = await bcrypt.hash(password, 10);

    db.run(
      "INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)",
      [email, hash, name || ""],
      async function (err) {
        if (err) {
          console.error("Insert error:", err);
          return res.status(500).json({ error: "DB error" });
        }

        const userId = this.lastID;
        
        // Створюємо токен для нового користувача
        const token = jwt.sign(
          { id: userId },
          process.env.JWT_SECRET || "dev_secret",
          { expiresIn: "7d" }
        );

        return res.json({
          token,
          user: {
            id: userId,
            email: email,
            name: name || "",
            username: null,
            bio: null,
            avatarUrl: null
          }
        });
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, user) => {
    if (err) {
      console.error("DB error:", err);
      return res.status(500).json({ error: "DB error" });
    }
    
    if (!user) return res.status(404).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "dev_secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  });
};
