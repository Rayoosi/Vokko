const router = require("express").Router();

const auth = require("../middleware/auth");
const db = require("../config/db");

/* ---------------- CREATE WITHDRAW ---------------- */

router.post("/", auth, async (req, res) => {

  try {

    const {
      wallet_address
    } = req.body;

    const user = await db.query(
      `
      SELECT plan
      FROM users
      WHERE id=$1
      `,
      [req.user.id]
    );

    const pointsData = await db.query(
      `
      SELECT COALESCE(SUM(amount),0) AS points
      FROM points_transactions
      WHERE user_id=$1
      `,
      [req.user.id]
    );

    const points =
      parseInt(pointsData.rows[0].points);

    /* ---------------- MINIMUM ---------------- */

    if (points < 100) {

      return res.status(400).json({
        error: "Minimum withdraw is 100 points"
      });
    }

    /* ---------------- SAVE WITHDRAW ---------------- */

    await db.query(
      `
      INSERT INTO withdrawals(
        user_id,
        amount,
        wallet_address
      )
      VALUES($1, $2, $3)
      `,
      [
        req.user.id,
        points,
        wallet_address
      ]
    );

    /* ---------------- RESET POINTS ---------------- */

    await db.query(
      `
      INSERT INTO points_transactions(
        user_id,
        amount
      )
      VALUES($1, $2)
      `,
      [req.user.id, -points]
    );

    res.json({
      message: "Withdraw request created"
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

/* ---------------- WITHDRAW HISTORY ---------------- */

router.get("/history", auth, async (req, res) => {

  try {

    const history = await db.query(
      `
      SELECT *
      FROM withdrawals
      WHERE user_id=$1
      ORDER BY id DESC
      `,
      [req.user.id]
    );

    res.json(history.rows);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;