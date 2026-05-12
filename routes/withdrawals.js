const router = require("express").Router();

const auth = require("../middleware/auth");
const db = require("../config/db");

/* ---------------- CREATE WITHDRAW ---------------- */

router.post("/", auth, async (req, res) => {

  try {

    const {
      wallet_address
    } = req.body;

    /* ---------------- USER ---------------- */

    const userResult = await db.query(
      `
      SELECT plan
      FROM users
      WHERE id=$1
      `,
      [req.user.id]
    );

    const user =
      userResult.rows[0];

    /* ---------------- REFERRALS ---------------- */

    const refs =
      await db.query(

        `
        SELECT plan
        FROM users
        WHERE referred_by=$1
        `,

        [req.user.id]

      );

    const referralPlans =
      refs.rows.map(
        r => r.plan
      );

    /* ---------------- VIP RULES ---------------- */

    if (user.plan === "VIP 1") {

      if (referralPlans.length < 3) {

        return res.status(403).json({

          error:
            "VIP 1 requires 3 active referrals"

        });

      }

    }

    if (user.plan === "VIP 2") {

      const hasVip2 =

        referralPlans.includes(
          "VIP 2"
        );

      if (!hasVip2) {

        return res.status(403).json({

          error:
            "VIP 2 requires at least 1 VIP 2 referral"

        });

      }

    }

    if (user.plan === "VIP 3") {

      const hasVip3 =

        referralPlans.includes(
          "VIP 3"
        );

      if (!hasVip3) {

        return res.status(403).json({

          error:
            "VIP 3 requires at least 1 VIP 3 referral"

        });

      }

    }

    /* ---------------- POINTS ---------------- */

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