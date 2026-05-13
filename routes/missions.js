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

    /* ---------------- COMPLETE MISSION ---------------- */

    if (newCount >= 7) {

      completed = true;

      /* ---------------- USER VIP LEVEL ---------------- */

      const userResult =
        await db.query(
          `
          SELECT vip_level
          FROM users
          WHERE id = $1
          `,
          [req.user.id]
        );

      const user =
        userResult.rows[0];

      /* ---------------- REWARDS ---------------- */

      const rewards = {
        0: 0.5,
        1: 4,
        2: 10,
        3: 22,
        4: 50
      };

      reward =
        rewards[user.vip_level] || 0.5;

      /* ---------------- ADD POINTS ---------------- */

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
          req.user.id,
          reward,
          "mission_reward"
        ]
      );
    }

    /* ---------------- UPDATE MISSION ---------------- */

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

module.exports = router;