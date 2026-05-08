require("dotenv").config();

console.log("STRIPE KEY:");
console.log(process.env.STRIPE_SECRET_KEY);

const express = require("express");
const cors = require("cors");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());
app.use(express.json());

console.log("🚀 SaaS v10 RUNNING");

/* ---------------- ROUTES ---------------- */

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/tasks", require("./routes/tasks"));
app.use("/webhook", require("./routes/webhook"));
app.use("/admin", require("./routes/admin"));
app.use("/missions", require("./routes/missions"));
app.use("/billing", require("./routes/billing"));

/* ---------------- HEALTH CHECK ---------------- */

app.get("/", (req, res) => {
  res.json({
    status: "SaaS v10 active 🚀",
    time: new Date()
  });
});

/* ---------------- SERVER ---------------- */

app.listen(3000, () => {
  console.log("🔥 Server running http://localhost:3000");
});