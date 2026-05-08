require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

/* ---------------- MIDDLEWARE ---------------- */

app.use(
  cors({
    origin: [
      "https://vokko-tawny.vercel.app"
    ],
    credentials: true
  })
);

/* ---------------- PREFLIGHT ---------------- */

app.options("/*", cors());

/* ---------------- JSON ---------------- */

app.use(express.json());

console.log("🚀 Vokko Backend RUNNING");

/* ---------------- ROUTES ---------------- */

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/tasks", require("./routes/tasks"));
app.use("/admin", require("./routes/admin"));
app.use("/missions", require("./routes/missions"));

/* ---------------- STRIPE DISABLED ---------------- */

// app.use("/webhook", require("./routes/webhook"));
// app.use("/billing", require("./routes/billing"));

/* ---------------- HEALTH CHECK ---------------- */

app.get("/", (req, res) => {

  res.json({
    status: "Vokko backend active 🚀",
    time: new Date()
  });
});

/* ---------------- SERVER ---------------- */

const PORT =
  process.env.PORT || 3000;

app.listen(PORT, () => {

  console.log(
    `🔥 Server running on port ${PORT}`
  );
});