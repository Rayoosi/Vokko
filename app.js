require("dotenv").config();

const express = require("express");
const cors = require("cors");
const paymentRoutes =
require("./routes/payment");

const app = express();

/* ---------------- CORS ---------------- */

app.use(
  cors({
    origin: [
      "https://vokko-tawny.vercel.app"
    ],
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS"
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ],
    credentials: true
  })
);

/* ---------------- JSON ---------------- */

app.use(express.json());

console.log("🚀 Vokko Backend RUNNING");

/* ---------------- ROUTES ---------------- */

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/tasks", require("./routes/tasks"));
app.use("/admin", require("./routes/admin"));
app.use("/missions", require("./routes/missions"));
app.use("/api/payment", paymentRoutes);
app.use(
  "/withdrawals",
  require("./routes/withdrawals")
);

/* ---------------- HOME ---------------- */

app.get("/", (req, res) => {

  res.status(200).json({
    ok: true,
    message: "Vokko backend active 🚀",
    time: new Date()
  });

});

/* ---------------- 404 ---------------- */

app.use((req, res) => {

  res.status(404).json({
    error: "Route not found"
  });

});

/* ---------------- ERROR HANDLER ---------------- */

app.use((err, req, res, next) => {

  console.error("❌ Server Error:", err);

  res.status(500).json({
    error: err.message || "Internal Server Error"
  });

});

/* ---------------- SERVER ---------------- */

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {

  console.log(
    `🔥 Server running on port ${PORT}`
  );

});