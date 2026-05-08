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
      WHERE user_id=$1
      AND mission_date=CURRENT_DATE
      `,
      [req.user.id]
    );

    /* ---------------- CREATE DAILY MISSION ---------------- */

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
        WHERE user_id=$1
        AND mission_date=CURRENT_DATE
        `,
        [req.user.id]
      );
    }

    res.json(mission.rows[0]);

  } catch (err) {

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
      WHERE user_id=$1
      AND mission_date=CURRENT_DATE
      `,
      [req.user.id]
    );

    if (mission.rows.length === 0) {

      return res.status(404).json({
        error: "Mission not found"
      });
    }

    const currentMission = mission.rows[0];

    /* ---------------- ALREADY COMPLETED ---------------- */

    if (currentMission.completed) {

      return res.json({
        message: "Mission already completed"
      });
    }

    const newCount = currentMission.ads_watched + 1;

    let completed = false;

    /* ---------------- COMPLETE MISSION ---------------- */

    if (newCount >= 7) {

      completed = true;

      const userData = await db.query(
        "SELECT plan FROM users WHERE id=$1",
        [req.user.id]
      );

      const userPlan = userData.rows[0].plan;

      const rewards = {
        free: [1, 3],
        vip1: [3, 5],
        vip2: [5, 7],
        vip3: [8, 12]
      };

      const [min, max] = rewards[userPlan] || [1, 3];

      const reward =
        Math.floor(Math.random() * (max - min + 1)) + min;

      /* ---------------- ADD POINTS ---------------- */

      await db.query(
        `
        INSERT INTO points_transactions(user_id, amount)
        VALUES($1, $2)
        `,
        [req.user.id, reward]
      );
    }

    /* ---------------- UPDATE MISSION ---------------- */

    await db.query(
      `
      UPDATE daily_missions
      SET ads_watched=$1,
          completed=$2
      WHERE id=$3
      `,
      [newCount, completed, currentMission.id]
    );

    res.json({
      watched: newCount,
      completed
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;