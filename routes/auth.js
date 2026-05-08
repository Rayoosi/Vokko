require("dotenv").config();

const router = require("express").Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../config/db");

/* ---------------- REGISTER ---------------- */

router.post("/register", async (req, res) => {

  try {

    const {
      username,
      password,
      referredBy
    } = req.body;

    /* ---------------- CHECK USER ---------------- */

    const exists = await db.query(
      `
      SELECT *
      FROM users
      WHERE username=$1
      `,
      [username]
    );

    if (exists.rows.length > 0) {

      return res.status(400).json({
        error: "Username already exists"
      });
    }

    /* ---------------- HASH PASSWORD ---------------- */

    const hashedPassword =
      await bcrypt.hash(password, 10);

    /* ---------------- REFERRAL CODE ---------------- */

    const referralCode =
      username +
      Math.floor(Math.random() * 1000);

    let referredById = null;

    /* ---------------- FIND REFERRER ---------------- */

    if (referredBy) {

      const refUser = await db.query(
        `
        SELECT id
        FROM users
        WHERE referral_code=$1
        `,
        [referredBy]
      );

      if (refUser.rows.length > 0) {

        referredById =
          refUser.rows[0].id;
      }
    }

    /* ---------------- CREATE USER ---------------- */

    const result = await db.query(
      `
      INSERT INTO users(
        username,
        password,
        role,
        plan,
        referral_code,
        referred_by
      )
      VALUES($1, $2, $3, $4, $5, $6)
      RETURNING *
      `,
      [
        username,
        hashedPassword,
        "user",
        "free",
        referralCode,
        referredById
      ]
    );

    const user = result.rows[0];

    /* ---------------- REFERRAL REWARD ---------------- */

    if (referredById) {

      await db.query(
        `
        INSERT INTO points_transactions(
          user_id,
          amount
        )
        VALUES($1, $2)
        `,
        [
          referredById,
          5
        ]
      );
    }

    /* ---------------- TOKEN ---------------- */

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      }
    );

    res.json({
      token
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

/* ---------------- LOGIN ---------------- */

router.post("/login", async (req, res) => {

  try {

    const {
      username,
      password
    } = req.body;

    const result = await db.query(
      `
      SELECT *
      FROM users
      WHERE username=$1
      `,
      [username]
    );

    const user = result.rows[0];

    if (!user) {

      return res.status(400).json({
        error: "User not found"
      });
    }

    const ok = await bcrypt.compare(
      password,
      user.password
    );

    if (!ok) {

      return res.status(400).json({
        error: "Wrong password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      }
    );

    res.json({
      token
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;