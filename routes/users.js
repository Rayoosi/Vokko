const router = require("express").Router();

const auth = require("../middleware/auth");
const db = require("../config/db");

/* ---------------- GET CURRENT USER ---------------- */

router.get(
  "/me",
  auth,
  async (req, res) => {

    try {

      const result =
        await db.query(
          `
          SELECT
            id,
            username,
            points,
            role,
            plan,
            streak,
            referral_code,
            last_reward
          FROM users
          WHERE id = $1
          `,
          [req.user.id]
        );

      if (
        result.rows.length === 0
      ) {

        return res.status(404).json({
          error: "User not found"
        });

      }

      const user =
        result.rows[0];

      const DAY =
        1000 * 60 * 60 * 24;

      const vipRewards = {

        VIP 1: 4,
        VIP 2: 10,
        VIP 3: 22,
        VIP 4: 50

      };

      const now =
        Date.now();

      if (
        user.plan &&
        vipRewards[user.plan]
      ) {

        const lastReward =
          user.last_reward || 0;

        const passedDays =
          Math.floor(
            (now - lastReward) / DAY
          );

        if (
          passedDays > 0
        ) {

          const reward =
            vipRewards[user.plan] *
            passedDays;

          await db.query(
            `
            UPDATE users
            SET
              points = points + $1,
              last_reward = $2
            WHERE id = $3
            `,
            [
              reward,
              now,
              user.id
            ]
          );

          user.points += reward;

          user.last_reward = now;

        }

      }

      res.json({

        user,

        points:
          user.points

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