const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");

exports.login = async (req, res) => {
  const { username, password } = req.body;

  const userRes = await db.query(
    "SELECT * FROM users WHERE username=$1",
    [username]
  );

  const user = userRes.rows[0];

  if (!user) return res.status(400).json({ error: "User not found" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: "Wrong password" });

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  res.json({ token });
};