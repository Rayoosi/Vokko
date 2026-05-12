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
            plan,
            streak,
            referral_code
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

      res.json({
  user: result.rows[0],
  points: result.rows[0].points
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