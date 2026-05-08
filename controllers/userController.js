const db = require("../config/db");

exports.me = async (req, res) => {
  const user = await db.query(
    "SELECT id, username, role FROM users WHERE id=$1",
    [req.user.id]
  );

  res.json(user.rows[0]);
};