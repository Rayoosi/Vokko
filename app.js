require("dotenv").config();

const express = require("express");

const app = express();

/* ---------------- TEST ROUTE ---------------- */

app.get("/", (req, res) => {

  res.json({
    status: "Backend works 🚀"
  });

});

/* ---------------- SERVER ---------------- */

const PORT =
  process.env.PORT || 3000;

app.listen(
  PORT,
  "0.0.0.0",
  () => {

    console.log(
      `🔥 Server running on ${PORT}`
    );

  }
);