const db = require("../config/db");

exports.getTasks = async (req, res) => {
  const tasks = await db.query("SELECT * FROM tasks");
  res.json(tasks.rows);
};

exports.completeTask = async (req, res) => {
  const { task_id } = req.body;

  const task = await db.query(
    "SELECT reward FROM tasks WHERE id=$1",
    [task_id]
  );

  if (!task.rows.length)
    return res.status(404).json({ error: "Task not found" });

  const reward = task.rows[0].reward;

  await db.query(
    "INSERT INTO user_tasks (user_id, task_id) VALUES ($1,$2)",
    [req.user.id, task_id]
  );

  await db.query(
    "INSERT INTO points_transactions (user_id,type,amount) VALUES ($1,$2,$3)",
    [req.user.id, "task", reward]
  );

  res.json({ reward });
};