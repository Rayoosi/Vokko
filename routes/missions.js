const router = require("express").Router();

const auth = require("../middleware/auth");
const db = require("../config/db");

/* ---------------- DAILY MISSION ---------------- */

router.get("/daily", auth, async (req, res) => {

  try {

    let mission = await db.query(
      `
      SELECT *
      FROM daily_missions
      WHERE user_id = $1
      AND mission_date = CURRENT_DATE
      `,
      [req.user.id]
    );

    if (mission.rows.length === 0) {

      await db.query(
        `
        INSERT INTO daily_missions(user_id)
        VALUES($1)
        `,
        [req.user.id]
      );

      mission = await db.query(
        `
        SELECT *
        FROM daily_missions
        WHERE user_id = $1
        AND mission_date = CURRENT_DATE
        `,
        [req.user.id]
      );
    }

    res.json(mission.rows[0]);

  } catch (err) {

    console.log(
      "DAILY ERROR:",
      err
    );

    res.status(500).json({
      error: err.message
    });
  }
});

/* ---------------- WATCH AD ---------------- */

router.post("/watch-ad", auth, async (req, res) => {

  try {

    const mission = await db.query(
      `
      SELECT *
      FROM daily_missions
      WHERE user_id = $1
      AND mission_date = CURRENT_DATE
      `,
      [req.user.id]
    );

    if (mission.rows.length === 0) {

      return res.status(404).json({
        error: "Mission not found"
      });
    }

    const currentMission =
      mission.rows[0];

    if (currentMission.completed) {

      return res.status(400).json({
        message:
          "Mission already completed"
      });
    }

    const newCount =
      currentMission.ads_watched + 1;

    let completed = false;

    let reward = 0;

    if (newCount >= 7) {

      completed = true;

      reward = 3;

      await db.query(
        `
        UPDATE users
        SET points = points + $1
        WHERE id = $2
        `,
        [
          reward,
          req.user.id
        ]
      );

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
          reward,
          "mission_reward"
        ]
      );
    }

    await db.query(
      `
      UPDATE daily_missions
      SET
        ads_watched = $1,
        completed = $2
      WHERE id = $3
      `,
      [
        newCount,
        completed,
        currentMission.id
      ]
    );

    res.json({
      watched: newCount,
      completed,
      reward
    });

  } catch (err) {

    console.log(
      "WATCH ERROR:",
      err
    );

    res.status(500).json({
      error: err.message
    });
  }
});

/* ---------------- DAILY CLAIM ---------------- */

router.post(
  "/daily-claim",
  auth,
  async (req, res) => {

    try {

      const userId =
        req.user.id;

      const userResult =
        await db.query(
          `
          SELECT *
          FROM users
          WHERE id = $1
          `,
          [userId]
        );

      if (
        userResult.rows.length === 0
      ) {

        return res.status(404).json({
          error:
            "User not found"
        });
      }

      const user =
        userResult.rows[0];

      /* ---------------- ALREADY CLAIMED ---------------- */

      if (user.last_daily_claim) {

        const claimDate =
          new Date(
            user.last_daily_claim
          )
          .toISOString()
          .split("T")[0];

        const today =
          new Date()
          .toISOString()
          .split("T")[0];

        if (claimDate === today) {

          return res.status(400)
            .json({
              message:
                "Reward already claimed today"
            });
        }
      }

      /* ---------------- ADD POINTS ---------------- */

      await db.query(
        `
        UPDATE users
        SET
          points = points + 5,
          last_daily_claim = CURRENT_DATE
        WHERE id = $1
        `,
        [userId]
      );

      /* ---------------- SAVE TRANSACTION ---------------- */

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
          userId,
          5,
          "daily_reward"
        ]
      );

      res.json({
        success: true,
        reward: 5
      });

    } catch (err) {

      console.log(
        "DAILY CLAIM ERROR FULL:"
      );

      console.log(err);

      console.log(err.message);

      console.log(err.stack);

      return res.status(500).json({
        error: err.message,
        stack: err.stack
      });
    }
  }
);

module.exports = router;