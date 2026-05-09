const router = require("express").Router();

const auth = require("../middleware/auth");
const db = require("../config/db");

/* ---------------- GET CURRENT USER ---------------- */

router.get("/me", auth, async (req, res) => {

  try {

    /* ---------------- USER ---------------- */

    const userResult = await db.query(
      `
      SELECT
        id,
        username,
        role,
        vip_level,
        referral_code,
        streak
      FROM users
      WHERE id=$1
      `,
      [req.user.id]
    );

    const user =
      userResult.rows[0];

    /* ---------------- DAILY VIP REWARD ---------------- */

    if (
      user.vip_level &&
      user.vip_level !== "FREE"
    ) {

      const rewardCheck =
        await db.query(
          `
          SELECT *
          FROM vip_rewards
          WHERE user_id=$1
          AND reward_date=CURRENT_DATE
          `,
          [req.user.id]
        );

      /* NOT CLAIMED TODAY */

      if (
        rewardCheck.rows.length === 0
      ) {

        let reward = 0;

        if (user.vip_level === "VIP 1") {
          reward = 1;
        }

        if (user.vip_level === "VIP 2") {
          reward = 2.5;
        }

        if (user.vip_level === "VIP 3") {
          reward = 4.9;
        }

        if (user.vip_level === "VIP 4") {
          reward = 8.2;
        }

        /* ADD POINTS */

        if (reward > 0) {

          await db.query(
            `
            INSERT INTO points_transactions(
              user_id,
              amount,
              type
            )
            VALUES($1, $2, $3)
            `,
            [
              req.user.id,
              reward,
              "vip_reward"
            ]
          );

          /* SAVE CLAIM */

          await db.query(
            `
            INSERT INTO vip_rewards(
              user_id
            )
            VALUES($1)
            `,
            [req.user.id]
          );
        }
      }
    }

    /* ---------------- POINTS ---------------- */

    const points = await db.query(
      `
      SELECT
      COALESCE(SUM(amount),0)
      AS points
      FROM points_transactions
      WHERE user_id=$1
      `,
      [req.user.id]
    );

    res.json({
      user,
      points:
        points.rows[0].points
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

/* ---------------- PROFILE ---------------- */

router.get(
  "/profile",
  auth,
  async (req, res) => {

    try {

      const userResult =
        await db.query(
          `
          SELECT
            id,
            username,
            role,
            vip_level,
            referral_code,
            streak
          FROM users
          WHERE id=$1
          `,
          [req.user.id]
        );

      const user =
        userResult.rows[0];

      const pointsResult =
        await db.query(
          `
          SELECT
            COALESCE(SUM(amount),0)
            AS points
          FROM points_transactions
          WHERE user_id=$1
          `,
          [req.user.id]
        );

      const referralsResult =
        await db.query(
          `
          SELECT COUNT(*)
          AS total
          FROM users
          WHERE referred_by=$1
          `,
          [req.user.id]
        );

      /* ---------------- REFERRAL EARNINGS ---------------- */

      const referralEarnings =
        await db.query(
          `
          SELECT
            COALESCE(SUM(amount),0)
            AS total
          FROM points_transactions
          WHERE user_id=$1
          AND type='referral'
          `,
          [req.user.id]
        );

      res.json({

        user,

        points:
          pointsResult.rows[0].points,

        totalReferrals:
          referralsResult.rows[0].total,

        referralEarnings:
          referralEarnings.rows[0].total

      });

    } catch (err) {

      res.status(500).json({
        error: err.message
      });
    }
  }
);

/* ---------------- POINTS HISTORY ---------------- */

router.get(
  "/points-history",
  auth,
  async (req, res) => {

    try {

      const history = await db.query(
        `
        SELECT *
        FROM points_transactions
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
  }
);

/* ---------------- GET ALL USERS ---------------- */

router.get("/", auth, async (req, res) => {

  try {

    const users = await db.query(
      `
      SELECT
        id,
        username,
        role,
        vip_level,
        streak
      FROM users
      ORDER BY id DESC
      `
    );

    res.json(users.rows);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

/* ---------------- CREATE WITHDRAW REQUEST ---------------- */

router.post(
  "/withdraw",
  auth,
  async (req, res) => {

    try {

      const {
        amount,
        walletAddress
      } = req.body;

      /* ---------------- VALIDATION ---------------- */

      if (
        !amount ||
        amount <= 0
      ) {

        return res.status(400).json({
          error: "Invalid amount"
        });
      }

      if (!walletAddress) {

        return res.status(400).json({
          error: "Wallet address required"
        });
      }

      /* ---------------- USER POINTS ---------------- */

      const pointsResult =
        await db.query(
          `
          SELECT
          COALESCE(SUM(amount),0)
          AS points
          FROM points_transactions
          WHERE user_id=$1
          `,
          [req.user.id]
        );

      const points =
        Number(
          pointsResult.rows[0].points
        );

      /* ---------------- CHECK BALANCE ---------------- */

      if (points < amount) {

        return res.status(400).json({
          error: "Not enough points"
        });
      }

      /* ---------------- SAVE REQUEST ---------------- */

      await db.query(
        `
        INSERT INTO withdraw_requests
        (
          user_id,
          amount,
          wallet_address
        )
        VALUES($1, $2, $3)
        `,
        [
          req.user.id,
          amount,
          walletAddress
        ]
      );

      /* ---------------- REMOVE POINTS ---------------- */

      await db.query(
        `
        INSERT INTO points_transactions
        (
          user_id,
          amount,
          type
        )
        VALUES($1, $2, $3)
        `,
        [
          req.user.id,
          -amount,
          "withdraw"
        ]
      );

      res.json({
        message:
          "Withdraw request created"
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message
      });
    }
  }
);

module.exports = router;