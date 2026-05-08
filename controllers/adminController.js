const db = require("../config/db");

exports.getUsers = async (req, res) => {
  const users = await db.query(
    "SELECT id, username, role FROM users"
  );

  res.json(users.rows);
};

exports.deleteUser = async (req, res) => {
  await db.query("DELETE FROM users WHERE id=$1", [req.params.id]);

  res.json({ message: "deleted" });
};