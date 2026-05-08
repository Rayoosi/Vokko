require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

/* ---------------- CORS ---------------- */

const corsOptions = {
  origin: "https://vokko-tawny.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization"
  ],
  credentials: true
};

app.use(cors(corsOptions));

/* ---------------- MANUAL HEADERS ---------------- */

app.use((req, res, next) => {

  res.header(
    "Access-Control-Allow-Origin",
    "https://vokko-tawny.vercel.app"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {

    return res.sendStatus(200);
  }

  next();
});

/* ---------------- JSON ---------------- */

app.use(express.json());

console.log("🚀 Vokko Backend RUNNING");

/* ---------------- ROUTES ---------------- */

app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/tasks", require("./routes/tasks"));
app.use("/admin", require("./routes/admin"));
app.use("/missions", require("./routes/missions"));

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